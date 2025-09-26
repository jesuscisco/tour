import React, { useState, useEffect } from 'react';
import TourViewer from '../components/organisms/TourViewer';
import HOTSPOTS_MAP from '../data/hotspots';

type ModalKey = 'modelos' | 'info' | 'plantas' | 'ubicacion' | 'caracteristicas' | null;

const MODAL_MAP: Record<Exclude<ModalKey, null>, { title: string; src: string }> = {
  modelos: { title: 'Modelos', src: '/modals/modelos.png' },
  info: { title: 'Información', src: '/modals/caracteristicas.png' },
  plantas: { title: 'Plantas', src: '/modals/plantas.png' },
  ubicacion: { title: 'Ubicación', src: '/modals/ubicacion.png' },
  caracteristicas: { title: 'Características', src: '/modals/caracteristicas.png' }, // ← cambiado
};

export default function Home() {
  const [current, setCurrent] = useState('/panoramas/INICIO.webp');
  const hotspots = HOTSPOTS_MAP[current] ?? [];
  const [openModal, setOpenModal] = useState<ModalKey>(null);
  const [openVisitModal, setOpenVisitModal] = useState(false);
  const [openOptionsModal, setOpenOptionsModal] = useState(false); // mobile options menu

  // add a global class while any modal is open so we can lower R3F/Drei portals
  useEffect(() => {
    const anyOpen = !!openModal || openVisitModal || openOptionsModal;
    if (anyOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => { document.body.classList.remove('modal-open'); };
  }, [openModal, openVisitModal, openOptionsModal]);

  const handleHotspotClick = (id: string) => {
    const h = hotspots.find(x => x.id === id);
    if (!h) return;
    if (h.target) setCurrent(h.target);
  };

  return (
    <div className="page-root">
      {/* site logo top-right */}
      <img src="/logo.png" alt="Logo" className="site-logo" />

      {/* Sidebar (desktop). labels under icons */}
      <aside className="sidebar" role="navigation" aria-label="Opciones">
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          {/* Sidebar buttons with icons */}
          <button className="thumb" aria-label="Modelos" onClick={() => setOpenModal('modelos')} title="Modelos">
            <img src="/icons/houses.svg" alt="" className="menu-icon" />
            <div className="thumb-label">Modelos</div>
          </button>

          <button className="thumb" aria-label="Plantas" onClick={() => setOpenModal('plantas')} title="Plantas">
            <img src="/icons/plantas.svg" alt="" className="menu-icon" />
            <div className="thumb-label">Plantas</div>
          </button>

          <button className="thumb" aria-label="Ubicación" onClick={() => setOpenModal('ubicacion')} title="Ubicación">
            <img src="/icons/location.svg" alt="" className="menu-icon" />
            <div className="thumb-label">Ubicación</div>
          </button>

          <button className="thumb" aria-label="Info" onClick={() => setOpenModal('info')} title="Info">
            <img src="/icons/info.svg" alt="" className="menu-icon" />
            <div className="thumb-label">Info</div>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <TourViewer src={current} hotspots={hotspots} onHotspotClick={handleHotspotClick} />
      </main>

      {/* Desktop fixed CTA (bottom-right) - igual diseño que footer móvil */}
      <div className="visit-cta-desktop">
        <button className="footer-btn visit" onClick={() => setOpenVisitModal(true)} aria-label="Agenda tu Visita">
          <img src="/icons/calendar.svg" alt="" className="menu-icon small calendar-icon" style={{ marginRight: 8 }} />
          <span>Agenda tu Visita</span>
        </button>
      </div>

      {/* Footer-bar (mobile): shows CTA and options button */}
      <div className="footer-bar" role="toolbar" aria-label="Acciones rápidas">
        <button className="footer-btn visit" onClick={() => setOpenVisitModal(true)} aria-label="Agenda tu Visita">
          <img src="/icons/calendar.svg" alt="" className="menu-icon small calendar-icon" style={{ marginRight: 8 }} />
          <span>Agenda tu Visita</span>
        </button>

        <button
          className={`footer-btn options ${openOptionsModal ? 'is-open' : ''}`}
          onClick={() => setOpenOptionsModal(v => !v)}
          aria-expanded={openOptionsModal}
          aria-label="Más opciones"
        >
          <img src="/icons/menu.svg" alt="Opciones" className="menu-icon small" />
        </button>
      </div>

      {/* Mobile options accordion (slide up panel) */}
      {openOptionsModal && (
        <div
          className="options-backdrop"
          onClick={() => setOpenOptionsModal(false)}
          aria-hidden
        />
      )}

      {/* Mobile options accordion (slide up panel) */}
      <div
        aria-hidden={!openOptionsModal}
        className={`options-accordion ${openOptionsModal ? 'open' : ''}`}
        role="region"
        aria-label="Opciones rápidas"
        onClick={(e) => e.stopPropagation()} /* evita que el click dentro cierre vía backdrop */
      >
        <div className="options-inner">
          {/* 1 - Características (icono tipo 'i') */}
          <button className="thumb" onClick={() => { setOpenModal('caracteristicas'); setOpenOptionsModal(false); }}>
            <img src="/icons/info.svg" alt="" className="menu-icon small" />
            Características
          </button>

          {/* 2 - Plantas */}
          <button className="thumb" onClick={() => { setOpenModal('plantas'); setOpenOptionsModal(false); }}>
            <img src="/icons/plantas.svg" alt="" className="menu-icon small" />
            Plantas
          </button>

          {/* 3 - Ubicación */}
          <button className="thumb" onClick={() => { setOpenModal('ubicacion'); setOpenOptionsModal(false); }}>
            <img src="/icons/location.svg" alt="" className="menu-icon small" />
            Ubicación
          </button>

          {/* 4 - Otros Modelos */}
          <button className="thumb" onClick={() => { setOpenModal('modelos'); setOpenOptionsModal(false); }}>
            <img src="/icons/houses.svg" alt="" className="menu-icon small" />
            Otros Modelos
          </button>
        </div>
      </div>

      {/* Desktop modals for each icon — image fills modal, no header/close button; click outside closes */}
      {openModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={MODAL_MAP[openModal].title}
          onClick={() => setOpenModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
            
              borderRadius: 10,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#000', // letterbox color when image aspect differs
            }}
          >
            <img
              src={MODAL_MAP[openModal].src}
              alt={MODAL_MAP[openModal].title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain', // ensure full image is visible
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Responsive CTA (shown on small screens via CSS) */}
      <div className="visit-cta-container">
        <button className="visit-cta" onClick={() => setOpenVisitModal(true)} aria-label="Agenda tu Visita">Agenda tu Visita</button>
      </div>

      {/* Visit modal (responsive) */}
      {openVisitModal && (
        <div role="dialog" aria-modal="true" aria-label="INGRESA TUS DATOS" onClick={() => setOpenVisitModal(false)} style={{
          position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', zIndex: 99999, /* ensure modal overlays everything */
        }}>
          <div onClick={(e) => e.stopPropagation()} className="visit-modal">
            <div className="visit-modal-header">
              <h3 style={{ margin: 0 }}>INGRESA TUS DATOS</h3>
              <button onClick={() => setOpenVisitModal(false)} className="visit-modal-close" aria-label="Cerrar">✕</button>
            </div>

            <VisitForm onClose={() => setOpenVisitModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

/* small VisitForm component */
function VisitForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nombre: '', apellidos: '', whatsapp: '', email: '', mensaje: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviar datos', form);
    // aquí enviar al backend o mostrar confirmación
    alert('Datos enviados (simulado)');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="input" />
        <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellidos" required className="input" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="input" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" type="email" className="input" />
      </div>

      <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Mensaje" rows={6} className="textarea" />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="send-btn">
          <img src="/icons/mail.svg" alt="" className="menu-icon" style={{ marginRight: 8 }} />
          Enviar Datos
        </button>
      </div>
    </form>
  );
}