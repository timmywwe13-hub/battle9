// Finds bare calls to module methods that lost their namespace prefix, e.g.
// `scene.add(...)` instead of `App.scene.add(...)` or `buildColliderGrid()`
// instead of `World.buildColliderGrid()`. Catches the class of damage left by
// the interrupted section reassembly.
const fs = require('fs');
const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, code = '';
while ((m = re.exec(html)) !== null) if (m[1].length > code.length) code = m[1];
const lines = code.split(/\r?\n/);

const MODULES = ['World', 'Loot', 'Bots', 'FX', 'Zone', 'Player', 'Game', 'UI', 'Maps',
  'ViewModel', 'Input', 'SFX', 'Hit', 'Projectiles', 'BotView', 'App', 'RNG', 'CAM', 'BotView'];

const methods = new Set();
const methodOwner = new Map();
for (const mod of MODULES) {
  const rx = new RegExp('\\b' + mod + '\\.([A-Za-z_$][\\w$]*)\\s*=\\s*(?:function|\\()', 'g');
  let mm;
  while ((mm = rx.exec(code)) !== null) { methods.add(mm[1]); methodOwner.set(mm[1], mod); }
}
/* also `mod: { method() {} }` style is impossible to grep reliably; ignore */

const problems = [];
lines.forEach((line, i) => {
  if (/^\s*(?:\/\/|\*|\/\*)/.test(line)) return;
  const s = line.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '');
  for (const name of methods) {
    const rx = new RegExp('(^|[^.\\w$])' + name + '\\s*\\(', 'g');
    let mm;
    while ((mm = rx.exec(s)) !== null) {
      /* defined? `function name(` right there counts, as does a local const/let */
      if (new RegExp('function\\s+' + name + '\\b').test(s)) continue;
      if (new RegExp('(const|let|var)\\s+' + name + '\\b').test(s)) continue;
      /* object-literal shorthand definition: `name(args) {` at end of line */
      if (new RegExp('(^|[^\\w$.])' + name + '\\s*\\([^()]*\\)\\s*\\{\\s*$').test(s)) continue;
      /* a call into the same module's own `api` object is fine too */
      if (new RegExp('api\\.' + name + '\\s*\\(').test(s)) continue;
      problems.push({ line: i + 1, name, owner: methodOwner.get(name), text: line.trim().slice(0, 120) });
    }
  }
});
console.log('module methods discovered: ' + methods.size);
if (!problems.length) console.log('no unqualified module-method calls found');
problems.forEach(p => console.log('  line ' + p.line + ': bare ' + p.name + '()  (should be ' + p.owner + '.' + p.name + ')\n      ' + p.text));
