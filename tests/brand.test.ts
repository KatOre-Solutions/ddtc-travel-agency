import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

test('the primary PNG retains the exact client-supplied pixels and alpha', async () => {
  const hashPixels = async (file: string) => createHash('sha256').update(await sharp(file).ensureAlpha().raw().toBuffer()).digest('hex');
  assert.equal(await hashPixels('brand-source/DDTC-primary-client-original.png'), await hashPixels('public/brand/ddtc-primary.png'));
});
test('every SVG variant contains real vector outlines without a bitmap or font dependency', () => {
  for (const name of ['primary','horizontal','white-gold','navy','wordmark','favicon']) {
    const svg = readFileSync(`public/brand/ddtc-${name}.svg`, 'utf8');
    assert.ok(svg.includes('<path'), name);
    assert.ok(svg.includes('viewBox='), name);
    assert.equal(/<image\b|data:image|<text\b|@font-face|<script\b/i.test(svg), false, name);
  }
  assert.equal(readFileSync('src/app/icon.svg','utf8'), readFileSync('public/brand/ddtc-favicon.svg','utf8'));
});
test('transparent PNG exports have alpha and sufficient resolution for their web sizes', async () => {
  for (const name of ['primary','horizontal','white-gold','navy','wordmark']) {
    const info = await sharp(`public/brand/ddtc-${name}.png`).metadata();
    assert.equal(info.hasAlpha,true,name);
    assert.ok(info.width! >= 1000,name);
  }
  const favicon = await sharp('public/brand/ddtc-favicon.png').metadata();
  assert.equal(favicon.width,512); assert.equal(favicon.height,512);
});
