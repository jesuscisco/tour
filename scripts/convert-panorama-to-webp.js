const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const folder = path.join(__dirname, '..', 'public', 'panoramas', 'backup_pngs');
const files = fs.readdirSync(folder).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

(async () => {
  for (const file of files) {
    const inPath = path.join(folder, file);
    const name = path.parse(file).name;
    const outPath = path.join(folder, `${name}.webp`);
    try {
      await sharp(inPath)
        .resize(4096, 2048, { fit: 'inside' }) // reducido para evitar OOM GPU
        .webp({ quality: 70 })
        .toFile(outPath);
      console.log('Converted:', file, '→', `${name}.webp`);
    } catch (err) {
      console.error('Error converting', file, err);
    }
  }
})();

// Nota: Asegúrate de tener la carpeta 'backup_pngs' con imágenes PNG/JPG en 'public/panoramas' antes de ejecutar este script.
// Ejecuta este script con: node scripts/convert-panorama-to-webp.js
// Requiere instalar 'sharp': npm install sharp 478x586