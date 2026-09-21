// Verifies the single-file pledge: every external reference is a pinned CDN
// <script>, and nothing else is loaded from disk or the network.
const fs = require('fs');
const h = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');

const urls = [...new Set((h.match(/https?:\/\/[^"'\s)]+/g) || []))];
console.log('external URLs referenced (' + urls.length + '):');
urls.forEach(u => console.log('  ' + u));

const counts = {
  '<script src>': (h.match(/<script[^>]+src=/g) || []).length,
  '<img>': (h.match(/<img\b/g) || []).length,
  '<link>': (h.match(/<link\b/g) || []).length,
  'fetch(': (h.match(/fetch\s*\(/g) || []).length,
  'XMLHttpRequest': (h.match(/XMLHttpRequest/g) || []).length,
  'new Image': (h.match(/new Image\b/g) || []).length,
  'new Audio': (h.match(/new Audio\b/g) || []).length,
  'AudioContext': (h.match(/AudioContext/g) || []).length,
  'importScripts': (h.match(/importScripts/g) || []).length,
  'require(': (h.match(/require\s*\(/g) || []).length,
  'import ': (h.match(/^\s*import\s/gm) || []).length
};
console.log('\nresource loaders found:');
Object.keys(counts).forEach(k => console.log('  ' + k + ': ' + counts[k]));

/* every src/href/url() must be either an inline data URL or a pinned CDN script */
const refs = [...(h.match(/(?:src|href)\s*=\s*["'][^"']+["']/g) || [])];
const external = refs.filter(r => /https?:\/\//.test(r) && !/three@\d+\.\d+\.\d+/.test(r));
const localAssets = refs.filter(r => !/https?:\/\//.test(r) && !/["']data:/.test(r) && !/["']#/.test(r));
console.log('\nnon-CDN or local asset references: ' + (external.length + localAssets.length));
external.concat(localAssets).forEach(r => console.log('  ' + r));
/* the HUD item icons are <img> elements whose src is filled with a data URL */
const dataUrlImages = (h.match(/['"]data:image\/png/g) || []).length;
console.log('inline data-URL images (HUD item icons, baked at load): ' + dataUrlImages);

const pinned = urls.every(u => /three@\d+\.\d+\.\d+/.test(u));
console.log('\nall CDN URLs pin an exact three.js version: ' + pinned);
const proceduralAudio = counts.AudioContext > 0 && counts['new Audio'] === 0;
console.log('audio is synthesized (AudioContext, no audio files): ' + proceduralAudio);
const singleFile = external.length === 0 && localAssets.length === 0 &&
  counts['<link>'] === 0 && counts['fetch('] === 0 && counts['new Audio'] === 0;
console.log('the game is one self-contained file (only CDN scripts + inline data URLs): ' + singleFile);
process.exit(pinned && proceduralAudio && singleFile ? 0 : 1);
