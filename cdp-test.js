const fs = require('fs');
const path = require('path');
const lib = require('./cdp-lib');

const scenario = process.argv[2] || 'boot';

const NEW_DOC_HOOK = `window.__errs = [];
window.addEventListener('error', function (e) {
  window.__errs.push('onerror: ' + e.message + ' @' + e.lineno + ':' + e.colno);
});
window.addEventListener('unhandledrejection', function (e) {
  window.__errs.push('unhandledrejection: ' + ((e.reason && e.reason.message) || e.reason));
});
(function () {
  var ce = console.error;
  console.error = function () {
    window.__errs.push('console.error: ' + Array.prototype.join.call(arguments, ' '));
    return ce.apply(console, arguments);
  };
})();`;

async function main() {
  const { proc, profile, wsUrl } = await lib.launch();
  const { ws, send, ready, logs, notes } = lib.connect(wsUrl);
  await ready;
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Page.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: NEW_DOC_HOOK });
  await send('Page.navigate', { url: lib.fileUrl });
  await lib.sleep(5000);

  const evaluate = async (expr, awaitPromise) => {
    const r = await send('Runtime.evaluate', {
      expression: expr, returnByValue: true, awaitPromise: !!awaitPromise, userGesture: true
    });
    if (r.exceptionDetails) {
      const d = r.exceptionDetails;
      throw new Error('eval failed: ' + ((d.exception && d.exception.description) || d.text));
    }
    return r.result.value;
  };

  const results = [];
  const check = (name, ok, detail) => {
    results.push({ name, ok: !!ok });
    console.log((ok ? 'PASS  ' : 'FAIL  ') + name +
      (detail === undefined ? '' : '   [' + String(detail).slice(0, 200) + ']'));
  };

  const ctx = { evaluate, check, sleep: lib.sleep, logs, send };

  /* Wait for the game to finish booting before the scenario touches it: the
     start screen is wired up during App.init, and a scenario that clicks Play
     before that finds empty bot arrays. */
  let boot = null;
  for (let i = 0; i < 60; i++) {
    try {
      boot = await evaluate(`(function () {
        try {
          return { state: (typeof App !== 'undefined') ? App.state : null,
                   loaded: document.getElementById('bootLoading').classList.contains('hidden'),
                   error: !document.getElementById('bootError').classList.contains('hidden') };
        } catch (e) { return null; }
      })()`);
    } catch (e) { boot = null; }
    if (boot && (boot.error || (boot.state === 'MENU' && boot.loaded))) break;
    await lib.sleep(500);
  }
  console.log('boot: ' + JSON.stringify(boot));

  try {
    await require('./scenarios/' + scenario + '.js')(ctx);
  } catch (e) {
    console.log('SCENARIO ERROR: ' + e.message);
    results.push({ name: 'scenario ran without throwing', ok: false });
  }

  let pageErrs = [];
  try { pageErrs = await evaluate('window.__errs || []'); } catch (e) { /* ignore */ }
  /* Headless/Edge-specific noise that says nothing about the game code:
     Edge's tracking-prevention notice for the CDN script and SwiftShader's
     GL driver performance messages. */
  const NOISE = [/Tracking Prevention blocked access to storage/,
    /GL Driver Message/, /swiftshader/i, /Automatic fallback to software WebGL/];
  const isNoise = t => NOISE.some(re => re.test(t));
  const all = logs.concat(pageErrs.map(t => ({ kind: 'page', text: t }))).filter(l => !isNoise(l.text));
  const noiseCount = logs.length + pageErrs.length - all.length;
  if (noiseCount) console.log('(ignored ' + noiseCount + ' environment-specific browser message(s))');
  console.log('\n--- console errors / warnings seen ---');
  if (!all.length) console.log('  (clean)');
  all.slice(0, 40).forEach(l => console.log('  [' + l.kind + '] ' + l.text.slice(0, 400)));
  if (notes.length) {
    console.log('\n--- informational logs ---');
    notes.slice(-10).forEach(n => console.log('  ' + n.text.slice(0, 220)));
  }

  const failed = results.filter(r => !r.ok);
  console.log('\n--- summary ---');
  console.log((results.length - failed.length) + '/' + results.length + ' checks passed; ' +
    all.length + ' console problem(s)');
  failed.forEach(f => console.log('  FAILED: ' + f.name));

  ws.close();
  proc.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* ignore */ }
  process.exit(failed.length || all.length ? 1 : 0);
}

main().catch(e => { console.error('harness error: ' + e.stack); process.exit(2); });
