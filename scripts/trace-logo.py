"""Trace client artwork into SVG paths; never redraw lettering or embed a bitmap.

The original RGBA pixels are classified into six production inks. Contours are
traced at the source resolution. Raster input is never modified or overwritten.
"""
from pathlib import Path
import sys
import re
import json
import xml.etree.ElementTree as ET
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.tools' / 'logo-vectorizer'))
import numpy as np
import vtracer
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'brand-source' / 'DDTC-primary-client-original.png'
OUT = ROOT / 'public' / 'brand'
OUT.mkdir(parents=True, exist_ok=True)
raw = np.asarray(Image.open(SOURCE).convert('RGBA'))
r, g, b, a = [raw[:, :, i].astype(np.int16) for i in range(4)]
visible = a >= 128
# Names and colors are derived from the supplied artwork and approved palette.
inks = {'navy': '#062442', 'blue': '#006aa1', 'cyan': '#0099cf', 'gold': '#d6ad64', 'sun': '#efbc55', 'snow': '#ffffff'}
classes = np.full(r.shape, 'navy', dtype='<U5')
classes[(b > 80) & (g > 40)] = 'blue'
classes[(b > 120) & (g > 110)] = 'cyan'
classes[(r > 70) & (r > b * 1.25) & (r > g * 1.05)] = 'gold'
classes[(r > 210) & (g > 135) & (b < 150)] = 'sun'
classes[(r > 180) & (g > 180) & (b > 180)] = 'snow'
rgba = np.zeros(raw.shape, dtype=np.uint8)
for name, color in inks.items():
    rgb = tuple(int(color[i:i+2], 16) for i in (1, 3, 5))
    rgba[(classes == name) & visible] = (*rgb, 255)
def trace(data):
    svg = vtracer.convert_pixels_to_svg([tuple(map(int, pixel)) for pixel in data.reshape(-1, 4)], (data.shape[1], data.shape[0]), colormode='color', hierarchical='stacked', mode='spline', filter_speckle=2, color_precision=8, layer_difference=1, corner_threshold=60, length_threshold=3.5, path_precision=2)
    root = ET.fromstring(svg)
    result = ''.join(ET.tostring(child, encoding='unicode').replace('ns0:', '').replace(':ns0', '') for child in root if child.tag.endswith('path'))
    palette = list(inks.values())
    def snap(match):
        color = tuple(int(match.group(1)[i:i+2],16) for i in (1,3,5))
        nearest = min(palette, key=lambda value: sum((color[j]-int(value[i:i+2],16))**2 for j,i in enumerate((1,3,5))))
        return f'fill="{nearest}"'
    return re.sub(r'fill="(#[0-9A-Fa-f]{6})"',snap,result)
paths = trace(rgba)
# Keep SVG standalone, self-contained, vector-only, and accessible outside the site.
def artwork(name, body, box, label):
    x,y,w,h = box
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="title"><title id="title">{label}</title><desc>Contour-traced directly from client-supplied DDTC artwork. Lettering is outlined, not retyped. Six-ink web adaptation; original PNG remains the fidelity master.</desc>{body}</svg>'

def recolor(body, mapping):
    return re.sub(r'fill="(#[0-9A-Fa-f]{6})"', lambda match: f'fill="{mapping.get(match.group(1).lower(), match.group(1))}"', body)

dark_map = {inks['navy']: '#ffffff', inks['blue']: '#d6ad64', inks['cyan']: '#ffffff', inks['gold']: '#d6ad64', inks['sun']: '#efbc55', inks['snow']: '#101722'}
navy_map = {inks['navy']: '#10294b', inks['blue']: '#10294b', inks['cyan']: '#1877a5', inks['gold']: '#10294b', inks['sun']: '#10294b', inks['snow']: '#ffffff'}
dark = recolor(paths, dark_map)
navy = recolor(paths, navy_map)
ys, xs = np.where(visible)
box = (max(0,int(xs.min())-12), max(0,int(ys.min())-12), min(1536,int(xs.max())+13)-max(0,int(xs.min())-12), min(1024,int(ys.max())+13)-max(0,int(ys.min())-12))
variants = {
  'ddtc-primary.svg': artwork('primary', paths, box, 'DDTC Travel Agency primary corporate logo'),
  'ddtc-white-gold.svg': artwork('white-gold', dark, box, 'DDTC Travel Agency white and gold corporate logo'),
  'ddtc-navy.svg': artwork('navy', navy, box, 'DDTC Travel Agency navy logo for light backgrounds'),
}
wordmark_pixels = rgba[440:670,205:1370].copy()
# Omit only the detached tip of the emblem's large gold swoosh, not letter ink.
wordmark_classes = classes[440:670,205:1370]
wordmark_pixels[:30,:145][np.isin(wordmark_classes[:30,:145], ['gold','sun'])] = (0,0,0,0)
wordmark = trace(wordmark_pixels)
variants['ddtc-wordmark.svg'] = artwork('wordmark', recolor(wordmark,dark_map), (0,0,1165,230), 'DDTC compact wordmark')
variants['ddtc-wordmark-navy.svg'] = artwork('wordmark-navy', wordmark, (0,0,1165,230), 'DDTC compact navy wordmark')
# Rearrange only exact source-art regions into a horizontal lockup: no new font,
# icon or letter construction. Preserve every region's aspect ratio.
symbol = trace(rgba[35:435,120:1430])
agency = trace(rgba[815:875,350:1190])
horizontal = f'<g transform="translate(0,9) scale(.0855)">{recolor(symbol,dark_map)}</g><g transform="translate(122,3) scale(.17)">{recolor(wordmark,dark_map)}</g><g transform="translate(5,48) scale(.38)">{recolor(agency,dark_map)}</g>'
variants['ddtc-horizontal.svg'] = artwork('horizontal', horizontal, (0,0,330,76), 'DDTC Travel Agency horizontal logo')
favicon_art = trace(rgba[55:385,620:1070])
favicon = '<rect x="0" y="0" width="128" height="128" rx="24" fill="#101722"/><svg x="5" y="11" width="118" height="106" viewBox="0 0 450 330">' + favicon_art + '</svg>'
variants['ddtc-favicon.svg'] = artwork('favicon', favicon, (0,0,128,128), 'DDTC sunrise and mountain favicon')
for filename, data in variants.items(): (OUT / filename).write_text(data, encoding='utf8')
(ROOT / 'src' / 'app' / 'icon.svg').write_text(variants['ddtc-favicon.svg'], encoding='utf8')
# Original source is already alpha-transparent: provide its exact pixels as the
# temporary primary PNG rather than re-rendering generative lettering.
(OUT / 'ddtc-primary.png').write_bytes(SOURCE.read_bytes())
manifest = { 'source': str(SOURCE.relative_to(ROOT)), 'method': 'Direct contour trace, source alpha >= 128, six-ink color classification, spline paths', 'variants': list(variants), 'originalDimensions': [1536,1024], 'sourceViewBox': box, 'limit': 'Raster-derived web vectors, not original professional vector masters; fine cursive and minor contours require artwork approval.' }
(OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf8')
print(json.dumps({'files': list(variants), 'bounds': box, 'source_unchanged': True, 'path_count': paths.count('<path')}, indent=2))
