import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const ASCII_CHARS = '@%#*+=-:. ';

async function generate() {
  const imagePath = path.resolve('public/perfil.jpeg');
  const outputPath = path.resolve('src/data/asciiData.json');

  const image = await Jimp.read(imagePath);
  image.resize({ w: 80, h: 80 });
  const bitmap = image.bitmap;
  const data = bitmap.data;

  const cols = 80;
  const rows = 80;
  const asciiData = [];

  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = r * 0.299 + g * 0.587 + b * 0.114;
      const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
      row.push({
        char: ASCII_CHARS[charIndex],
        brightness,
        r,
        g,
        b,
      });
    }
    asciiData.push(row);
  }

  const result = { asciiData, cols, rows };
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`ASCII data generated: ${outputPath}`);
}

generate().catch(console.error);
