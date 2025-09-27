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
  const [openOptionsModal, setOpenOptionsModal] = useState(false); // mobile options menu
  const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=526623619110&text=Hola%2C+estoy+interesado%2Fa+en+m%C3%A1s+informaci%C3%B3n.&type=phone_number&app_absent=0';
  const handleVisitClick = () => {
    if (typeof window !== 'undefined') {
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
    }
  };

  // add a global class while any modal is open so we can lower R3F/Drei portals
  useEffect(() => {
    const anyOpen = !!openModal || openOptionsModal;
    if (anyOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => { document.body.classList.remove('modal-open'); };
  }, [openModal, openOptionsModal]);

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
        <button className="footer-btn visit" onClick={handleVisitClick} aria-label="Agenda tu Visita">
          <img src="/icons/calendar.svg" alt="" className="menu-icon small calendar-icon" style={{ marginRight: 8 }} />
          <span>Agenda tu Visita</span>
        </button>
      </div>

      {/* Footer-bar (mobile): shows CTA and options button */}
      <div className="footer-bar" role="toolbar" aria-label="Acciones rápidas">
        <button className="footer-btn visit" onClick={handleVisitClick} aria-label="Agenda tu Visita">
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
    </div>
  );
}