// Headless-browser validation harness.
// Boots Edge/Chrome via the DevTools protocol, loads index.html from file://,
// collects console errors / uncaught exceptions, then runs a named scenario.
//
// Usage: node cdp-test.js <scenario-in-scenarios-folder>
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORT = 9411;
const BROWSERS = [
  process.env.PROGRAMFILES + '\\Google\\Chrome\\Application\\chrome.exe',
  process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\chrome.exe',
  (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe',
  process.env['PROGRAMFILES(X86)'] + '\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.PROGRAMFILES + '\\Microsoft\\Edge\\Application\\msedge.exe'
];

const scenario = process.argv[2] || 'boot';
const htmlPath = path.resolve(__dirname, 'index.html');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function findBrowser() {
  for (const b of BROWSERS) if (b && fs.existsSync(b)) return b;
  throw new Error('no Chrome/Edge found');
}

async function launch() {
  const exe = findBrowser();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'br-cdp-'));
  const args = [
    '--headless=new', '--disable-gpu', '--enable-unsafe-swiftshader', '--no-sandbox',
    '--disable-extensions', '--mute-audio', '--no-first-run', '--no-default-browser-check',
    '--window-size=1280,800', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + profile, 'about:blank'
  ];
  const proc = spawn(exe, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let stderr = '';
  proc.stderr.on('data', d => { stderr += d.toString(); });
  let targets = null;
  for (let i = 0; i < 60; i++) {
    await sleep(250);
    try {
      const r = await fetch('http://127.0.0.1:' + PORT + '/json/list');
      targets = (await r.json()).filter(t => t.type === 'page');
      if (targets.length) break;
    } catch (e) { /* not up yet */ }
  }
  if (!targets || !targets.length) {
    proc.kill();
    throw new Error('browser did not expose a page target\n' + stderr.slice(-800));
  }
  return { proc, profile, wsUrl: targets[0].webSocketDebuggerUrl };
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const ready = new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('ws error')); });
  let nextId = 1;
  const pending = new Map();
  const logs = [];
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p.rej(new Error(msg.error.message + ' (' + msg.error.code + ')'));
      else p.res(msg.result);
      return;
    }
    if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning')) {
      logs.push({ kind: msg.params.type,
        text: msg.params.args.map(a => a.value !== undefined ? String(a.value) : (a.description || a.type)).join(' ') });
    } else if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      logs.push({ kind: 'exception', text: (d.exception && d.exception.description) || d.text });
    } else if (msg.method === 'Log.entryAdded' && (msg.params.entry.level === 'error' || msg.params.entry.level === 'warning')) {
      logs.push({ kind: 'log:' + msg.params.entry.level, text: msg.params.entry.text + ' ' + (msg.params.entry.url || '') });
    }
  };
  const send = (method, params) => new Promise((res, rej) => {
    const id = nextId++;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  return { ws, send, ready, logs };
}

module.exports = { launch, connect, sleep, fileUrl, findBrowser };
