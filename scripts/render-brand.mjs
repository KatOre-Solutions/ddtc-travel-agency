import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
const brand = path.resolve('public/brand');
const variants = ['ddtc-primary', 'ddtc-horizontal', 'ddtc-white-gold', 'ddtc-navy', 'ddtc-wordmark', 'ddtc-favicon'];
for (const name of variants) {
  const width = name === 'ddtc-horizontal' ? 1168 : name === 'ddtc-favicon' ? 512 : name === 'ddtc-wordmark' ? 1155 : 1536;
  if (name !== 'ddtc-primary') await sharp(path.join(brand, `${name}.svg`), { density: 192 }).resize({ width }).png().toFile(path.join(brand, `${name}.png`));
}
await sharp(path.join(brand, 'ddtc-favicon.svg'), { density: 192 }).resize(180,180).png().toFile('src/app/apple-icon.png');
// A local contact sheet for optical comparison; it is not served as a logo.
const panels = [
  ['ddtc-primary.png','#ffffff',0,0,720,480], ['ddtc-primary.svg','#ffffff',720,0,720,480],
  ['ddtc-white-gold.svg','#101722',0,480,720,480], ['ddtc-navy.svg','#ffffff',720,480,720,480],
  ['ddtc-horizontal.svg','#101722',0,960,720,190], ['ddtc-wordmark.svg','#101722',720,960,720,190],
];
const layers = [];
for (const [name,bg,left,top,width,height] of panels) {
  const png = await sharp(path.join(brand,name), { density: 144 }).resize(width-60,height-40,{fit:'contain',background:bg}).flatten({ background:bg }).extend({top:20,bottom:20,left:30,right:30,background:bg}).png().toBuffer();
  layers.push({input:png,left,top});
}
await sharp({create:{width:1440,height:1150,channels:4,background:'#888888'}}).composite(layers).png().toFile('.impeccable/review/brand-sheet.png');
// Record render metadata for repeatable QA without touching the original.
const meta = {};
for (const name of variants) { const info = await sharp(path.join(brand,`${name}.png`)).metadata(); meta[name] = {width:info.width,height:info.height,hasAlpha:info.hasAlpha}; }
await writeFile(path.join(brand,'raster-metadata.json'),JSON.stringify(meta,null,2));
console.log(meta);
