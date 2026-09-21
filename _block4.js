
/* =====================================================================
   ISLE ROYALE - a complete single-file battle royale.
   Section map, in file order (all tunables live in CONFIG):
     CONFIG / UTIL / AUDIO / WORLD GEN / TOWNS / COLLISION / FX / WEAPONS /
     LOOT / AI / HIT / ZONE / PLAYER / PLAYER MODEL / INPUT / UI / PROPS /
     MAPS / MENUS + APP / GAME LOOP / BOOT
   ===================================================================== */
/* =====================================================================
   CONFIG - every tunable value lives here.
   ===================================================================== */
const CONFIG = {
  /* ------------------------- MATCH ------------------------- */
  BOT_COUNT: 99,            // <<< AI BOTS PER MATCH (spec minimum is 40).
                            // combatants = BOT_COUNT + 1 human player.
  MAX_HP: 100,
  MAX_SHIELD: 100,
  DROP_ALTITUDE: 330,       // everyone starts the skydive here
  DROP_FALL_SPEED: 56,      // free-fall terminal speed (m/s)
  GLIDER_FALL_SPEED: 12,    // descent once the glider is out
  GLIDER_SPEED: 27,         // horizontal glider speed
  GLIDER_AUTO_ALT: 42,      // glider auto-deploys below this altitude
  DROP_MAX_TIME: 40,        // safety valve: the drop can never stall the match
  MATCH_TIME_CAP: 1500,     // hard safety cap (seconds)

  /* ------------------------- ZONE ------------------------- */
  ZONE_START_R: 470,        // initial circle radius (island fits inside)
  ZONE_WALL_H: 80,
  // wait = seconds visible before shrinking, shrink = seconds of interpolation,
  // dps = damage per second outside the circle during that phase (ignores armour)
  ZONE_PHASES: [
    { r: 400, wait: 50, shrink: 48, dps: 1 },
    { r: 290, wait: 38, shrink: 42, dps: 2 },
    { r: 200, wait: 32, shrink: 36, dps: 5 },
    { r: 134, wait: 28, shrink: 30, dps: 8 },
    { r: 84, wait: 25, shrink: 26, dps: 10 },
    { r: 46, wait: 22, shrink: 22, dps: 15 },
    { r: 22, wait: 20, shrink: 18, dps: 20 },
    { r: 7, wait: 16, shrink: 16, dps: 25 }
  ],
  SUPPLY_DROP_EVERY: 2,     // a supply crate falls every N zone phases

  /* ------------------------- MAP ------------------------- */
  MAP_SIZE: 1000,
  ISLAND_RADIUS: 425,
  SEA_LEVEL: 0,
  WATER_WADE_DEPTH: 1.1,    // deeper than this and you are swimming/slowed
  WORLD_BOUND: 492,         // hard boundary radius (invisible wall in the sea)
  TOWN_COUNT: 3,
  TREE_COUNT: 260,
  ROCK_COUNT: 170,
  CRATE_COUNT: 56,

  /* ------------------------- PLAYER FEEL ------------------------- */
  PLAYER_RADIUS: 0.42,
  SPEED_WALK: 5.7,
  SPEED_SPRINT: 8.6,
  SPEED_CROUCH: 2.8,
  SPEED_ADS: 3.1,
  SPEED_WATER: 2.6,
  ACCEL_GROUND: 52,
  ACCEL_AIR: 13,
  FRICTION: 12,
  GRAVITY: 25,
  JUMP_VEL: 8.4,
  STAMINA_MAX: 100,
  STAMINA_DRAIN: 11,
  STAMINA_REGEN: 10,
  STAMINA_MIN_SPRINT: 10,
  FALL_DAMAGE_MIN_VEL: 21,
  INTERACT_RANGE: 3.7,
  BOB_AMOUNT: 0.055,
  RECOIL_RECOVER: 7.5,

  /* ------------------------- LOOT ------------------------- */
  LOOT_PER_TOWN: 34,        // loot items rolled inside each town
  LOOT_SCATTER: 120,        // loot items scattered over the island
  MAX_GROUND_ITEMS: 420,    // hard cap on simultaneous ground items (pool guard)
  MEDKIT_HEAL: 100, MEDKIT_TIME: 6.0,
  BANDAGE_HEAL: 25, BANDAGE_TIME: 2.4,
  SHIELD_POTION: 50, SHIELD_TIME: 3.4,
  MAX_MEDKITS: 5, MAX_BANDAGES: 8, MAX_SHIELD_POTIONS: 4, MAX_GRENADES: 5,
  // damage reduction applied to bullets (NOT to zone damage) per armour tier
  ARMOR_REDUCTION: [0, 0.12, 0.25, 0.35],

  /* ------------------------- AI ------------------------- */
  BOT_SIGHT: 100,
  BOT_SIGHT_FOV_FRONT: 2.2, // bots notice enemies within this yaw cone first (radians)
  BOT_FOV_BACK: 1.1,        // ...and this cone behind them (peripheral awareness)
  BOT_TICK_NEAR: 100,       // distance under which bots tick every frame
  BOT_TICK_MID: 260,
  BOT_TICK_FAR: 420,        // beyond this they only tick a few times a second
  BOT_REACTION: [0.28, 1.1],// min/max reaction delay (seconds), scaled by skill
  BOT_SPEED_WALK: 3.4,
  BOT_SPEED_RUN: 6.4,
  BOT_HEAL_DELAY: 2.2,

  /* ------------------------- GRENADE ------------------------- */
  GRENADE_FUSE: 3.0,
  GRENADE_DAMAGE: 105,
  GRENADE_RADIUS: 7.5,
  GRENADE_SPEED: 22,
  ROCKET_DAMAGE: 92,
  ROCKET_RADIUS: 6.5,

  /* ------------------------- THIRD-PERSON CAMERA ------------------------- */
  CAM_DIST: 3.6,            // how far behind the player the camera sits
  CAM_DIST_ADS: 1.75,       // pulled in while aiming down sights
  CAM_DIST_SCOPE: 1.10,     // scoped: right behind the head, model hidden
  CAM_PIVOT: 1.52,          // orbit point (roughly the player's chest/head)
  CAM_PIVOT_CROUCH: 1.12,
  CAM_SHOULDER: 0.40,       // over-the-shoulder offset, matches the aiming eye
  CAM_SHOULDER_ADS: 0.46,
  CAM_MIN_DIST: 0.55,       // hard floor for the collision pull-in
  CAM_COLLIDE_PAD: 0.32,    // keep this much clear of whatever we hit
  CAM_GROUND_CLEAR: 0.35,   // never let the camera dip below the terrain
  CAM_PITCH_MIN: -1.20,     // look-down limit (radians)
  CAM_PITCH_MAX: 0.90,      // look-up limit
  CAM_LAG: 12,              // how quickly the camera follows the player
  MOVE_FACE_LAG: 16,        // how quickly the character turns to the aim

  /* ------------------------- LOOK & COLOURS ------------------------- */
  FOV_BASE: 78,
  FOV_SPRINT: 86,
  FOV_ADS: 55,
  RARITY_COLORS: [0xc9c9c9, 0x4ade4a, 0x3aa0ff, 0xc060ff, 0xffc020],
  RARITY_HEX: ['#c9c9c9', '#4ade4a', '#3aa0ff', '#c060ff', '#ffc020'],
  RARITY_NAMES: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'],
  AMMO_TYPES: ['light', 'medium', 'heavy', 'shells', 'rockets'],
  AMMO_LIMIT: { light: 260, medium: 260, heavy: 160, shells: 70, rockets: 10 },
  AMMO_PICKUP: { light: 30, medium: 30, heavy: 14, shells: 9, rockets: 2 }
};

/* Quality presets drive bot count scaling, tree density, shadows and particles. */
const QUALITY_PRESETS = {
  low:  { key: 'low',  label: 'Low',    botScale: 0.42, treeScale: 0.5, terrainSeg: 96,
          shadows: false, shadowMap: 1024, particles: 0.45, pixelRatio: 1.0, viewDist: 480, grass: false },
  med:  { key: 'med',  label: 'Medium', botScale: 0.68, treeScale: 0.8, terrainSeg: 128,
          shadows: true,  shadowMap: 1024, particles: 0.75, pixelRatio: 1.4, viewDist: 620, grass: true },
  high: { key: 'high', label: 'High',   botScale: 1.0,  treeScale: 1.0, terrainSeg: 160,
          shadows: true,  shadowMap: 2048, particles: 1.0, pixelRatio: 2.0, viewDist: 780, grass: true }
};

/* Runtime settings (exposed on the menus). */
const SETTINGS = {
  sensitivity: 0.0022,
  volume: 0.7,
  muted: false,
  quality: 'high',
  showFps: false
};

/* =====================================================================
   UTIL - math, seeded RNG, value noise, geometry + grid helpers.
   ===================================================================== */
const clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = t => t * t * (3 - 2 * t);
const sign = v => v < 0 ? -1 : 1;
const dist2D = (ax, az, bx, bz) => Math.sqrt((ax - bx) * (ax - bx) + (az - bz) * (az - bz));
const distSq2D = (ax, az, bx, bz) => (ax - bx) * (ax - bx) + (az - bz) * (az - bz);
const dist3D = (a, b) => Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
/* smallest signed difference between two angles (radians) */
function angDiff(a, b) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
function angLerp(a, b, t) { return a + angDiff(b, a) * t; }
/* angle of a world-space XZ direction, used by the compass and damage arrows */
const worldYaw = (x, z) => Math.atan2(x, -z);

/* ---------------- seeded RNG (mulberry32) ---------------- */
const RNG = (function () {
  let s = 1;
  function set(seed) { s = (seed >>> 0) || 1; }
  function next() {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  return {
    set, next,
    range: (a, b) => a + (b - a) * next(),
    int: (a, b) => Math.floor(a + (b - a + 1) * next()),
    sign: () => next() < 0.5 ? -1 : 1,
    chance: p => next() < p,
    pick: arr => arr[Math.floor(next() * arr.length)],
    /* weighted pick: weights is an array of numbers */
    weighted: function (weights) {
      let total = 0;
      for (let i = 0; i < weights.length; i++) total += weights[i];
      let r = next() * total;
      for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r <= 0) return i; }
      return weights.length - 1;
    },
    /* gaussian-ish via sum of uniforms, range roughly -1..1 */
    spread: () => (next() + next() + next() - 1.5) / 1.5
  };
})();

/* ---------------- integer hash + value noise + fbm ---------------- */
function hash2(ix, iz) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iz, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function valueNoise(x, z) {
  const x0 = Math.floor(x), z0 = Math.floor(z);
  const fx = smoothstep(x - x0), fz = smoothstep(z - z0);
  const a = hash2(x0, z0), b = hash2(x0 + 1, z0), c = hash2(x0, z0 + 1), d = hash2(x0 + 1, z0 + 1);
  return lerp(lerp(a, b, fx), lerp(c, d, fx), fz);
}
function fbm(x, z, octaves) {
  let sum = 0, amp = 0.5, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise(x * freq, z * freq) * amp;
    norm += amp; amp *= 0.5; freq *= 2.03;
  }
  return sum / norm;
}

/* ---------------- spatial hash grid ----------------
   Uniform bucket grid over the X/Z plane used by four systems: static world
   colliders (20), live entities/bots (40), ground loot (50) and prop spacing
   tests (6). insert() puts an object in exactly one bucket, query() gathers
   every bucket whose bounding box can overlap a circle into a caller-supplied
   array so the per-frame loops never allocate. */
function SpatialGrid(cell) {
  this.cell = cell > 0 ? cell : 1;
  this.inv = 1 / this.cell;
  this.buckets = new Map();
}
/* collision-free numeric key: |iz| would have to exceed 50 000 to alias */
SpatialGrid.prototype.key = function (ix, iz) { return ix * 100003 + iz; };
SpatialGrid.prototype.cellOf = function (v) { return Math.floor(v * this.inv); };
SpatialGrid.prototype.insert = function (x, z, obj) {
  const k = this.key(this.cellOf(x), this.cellOf(z));
  let bucket = this.buckets.get(k);
  if (!bucket) { bucket = []; this.buckets.set(k, bucket); }
  bucket.push(obj);
};
/* fills `out` (clearing it first) with every object in the buckets touching
   the square [x-r, x+r] x [z-r, z+r] and returns the same array */
SpatialGrid.prototype.query = function (x, z, r, out) {
  out.length = 0;
  const i0 = this.cellOf(x - r), i1 = this.cellOf(x + r);
  const j0 = this.cellOf(z - r), j1 = this.cellOf(z + r);
  for (let ix = i0; ix <= i1; ix++) {
    for (let iz = j0; iz <= j1; iz++) {
      const bucket = this.buckets.get(this.key(ix, iz));
      if (!bucket) continue;
      for (let k = 0; k < bucket.length; k++) out.push(bucket[k]);
    }
  }
  return out;
};
SpatialGrid.prototype.clear = function () { this.buckets.clear(); };

/* ---------------- geometry helpers ---------------- */
/* merge a list of BufferGeometry (position/normal/uv/index) into one geometry.
   Used to build low-poly gun models and loot props without extra libs. */
function mergeGeoms(geoms) {
  let vcount = 0, icount = 0;
  for (let i = 0; i < geoms.length; i++) {
    const g = geoms[i];
    vcount += g.attributes.position.count;
    icount += g.index ? g.index.count : g.attributes.position.count;
  }
  const pos = new Float32Array(vcount * 3);
  const nor = new Float32Array(vcount * 3);
  const uv = new Float32Array(vcount * 2);
  const useColor = !!geoms[0].attributes.color;
  const col = useColor ? new Float32Array(vcount * 3) : null;
  const idx = new Uint32Array(icount);
  let vo = 0, io = 0;
  for (let i = 0; i < geoms.length; i++) {
    const g = geoms[i];
    const gp = g.attributes.position;
    pos.set(gp.array, vo * 3);
    if (g.attributes.normal) nor.set(g.attributes.normal.array, vo * 3);
    if (g.attributes.uv) uv.set(g.attributes.uv.array, vo * 2);
    if (useColor) {
      if (g.attributes.color) col.set(g.attributes.color.array, vo * 3);
      else for (let k = 0; k < gp.count * 3; k++) col[vo * 3 + k] = 1;
    }
    if (g.index) {
      const gi = g.index.array;
      for (let k = 0; k < gi.length; k++) idx[io + k] = gi[k] + vo;
      io += gi.length;
    } else {
      for (let k = 0; k < gp.count; k++) idx[io + k] = vo + k;
      io += gp.count;
    }
    vo += gp.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  if (useColor) out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  return out;
}
/* one coloured box appended to a merge bucket */
function pushBox(list, w, h, d, x, y, z, ry, colorHex) {
  const g = boxGeo(w, h, d, x, y, z, ry || 0);
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  const c = new THREE.Color(colorHex);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  list.push(g);
}
/* merge a bucket into a single mesh and free the temporaries */
function mergeBucket(list, mat) {
  if (!list.length) return null;
  const geo = mergeGeoms(list);
  for (let i = 0; i < list.length; i++) list[i].dispose();
  list.length = 0;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.matrixAutoUpdate = false;
  return mesh;
}
/* axis-aligned box geometry already positioned/rotated in local space */
function boxGeo(w, h, d, x, y, z, ry) {
  const g = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Matrix4();
  if (ry) m.makeRotationY(ry);
  m.setPosition(x, y, z);
  g.applyMatrix4(m);
  return g;
}
/* procedural canvas texture helper */
function makeCanvasTexture(size, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  draw(g, size);
  const t = new THREE.CanvasTexture(c);
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); }
  t.anisotropy = 2;
  return t;
}
/* radial soft dot sprite used by the particle systems */
function makeSoftDotTexture() {
  return makeCanvasTexture(64, (g, s) => {
    const r = s / 2;
    const grad = g.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.75)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  });
}

/* =====================================================================
   AUDIO - 100% synthesized with the Web Audio API (no files, no fetches).
   ===================================================================== */
const SFX = (function () {
  let ctx = null, master = null, sfxBus = null, musicBus = null, noiseBuf = null;
  let ready = false, pulseTimer = 0, padCalm = null, padTense = null, musicMode = 'calm';
  const S = { volume: 0.7, muted: false };

  /* pink-ish noise buffer: every gunshot / step / explosion is built from it */
  function makeNoise() {
    const len = Math.floor(ctx.sampleRate * 1.2);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.04 * white) / 1.04;
      d[i] = white * 0.62 + last * 1.9;
    }
    return buf;
  }
  function init() {
    if (ready || ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { ctx = new AC(); } catch (e) { return; }
    master = ctx.createGain();
    master.gain.value = S.muted ? 0 : S.volume;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 5;
    comp.attack.value = 0.004; comp.release.value = 0.22;
    sfxBus = ctx.createGain(); sfxBus.gain.value = 1;
    musicBus = ctx.createGain(); musicBus.gain.value = 1;
    sfxBus.connect(master); musicBus.connect(master);
    master.connect(comp); comp.connect(ctx.destination);
    noiseBuf = makeNoise();
    ready = true;
    buildMusic();
    if (ctx.state === 'suspended') ctx.resume();
  }
  function resume() { if (ctx && ctx.state === 'suspended') ctx.resume(); }
  function setVolume(v) { S.volume = v; if (master) master.gain.value = S.muted ? 0 : v; }
  function setMuted(m) { S.muted = m; if (master) master.gain.value = m ? 0 : S.volume; }

  /* -------- low level voices -------- */
  function noise(dur, type, freq, q, gain, attack, pan, freqEnd) {
    if (!ready || gain <= 0.0005) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf; src.loop = true;
    src.playbackRate.value = 1 + (Math.random() - 0.5) * 0.14;
    const filt = ctx.createBiquadFilter();
    filt.type = type; filt.frequency.value = freq; filt.Q.value = q;
    if (freqEnd) filt.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + (attack || 0.004));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) p.pan.value = clamp(pan || 0, -1, 1);
    src.connect(filt); filt.connect(g);
    if (p) { g.connect(p); p.connect(sfxBus); } else g.connect(sfxBus);
    src.start(t); src.stop(t + dur + 0.05);
  }
  function tone(type, f0, f1, dur, gain, pan) {
    if (!ready || gain <= 0.0005) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(Math.max(20, f0), t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (p) p.pan.value = clamp(pan || 0, -1, 1);
    o.connect(g);
    if (p) { g.connect(p); p.connect(sfxBus); } else g.connect(sfxBus);
    o.start(t); o.stop(t + dur + 0.06);
  }
  function click(freq, gain, dur, pan) {
    noise(dur || 0.05, 'bandpass', freq, 2.4, gain, 0.001, pan);
    tone('square', freq * 0.6, freq * 0.3, (dur || 0.05) * 0.8, gain * 0.3, pan);
  }
  /* -------- positional audio: gain + stereo pan relative to the listener -------- */
  const _sv = new THREE.Vector3();
  function spatial(worldPos, maxDist) {
    if (!worldPos) return { g: 1, pan: 0 };
    _sv.copy(worldPos).sub(CAM.pos);
    const d = _sv.length();
    const g = clamp(1 - d / (maxDist || 120), 0, 1);
    const rx = Math.cos(CAM.yaw), rz = Math.sin(CAM.yaw);
    const pan = clamp((_sv.x * rx + _sv.z * rz) / Math.max(2.5, d), -1, 1) * 0.8;
    return { g: g * g, pan: pan };
  }
  /* -------- adaptive music: two pads crossfaded by match tension -------- */
  function buildMusic() {
    const t = ctx.currentTime;
    function pad(freqs, filtFreq, lfoRate) {
      const g = ctx.createGain(); g.gain.value = 0.0001;
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = filtFreq; f.Q.value = 1.4;
      const lfo = ctx.createOscillator();
      lfo.type = 'sine'; lfo.frequency.value = lfoRate;
      const lfoG = ctx.createGain(); lfoG.gain.value = filtFreq * 0.3;
      lfo.connect(lfoG); lfoG.connect(f.frequency); lfo.start(t);
      for (let i = 0; i < freqs.length; i++) {
        const o = ctx.createOscillator();
        o.type = (i % 2) ? 'triangle' : 'sawtooth';
        o.frequency.value = freqs[i];
        o.detune.value = (i - 1.5) * 6;
        const og = ctx.createGain(); og.gain.value = 1 / freqs.length;
        o.connect(og); og.connect(f); o.start(t);
      }
      f.connect(g); g.connect(musicBus);
      return { gain: g, target: 0.0001 };
    }
    padCalm = pad([55, 82.5, 110, 164.8], 420, 0.07);
    padTense = pad([58.3, 87.3, 116.5, 174.6], 950, 0.21);
  }
  function setMusicMode(m) {
    if (!ready || musicMode === m) return;
    musicMode = m;
    padCalm.target = m === 'calm' ? 0.085 : 0.03;
    padTense.target = m === 'tense' ? 0.085 : 0.0001;
  }
  function tick(dt) {
    if (!ready) return;
    const t = ctx.currentTime;
    if (padCalm) {
      padCalm.gain.gain.setTargetAtTime(padCalm.target, t, 0.7);
      padTense.gain.gain.setTargetAtTime(padTense.target, t, 0.7);
    }
    if (musicMode === 'tense') {
      pulseTimer -= dt;
      if (pulseTimer <= 0) { pulseTimer = 0.62; tone('sine', 44, 30, 0.34, 0.20, 0); }
    }
  }

  /* -------- sound bank: each entry is a tiny synthesis recipe -------- */
  const BANK = {
    pistol: p => { noise(0.20, 'bandpass', 1750, 0.9, 0.55 * p.g, 0.002, p.pan, 420); tone('square', 260, 70, 0.11, 0.20 * p.g, p.pan); },
    smg: p => { noise(0.14, 'bandpass', 2200, 1.2, 0.44 * p.g, 0.002, p.pan, 700); tone('square', 320, 110, 0.07, 0.14 * p.g, p.pan); },
    rifle: p => { noise(0.24, 'bandpass', 1250, 0.7, 0.66 * p.g, 0.002, p.pan, 220); tone('sawtooth', 180, 55, 0.15, 0.22 * p.g, p.pan); },
    lmg: p => { noise(0.30, 'lowpass', 900, 0.9, 0.72 * p.g, 0.003, p.pan, 180); tone('square', 150, 48, 0.20, 0.24 * p.g, p.pan); },
    shotgun: p => { noise(0.42, 'lowpass', 700, 0.8, 0.85 * p.g, 0.002, p.pan, 90); tone('sawtooth', 120, 38, 0.24, 0.28 * p.g, p.pan); },
    sniper: p => { noise(0.62, 'bandpass', 1000, 0.5, 0.80 * p.g, 0.002, p.pan, 110); tone('sawtooth', 150, 40, 0.38, 0.32 * p.g, p.pan); },
    launcher: p => { noise(0.34, 'lowpass', 500, 0.9, 0.75 * p.g, 0.004, p.pan, 120); tone('sine', 110, 42, 0.28, 0.28 * p.g, p.pan); },
    hitFlesh: p => { noise(0.10, 'lowpass', 620, 1.0, 0.45 * p.g, 0.001, p.pan, 180); tone('sine', 200, 90, 0.07, 0.14 * p.g, p.pan); },
    hitHead: p => { noise(0.12, 'bandpass', 1500, 1.4, 0.42 * p.g, 0.001, p.pan); tone('triangle', 1400, 700, 0.10, 0.22 * p.g, p.pan); },
    hitWall: p => { noise(0.09, 'bandpass', 2600, 1.6, 0.32 * p.g, 0.001, p.pan, 900); },
    hitShield: p => { tone('triangle', 900, 1500, 0.09, 0.16 * p.g, p.pan); noise(0.08, 'highpass', 2400, 1.2, 0.2 * p.g, 0.001, p.pan); },
    kill: p => { tone('triangle', 880, 880, 0.09, 0.20 * p.g, p.pan); setTimeout(() => tone('triangle', 1320, 1320, 0.14, 0.20 * p.g, p.pan), 80); },
    reload1: p => { click(520, 0.40 * p.g, 0.05, p.pan); noise(0.10, 'bandpass', 1200, 1.0, 0.20 * p.g, 0.002, p.pan); },
    reload2: p => { click(780, 0.40 * p.g, 0.05, p.pan); },
    reloadDone: p => { click(960, 0.46 * p.g, 0.06, p.pan); },
    step: p => { noise(0.085, 'bandpass', 1400 + Math.random() * 600, 1.1, 0.15 * p.g, 0.001, p.pan, 500); },
    stepWater: p => { noise(0.20, 'lowpass', 1300, 0.8, 0.22 * p.g, 0.004, p.pan, 400); },
    jump: p => { tone('sine', 300, 460, 0.09, 0.12 * p.g, p.pan); noise(0.07, 'bandpass', 900, 1, 0.09 * p.g, 0.001, p.pan); },
    land: p => { noise(0.18, 'lowpass', 420, 0.9, 0.48 * p.g, 0.002, p.pan, 120); tone('sine', 130, 60, 0.14, 0.22 * p.g, p.pan); },
    pickup: p => { tone('triangle', 700, 1180, 0.09, 0.18 * p.g, p.pan); },
    deny: p => { tone('square', 300, 180, 0.10, 0.13 * p.g, p.pan); },
    heal: p => { noise(0.5, 'bandpass', 700, 0.8, 0.15 * p.g, 0.05, p.pan, 1400); },
    shield: p => { tone('sine', 420, 900, 0.5, 0.15 * p.g, p.pan); tone('triangle', 640, 1240, 0.5, 0.09 * p.g, p.pan); },
    zoneWarn: p => { tone('square', 220, 220, 0.16, 0.18 * p.g, p.pan); setTimeout(() => tone('square', 300, 300, 0.22, 0.18 * p.g, p.pan), 190); },
    zoneTick: p => { noise(0.14, 'bandpass', 300, 1.6, 0.20 * p.g, 0.002, p.pan); },
    supply: p => { noise(0.9, 'lowpass', 500, 0.6, 0.20 * p.g, 0.2, p.pan, 160); },
    bounce: p => { click(300, 0.28 * p.g, 0.05, p.pan); },
    explode: p => { noise(1.1, 'lowpass', 380, 0.7, 0.9 * p.g, 0.002, p.pan, 60); tone('sine', 90, 32, 0.6, 0.45 * p.g, p.pan); },
    uiClick: p => { tone('square', 620, 760, 0.05, 0.15 * p.g, 0); },
    victory: p => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => {
      tone('triangle', f, f, 0.5, 0.18 * p.g, 0); tone('sine', f * 2, f * 2, 0.4, 0.07 * p.g, 0);
    }, i * 150)),
    death: p => [440, 370, 294, 220].forEach((f, i) => setTimeout(() => tone('sawtooth', f, f * 0.9, 0.42, 0.15 * p.g, 0), i * 190))
  };

  /* play(name, {pos:Vector3?, gain?, maxDist?, pan?}) - pos makes it positional */
  function play(name, opts) {
    if (!ready) return;
    const fn = BANK[name];
    if (!fn) return;
    const o = opts || {};
    const base = o.gain === undefined ? 1 : o.gain;
    if (o.pos) {
      const sp = spatial(o.pos, o.maxDist);
      const g = base * sp.g;
      if (g <= 0.004) return;
      fn({ g: g, pan: sp.pan });
    } else {
      fn({ g: base, pan: o.pan || 0 });
    }
  }
  return {
    init: init, resume: resume, play: play, tick: tick,
    setVolume: setVolume, setMuted: setMuted, setMusicMode: setMusicMode,
    get ready() { return ready; }
  };


})();

/* =====================================================================
   WORLD GEN - seeded island, terrain, water, towns, landmarks, props.
   Everything is procedural; only the Three.js CDN is external.
   ===================================================================== */
const World = {
  group: null,            // every world object hangs off this group (easy teardown)
  height: null, hN: 0, hStep: 1, hHalf: 0,
  colliders: [],          // {x,z,hx,hz,y0,y1} boxes and {cyl:r} cylinders
  platforms: [],          // boxes you can stand on (crates, piers, hay bales)
  grid: null,             // spatial hash of the colliders
  towns: [], lootPoints: [], landmarks: [], treeSpots: [], spawnSpots: [],
  mapCanvas: null,        // pre-rendered top-down map used by minimap + full map
  sun: null, hemi: null, water: null, waterUniforms: null, terrain: null,
  boundary: 0, quality: QUALITY_PRESETS.high   // preset is re-stamped by World.build
};

/* terrain shaping sites that get flattened before the heightmap is sampled */
const FLATS = [];

/* analytic island height. Masked hills + a central rise, then a wide shelf that
   drops below sea level so the shoreline is a proper beach. */
function baseHeight(x, z) {
  const d = Math.sqrt(x * x + z * z);
  const R = CONFIG.ISLAND_RADIUS;
  const mask = 1 - smoothstep(clamp((d - R * 0.60) / (R * 0.45), 0, 1));
  let h = fbm(x * 0.0031 + 13.2, z * 0.0031 - 5.7, 4) * 30 - 6;
  h += fbm(x * 0.0115 + 3.1, z * 0.0115 + 7.7, 3) * 6 - 2.5;
  h += clamp(1 - d / (R * 0.75), 0, 1) * 7;
  return h * mask - (1 - mask) * 26;
}
/* same function with the town / landmark pads blended in */
function shapedHeight(x, z) {
  let h = baseHeight(x, z);
  for (let i = 0; i < FLATS.length; i++) {
    const f = FLATS[i];
    const d = dist2D(x, z, f.x, f.z);
    if (d < f.r) {
      const t = 1 - smoothstep(clamp(d / f.r, 0, 1));
      h = lerp(h, f.y, t * 0.94);
    }
  }
  return h;
}

/* ---------------- heightmap: fast bilinear ground query, matches the mesh ---------------- */
function buildHeightmap(segs) {
  World.hN = segs;
  World.hStep = CONFIG.MAP_SIZE / segs;
  World.hHalf = CONFIG.MAP_SIZE / 2;
  const n = segs + 1;
  const arr = new Float32Array(n * n);
  for (let j = 0; j < n; j++) {
    const z = -World.hHalf + j * World.hStep;
    for (let i = 0; i < n; i++) {
      const x = -World.hHalf + i * World.hStep;
      arr[j * n + i] = shapedHeight(x, z);
    }
  }
  World.height = arr;
}
World.heightAt = function (x, z) {
  const n = World.hN + 1, step = World.hStep;
  let gx = (x + World.hHalf) / step, gz = (z + World.hHalf) / step;
  gx = clamp(gx, 0, World.hN - 0.0001);
  gz = clamp(gz, 0, World.hN - 0.0001);
  const i0 = Math.floor(gx), j0 = Math.floor(gz);
  const fx = gx - i0, fz = gz - j0;
  const a = World.height[j0 * n + i0], b = World.height[j0 * n + i0 + 1];
  const c = World.height[(j0 + 1) * n + i0], d = World.height[(j0 + 1) * n + i0 + 1];
  return lerp(lerp(a, b, fx), lerp(c, d, fx), fz);
};
/* how deep the sea is at this point (<=0 means dry land) */
World.waterDepth = function (x, z) { return CONFIG.SEA_LEVEL - World.heightAt(x, z); };

/* ---------------- collider bookkeeping ---------------- */
World.addCollider = function (x, z, hx, hz, y0, y1, walk) {
  const c = { x: x, z: z, hx: hx, hz: hz, y0: y0, y1: y1 };
  World.colliders.push(c);
  if (walk) World.platforms.push({ x: x, z: z, hx: hx, hz: hz, y: y1 });
  return c;
};
World.addCylinder = function (x, z, r, y0, y1) {
  const c = { cyl: true, x: x, z: z, r: r, y0: y0, y1: y1 };
  World.colliders.push(c);
  return c;
};
World.buildColliderGrid = function () {
  World.grid = new SpatialGrid(20);
  for (let i = 0; i < World.colliders.length; i++) {
    const c = World.colliders[i];
    World.grid.insert(c.x, c.z, c);
  }
};

/* ---------------- terrain mesh with vertex colours ---------------- */
function buildTerrainMesh(q) {
  const segs = q.terrainSeg;
  const geo = new THREE.PlaneGeometry(CONFIG.MAP_SIZE, CONFIG.MAP_SIZE, segs, segs);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const n = pos.count;
  const colors = new Float32Array(n * 3);
  const cSand = new THREE.Color(0xdccf9e), cWet = new THREE.Color(0xb0a179);
  const cGrass = new THREE.Color(0x5f8a44), cGrass2 = new THREE.Color(0x3f6a2c);
  const cRock = new THREE.Color(0x8b8b83), cDirt = new THREE.Color(0x8a7350);
  const tmp = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const h = World.heightAt(x, z);
    pos.setY(i, h);
    const dx = Math.abs(World.heightAt(x + 1.6, z) - h) / 1.6;
    const dz = Math.abs(World.heightAt(x, z + 1.6) - h) / 1.6;
    const slope = Math.max(dx, dz);
    if (h < -1.6) tmp.copy(cWet);
    else if (h < 2.4) tmp.copy(cSand).lerp(cWet, clamp((1.4 - h) / 3.0, 0, 1));
    else tmp.copy(cSand).lerp(cGrass, clamp((h - 2.4) / 3.2, 0, 1));
    if (h > 15) tmp.lerp(cGrass2, clamp((h - 15) / 16, 0, 1));
    if (slope > 0.85) tmp.lerp(cRock, clamp((slope - 0.85) / 1.5, 0, 1) * 0.85);
    for (let t = 0; t < World.towns.length; t++) {
      const tw = World.towns[t];
      const d = dist2D(x, z, tw.x, tw.z);
      if (d < tw.r) tmp.lerp(cDirt, (1 - d / tw.r) * 0.65);
    }
    colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = q.shadows;
  mesh.matrixAutoUpdate = false;
  World.terrain = mesh;
  World.group.add(mesh);
}
/* ---------------- animated water (custom shader, raw values so it matches
   the sRGB output of the built-in materials) ---------------- */
function buildWater() {
  const geo = new THREE.PlaneGeometry(4400, 4400, 110, 110);
  geo.rotateX(-Math.PI / 2);
  const uniforms = {
    uTime: { value: 0 },
    uDeep: { value: new THREE.Vector3(0.043, 0.180, 0.255) },
    uShallow: { value: new THREE.Vector3(0.156, 0.545, 0.647) },
    uHorizon: { value: new THREE.Vector3(0.62, 0.74, 0.80) }
  };
  const mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: [
      'uniform float uTime;',
      'varying vec3 vPos; varying float vWave;',
      'void main() {',
      '  vec3 p = position;',
      '  float w = sin(p.x * 0.055 + uTime * 1.10) * 0.34',
      '          + sin(p.z * 0.081 - uTime * 0.90) * 0.27',
      '          + sin((p.x + p.z) * 0.033 + uTime * 0.60) * 0.44;',
      '  p.y += w; vWave = w; vPos = p;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uHorizon;',
      'varying vec3 vPos; varying float vWave;',
      'void main() {',
      '  float d = clamp(length(vPos.xz) * 0.0022, 0.0, 1.0);',
      '  vec3 col = mix(uShallow, uDeep, d);',
      '  float sp = smoothstep(0.30, 0.85, vWave);',
      '  col += vec3(0.16, 0.20, 0.20) * sp;',
      '  col = mix(col, uHorizon, clamp((length(vPos.xz) - 900.0) / 1400.0, 0.0, 1.0) * 0.85);',
      '  gl_FragColor = vec4(col, 0.86);',
      '}'
    ].join('\n')
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = CONFIG.SEA_LEVEL;
  mesh.renderOrder = 1;
  World.water = mesh;
  World.waterUniforms = uniforms;
  World.group.add(mesh);
}

/* ---------------- sky dome ---------------- */
function buildSky() {
  const geo = new THREE.SphereGeometry(3000, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    vertexShader: [
      'varying vec3 vDir;',
      'void main() { vDir = normalize(position);',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vDir;',
      'void main() {',
      '  float h = clamp(vDir.y, -1.0, 1.0);',
      '  vec3 sky = vec3(0.243, 0.510, 0.780);',
      '  vec3 haze = vec3(0.760, 0.840, 0.880);',
      '  vec3 col = mix(haze, sky, smoothstep(-0.02, 0.62, h));',
      '  col = mix(col, vec3(0.86, 0.90, 0.92), smoothstep(0.10, -0.35, h));',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n')
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.matrixAutoUpdate = false;
  mesh.renderOrder = -1;
  World.group.add(mesh);
}

/* ---------------- sun / ambient ---------------- */
function buildLights(q) {
  const hemi = new THREE.HemisphereLight(0xbcd9ef, 0x50543a, 1.05);
  hemi.position.set(0, 120, 0);
  World.group.add(hemi);
  World.hemi = hemi;
  const sun = new THREE.DirectionalLight(0xfff2d4, 2.15);
  sun.position.set(180, 260, 120);
  if (q.shadows) {
    sun.castShadow = true;
    sun.shadow.mapSize.width = sun.shadow.mapSize.height = q.shadowMap;
    const s = 70;
    sun.shadow.camera.left = -s; sun.shadow.camera.right = s;
    sun.shadow.camera.top = s; sun.shadow.camera.bottom = -s;
    sun.shadow.camera.near = 1; sun.shadow.camera.far = 420;
    sun.shadow.bias = -0.0012;
    sun.shadow.normalBias = 0.6;
  }
  World.group.add(sun);
  World.group.add(sun.target);
  World.sun = sun;
  App.scene.fog = new THREE.Fog(0xafc9d8, Math.max(160, q.viewDist * 0.42), q.viewDist);
}

/* ---------------- site selection helpers ---------------- */
function pickSites(count, minSep, rMin, rMax, hMin, hMax) {
  const out = [];
  let guard = 0;
  while (out.length < count && guard++ < 900) {
    const a = RNG.range(0, Math.PI * 2);
    const r = RNG.range(rMin, rMax);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = baseHeight(x, z);
    if (h < hMin || h > hMax) continue;
    let ok = true;
    for (let i = 0; i < out.length; i++) if (dist2D(out[i].x, out[i].z, x, z) < minSep) { ok = false; break; }
    for (let i = 0; i < FLATS.length; i++) if (dist2D(FLATS[i].x, FLATS[i].z, x, z) < minSep * 0.6) { ok = false; break; }
    if (ok) out.push({ x: x, z: z, y: h });
  }
  return out;
}
/* find one site whose analytic height satisfies a predicate */
function findSite(pred, minSepFromTowns) {
  let guard = 0;
  while (guard++ < 1500) {
    const a = RNG.range(0, Math.PI * 2);
    const r = RNG.range(90, 400);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = baseHeight(x, z);
    if (!pred(x, z, h)) continue;
    let ok = true;
    for (let i = 0; i < FLATS.length; i++) if (dist2D(FLATS[i].x, FLATS[i].z, x, z) < minSepFromTowns) { ok = false; break; }
    for (let i = 0; i < World.landmarks.length; i++) {
      if (dist2D(World.landmarks[i].x, World.landmarks[i].z, x, z) < 120) { ok = false; break; }
    }
    if (ok) return { x: x, z: z, y: h };
  }
  return null;
}
/* find a landmark site, relaxing the separation requirement on later passes so
   an unlucky seed never leaves a navigation landmark missing entirely */
function findSiteWithRetry(preds, sep) {
  const list = Array.isArray(preds) ? preds : [preds];
  for (let pass = 0; pass < list.length; pass++) {
    const site = findSite(list[pass], Math.max(60, sep * (1 - pass * 0.3)));
    if (site) return site;
  }
  return null;
}
/* ---------------- loot scatter over the open island ---------------- */
function scatterLootPoints() {
  let added = 0, guard = 0;
  while (added < CONFIG.LOOT_SCATTER && guard++ < 8000) {
    let x, z;
    if (RNG.chance(0.55) && World.towns.length) {
      const t = World.towns[RNG.int(0, World.towns.length - 1)];
      const a = RNG.range(0, Math.PI * 2), r = RNG.range(12, 95);
      x = t.x + Math.cos(a) * r; z = t.z + Math.sin(a) * r;
    } else {
      const a = RNG.range(0, Math.PI * 2), r = RNG.range(0, CONFIG.ISLAND_RADIUS * 0.92);
      x = Math.cos(a) * r; z = Math.sin(a) * r;
    }
    const h = World.heightAt(x, z);
    if (h < 2.0 || h > 32) continue;
    World.lootPoints.push({ x: x, z: z, y: h + 0.35 });
    added++;
  }
}

const LANDMARK_NAMES = { plane: 'CRASH SITE', radio: 'RADIO TOWER', lighthouse: 'LIGHTHOUSE', pier: 'OLD PIER' };
const TOWN_NAMES = ['RIVERSIDE', 'FOUNDRY', 'OLD HARBOR', 'PINE CAMP'];

/* ---------------- full world build ---------------- */
World.build = function (q, seed) {
  World.dispose();
  World.quality = q;
  World.colliders.length = 0;
  World.platforms.length = 0;
  World.towns.length = 0;
  World.lootPoints.length = 0;
  World.landmarks.length = 0;
  World.treeSpots.length = 0;
  World.spawnSpots.length = 0;
  FLATS.length = 0;
  World.boundary = CONFIG.WORLD_BOUND;
  RNG.set(seed);
  World.group = new THREE.Group();
  App.scene.add(World.group);

  /* 1. towns on flat-ish land, and the flatten pads they need */
  const townSites = pickSites(CONFIG.TOWN_COUNT, 235, 120, 320, 5, 26);
  for (let i = 0; i < townSites.length; i++) {
    FLATS.push({ x: townSites[i].x, z: townSites[i].z, r: 66, y: townSites[i].y });
  }
  World.spawnSpots.push({ x: 0, z: 0, w: 0.6 });
  for (let i = 0; i < townSites.length; i++) {
    World.spawnSpots.push({ x: townSites[i].x, z: townSites[i].z, w: 3.0, name: TOWN_NAMES[i] });
  }

  /* 2. landmark sites (each one also flattens a small pad) */
  function tryLandmark(type, pred, sep, padR) {
    const site = findSiteWithRetry(pred, sep);
    if (!site) return;
    World.landmarks.push({
      type: type, x: site.x, z: site.z, y: site.y,
      name: LANDMARK_NAMES[type], rot: RNG.range(0, Math.PI * 2)
    });
    if (padR > 0) FLATS.push({ x: site.x, z: site.z, r: padR, y: site.y });
    World.spawnSpots.push({ x: site.x, z: site.z, w: 1.4, name: LANDMARK_NAMES[type] });
  }
  tryLandmark('plane', [(x, z, h) => h > 7 && h < 24, (x, z, h) => h > 5 && h < 27], 190, 38);
  tryLandmark('radio', [(x, z, h) => h > 15, (x, z, h) => h > 11], 165, 20);
  tryLandmark('lighthouse', [(x, z, h) => h > 1.0 && h < 5.5, (x, z, h) => h > 0.6 && h < 8], 150, 13);
  tryLandmark('pier', [(x, z, h) => h > -1.6 && h < 1.6, (x, z, h) => h > -3.2 && h < 3.2], 140, 0);

  /* 3. sample the heightmap, then generate everything that sits on it */
  buildHeightmap(q.terrainSeg);
  for (let i = 0; i < townSites.length; i++) generateTown(townSites[i], i);
  generateLandmarks();
  flushStaticBuckets();
  buildTerrainMesh(q);
  generateProps(q);
  buildWater();
  buildSky();
  buildLights(q);
  World.buildColliderGrid();
  scatterLootPoints();
  buildMapImage(World.towns, World.landmarks);
};

/* ---------------- teardown (called on restart, so nothing leaks) ---------------- */
World.dispose = function () {
  if (!World.group) return;
  App.scene.remove(World.group);
  World.group.traverse(function (o) {
    if (o.geometry && o.geometry.dispose) o.geometry.dispose();
    const m = o.material;
    if (!m) return;
    const mats = Array.isArray(m) ? m : [m];
    for (let i = 0; i < mats.length; i++) {
      const mat = mats[i];
      for (const k in mat) {
        const v = mat[k];
        if (v && v.isTexture && v.dispose) v.dispose();
      }
      if (mat.dispose) mat.dispose();
    }
  });
  World.group = null;
  World.water = null;
  World.terrain = null;
  World.sun = null;
  App.scene.fog = null;
};



/* =====================================================================
   TOWNS - buildings with real door/window gaps, merged into a handful of
   draw calls. Every wall segment registers a collider.
   ===================================================================== */
const WALL_C = 0xd6cdb8, WALL_C2 = 0xc3b7a0, ROOF_C = 0x6d4b3a, ROOF_C2 = 0x4d5a63,
      WOOD_C = 0x8a6a44, FENCE_C = 0x9c8b6b, METAL_C = 0xb9c2c6;

function generateTown(site, index) {
  const town = {
    name: TOWN_NAMES[index % TOWN_NAMES.length],
    x: site.x, z: site.z, y: World.heightAt(site.x, site.z), r: 78, buildings: []
  };
  World.towns.push(town);
  const cols = RNG.int(3, 3), rows = RNG.int(3, 4);
  const block = 36;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const gx = town.x + (c - (cols - 1) / 2) * block + RNG.range(-4, 4);
      const gz = town.z + (r - (rows - 1) / 2) * block + RNG.range(-4, 4);
      /* leave streets / plazas open */
      if (RNG.chance(0.18)) continue;
      const w = RNG.range(11, 17), d = RNG.range(10, 16);
      const floors = RNG.int(1, 2);
      const hh = floors === 1 ? RNG.range(4.2, 5.2) : RNG.range(7.6, 9.2);
      const baseY = World.heightAt(gx, gz);
      addBuilding(gx, gz, baseY, w, d, hh, town);
    }
  }
  /* a perimeter of fences, crates and hay bales to fight around */
  for (let i = 0; i < 26; i++) {
    const a = RNG.range(0, Math.PI * 2), rr = RNG.range(50, 76);
    const x = town.x + Math.cos(a) * rr, z = town.z + Math.sin(a) * rr;
    const y = World.heightAt(x, z);
    if (y < 2) continue;
    if (RNG.chance(0.45)) addCrate(x, z, y, town);
    else if (RNG.chance(0.5)) addHayBale(x, z, y);
    else addFenceRun(x, z, y);
  }
  for (let i = 0; i < CONFIG.LOOT_PER_TOWN; i++) {
    const b = town.buildings.length ? town.buildings[RNG.int(0, town.buildings.length - 1)] : null;
    let x, z;
    if (b) { x = b.x + RNG.range(-b.w * 0.32, b.w * 0.32); z = b.z + RNG.range(-b.d * 0.32, b.d * 0.32); }
    else { x = town.x + RNG.range(-40, 40); z = town.z + RNG.range(-40, 40); }
    World.lootPoints.push({ x: x, z: z, y: World.heightAt(x, z) + 0.35, town: true });
  }
}

/* one building: four walls with a door gap on one side and window gaps on the
   rest, a roof slab and a foundation. rot is 0 or PI/2 so colliders stay AABBs. */
function addBuilding(cx, cz, baseY, w, d, hh, town) {
  if (RNG.chance(0.5)) { const t = w; w = d; d = t; }
  const t = 0.34;                    // wall thickness
  const doorW = 2.2, doorH = 2.35, sillY = 1.05, headY = 2.3;
  const doorSide = RNG.int(0, 3);
  const wallCol = RNG.chance(0.5) ? WALL_C : WALL_C2;
  const roofCol = RNG.chance(0.5) ? ROOF_C : ROOF_C2;
  const y0 = baseY - 1.2, y1 = baseY + hh;
  const b = { x: cx, z: cz, w: w, d: d, y: baseY, floors: hh > 6 ? 2 : 1 };
  town.buildings.push(b);

  for (let s = 0; s < 4; s++) {
    const alongX = (s < 2);                       // 0:-x 1:+x 2:-z 3:+z
    const len = alongX ? d : w;
    const px = s === 0 ? cx - w / 2 : (s === 1 ? cx + w / 2 : cx);
    const pz = s === 2 ? cz - d / 2 : (s === 3 ? cz + d / 2 : cz);
    const seg = alongX ? t : len;                 // extent along z for side walls
    /* helper to place one chunk of this wall */
    const chunk = (offset, length, y, height) => {
      if (length <= 0.02 || height <= 0.02) return;
      if (alongX) pushBox(WALL_BUCKET, t, height, length, px, y, pz + offset, 0, wallCol);
      else pushBox(WALL_BUCKET, length, height, t, px + offset, y, pz, 0, wallCol);
    };
    if (s === doorSide) {
      const half = (len - doorW) / 2;
      chunk(-(doorW / 2 + half / 2), half, baseY + hh / 2, hh);
      chunk((doorW / 2 + half / 2), half, baseY + hh / 2, hh);
      chunk(0, doorW, baseY + doorH + (hh - doorH) / 2, hh - doorH);   // lintel
      /* colliders: two solid chunks, the doorway stays open */
      if (alongX) {
        World.addCollider(px, pz - (doorW / 2 + half / 2), t / 2, half / 2, y0, y1);
        World.addCollider(px, pz + (doorW / 2 + half / 2), t / 2, half / 2, y0, y1);
      } else {
        World.addCollider(px - (doorW / 2 + half / 2), pz, half / 2, t / 2, y0, y1);
        World.addCollider(px + (doorW / 2 + half / 2), pz, half / 2, t / 2, y0, y1);
      }
    } else {
      const winW = Math.min(3.2, len * 0.34);
      const side = (len - winW) / 2;
      chunk(-(winW / 2 + side / 2), side, baseY + hh / 2, hh);
      chunk((winW / 2 + side / 2), side, baseY + hh / 2, hh);
      chunk(0, winW, baseY + sillY / 2, sillY);                        // below the window
      chunk(0, winW, baseY + headY + (hh - headY) / 2, hh - headY);    // above the window
      if (alongX) World.addCollider(px, pz, t / 2, len / 2, y0, y1);
      else World.addCollider(px, pz, len / 2, t / 2, y0, y1);
    }
  }
  /* foundation + roof, with a little overhang */
  pushBox(WALL_BUCKET, w + 0.7, 0.5, d + 0.7, cx, baseY - 0.15, cz, 0, 0x9a9184);
  pushBox(ROOF_BUCKET, w + 1.1, 0.42, d + 1.1, cx, baseY + hh + 0.2, cz, 0, roofCol);
  /* roof trim so the silhouette reads as a building from the air */
  pushBox(ROOF_BUCKET, w + 1.2, 0.22, 0.5, cx, baseY + hh + 0.45, cz - d / 2 - 0.55, 0, roofCol);
  pushBox(ROOF_BUCKET, w + 1.2, 0.22, 0.5, cx, baseY + hh + 0.45, cz + d / 2 + 0.55, 0, roofCol);
  pushBox(WOOD_BUCKET, 0.9, 0.9, 0.9, cx + RNG.range(-w * 0.3, w * 0.3), baseY + hh + 0.85,
          cz + RNG.range(-d * 0.3, d * 0.3), 0, METAL_C);
  /* an interior wall on two-storey buildings for extra cover */
  if (hh > 6) {
    const iy = baseY + hh * 0.5;
    pushBox(WALL_BUCKET, w - 2.6, 0.35, 0.3, cx, iy, cz, 0, wallCol);
  }
}
/* geometry buckets: every static prop is merged down to four draw calls */
const WALL_BUCKET = [], ROOF_BUCKET = [], WOOD_BUCKET = [], METAL_BUCKET = [];

/* push any geometry (cylinder, cone, box) into a bucket with a flat colour */
function pushGeo(list, geo, colorHex) {
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  const c = new THREE.Color(colorHex);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  list.push(geo);
}
/* position/rotate a geometry in place */
function xform(g, x, y, z, ry, rz, rx) {
  const m = new THREE.Matrix4();
  m.makeRotationFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0, 'YXZ'));
  m.setPosition(x, y, z);
  g.applyMatrix4(m);
  return g;
}
function pushCyl(list, rt, rb, h, seg, x, y, z, ry, rz, rx, colorHex) {
  const g = new THREE.CylinderGeometry(rt, rb, h, seg, 1);
  xform(g, x, y, z, ry, rz, rx);
  pushGeo(list, g, colorHex);
}

/* ---------------- cover props ---------------- */
function addCrate(x, z, y) {
  const s = RNG.range(0.95, 1.25);
  const ry = RNG.range(0, 1.5);
  pushBox(WOOD_BUCKET, s, s, s, x, y + s / 2, z, ry, RNG.chance(0.5) ? WOOD_C : 0xa07f52);
  /* a cube's footprint grows when it is rotated; size the collider to that so
     you never sink into the visible corner */
  const half = (Math.abs(Math.cos(ry)) + Math.abs(Math.sin(ry))) * s / 2;
  World.addCollider(x, z, half, half, y - 0.5, y + s, true);
  if (RNG.chance(0.35)) World.lootPoints.push({ x: x + RNG.range(-1.8, 1.8), z: z + RNG.range(-1.8, 1.8), y: y + 0.35 });
}
function addHayBale(x, z, y) {
  const w = RNG.range(1.5, 2.1);
  const ry = RNG.range(0, 3.1);
  pushBox(WOOD_BUCKET, w, 0.95, 1.15, x, y + 0.48, z, ry, 0xd6c071);
  const half = (Math.abs(Math.cos(ry)) * w + Math.abs(Math.sin(ry)) * 1.15) / 2;
  const depth = (Math.abs(Math.sin(ry)) * w + Math.abs(Math.cos(ry)) * 1.15) / 2;
  World.addCollider(x, z, half, depth, y - 0.5, y + 0.95, true);
}
function addFenceRun(x, z, y) {
  const ry = RNG.range(0, Math.PI);
  const len = RNG.range(6, 12);
  const dx = Math.cos(ry), dz = Math.sin(ry);
  for (let i = 0; i <= 3; i++) {
    pushBox(WOOD_BUCKET, 0.22, 1.45, 0.22, x + dx * (len * i / 3), y + 0.72, z + dz * (len * i / 3), ry, FENCE_C);
  }
  pushBox(WOOD_BUCKET, len, 0.16, 0.14, x + dx * len / 2, y + 1.15, z + dz * len / 2, -ry, FENCE_C);
  pushBox(WOOD_BUCKET, len, 0.16, 0.14, x + dx * len / 2, y + 0.6, z + dz * len / 2, -ry, FENCE_C);
  /* A rotated fence is long and thin, so one big AABB would block a whole
     square of empty air next to it. Hug the rail with a chain of little
     cylinders instead - you can stand right beside it but not through it. */
  const n = Math.ceil(len / 0.9);
  for (let i = 0; i <= n; i++) {
    World.addCylinder(x + dx * (len * i / n), z + dz * (len * i / n), 0.32, y - 0.5, y + 1.4);
  }
}
/* ---------------- landmarks: crashed plane, radio tower, lighthouse, pier ---------------- */
function generateLandmarks() {
  for (let i = 0; i < World.landmarks.length; i++) {
    const lm = World.landmarks[i];
    const y = World.heightAt(lm.x, lm.z);
    lm.y = y;
    if (lm.type === 'plane') buildPlaneCrash(lm, y, lm.rot);
    else if (lm.type === 'radio') buildRadioTower(lm, y, lm.rot);
    else if (lm.type === 'lighthouse') buildLighthouse(lm, y, lm.rot);
    else if (lm.type === 'pier') buildPier(lm, y, lm.rot);
  }
}
function buildPlaneCrash(c, y, ry) {
  pushCyl(METAL_BUCKET, 2.4, 2.6, 13, 12, c.x, y + 2.3, c.z, ry, Math.PI / 2, 0, 0xdfe3e6);
  pushCyl(METAL_BUCKET, 2.3, 2.4, 10, 12, c.x + Math.cos(ry) * 13.5, y + 3.2,
          c.z + Math.sin(ry) * 13.5, ry + 0.28, Math.PI / 2 + 0.22, 0, 0xc9ced2);
  World.addCylinder(c.x, c.z, 2.6, y - 1, y + 4.4);
  World.addCylinder(c.x + Math.cos(ry) * 13.5, c.z + Math.sin(ry) * 13.5, 2.4, y - 1, y + 5.0);
  const wx = Math.sin(ry), wz = Math.cos(ry);
  pushBox(METAL_BUCKET, 2.2, 0.45, 26, c.x + wx * 3, y + 2.6, c.z + wz * 3, -ry, 0xd3d8db);
  pushBox(METAL_BUCKET, 2.0, 0.4, 20, c.x - wx * 3, y + 2.3, c.z - wz * 3, -ry, 0xd3d8db);
  /* The wing used to take one axis-aligned box sized to its 26 m span, which
     blocked a huge square of empty air. Chain small cylinders along its real
     (rotated) axis instead, and keep the whole thing high enough to duck under:
     the lowest edge is above head height, so it only blocks bullets and LOS. */
  for (let i = -5; i <= 5; i++) {
    const d = i * 2.2;
    World.addCylinder(c.x + wx * 3 - wx * d, c.z + wz * 3 + wz * d, 1.25, y + 2.05, y + 3.0);
  }
  pushBox(METAL_BUCKET, 0.3, 5.5, 3.4, c.x - Math.cos(ry) * 7, y + 4.6,
          c.z - Math.sin(ry) * 7, -ry, 0xe6e9ea);
  /* tail fin: a tall thin sail, roughly covered by one cylinder */
  World.addCylinder(c.x - Math.cos(ry) * 7, c.z - Math.sin(ry) * 7, 0.9, y + 1.8, y + 4.9);
  for (let i = 0; i < 9; i++) {
    const a = ry + RNG.range(-1.2, 1.2), d = RNG.range(9, 26);
    const px = c.x + Math.cos(a) * d, pz = c.z + Math.sin(a) * d;
    const py = World.heightAt(px, pz);
    pushBox(METAL_BUCKET, RNG.range(0.6, 1.8), RNG.range(0.4, 1.6), RNG.range(0.6, 1.8),
            px, py + 0.4, pz, RNG.range(0, 3), RNG.chance(0.4) ? 0x8f969b : 0xd3d8db);
    World.addCollider(px, pz, 0.9, 0.9, py - 1, py + 1.4, true);
  }
  for (let i = 0; i < 8; i++) {
    const a = RNG.range(0, Math.PI * 2), d = RNG.range(7, 24);
    const px = c.x + Math.cos(a) * d, pz = c.z + Math.sin(a) * d;
    World.lootPoints.push({ x: px, z: pz, y: World.heightAt(px, pz) + 0.35 });
  }
}
function buildRadioTower(c, y, ry) {
  const legH = 34, spread = 3.4;
  for (let i = 0; i < 4; i++) {
    const a = ry + i * Math.PI / 2 + Math.PI / 4;
    const lx = c.x + Math.cos(a) * spread, lz = c.z + Math.sin(a) * spread;
    pushBox(METAL_BUCKET, 0.42, legH, 0.42, lx, y + legH / 2, lz, 0, 0x8d9499);
    World.addCylinder(lx, lz, 0.5, y - 1, y + legH);
  }
  for (let level = 0; level < 8; level++) {
    const h = y + 3 + level * 4;
    for (let i = 0; i < 4; i++) {
      const a = ry + i * Math.PI / 2 + Math.PI / 4;
      const a2 = a + Math.PI / 2;
      const x1 = c.x + Math.cos(a) * spread, z1 = c.z + Math.sin(a) * spread;
      const x2 = c.x + Math.cos(a2) * spread, z2 = c.z + Math.sin(a2) * spread;
      pushBox(METAL_BUCKET, dist2D(x1, z1, x2, z2), 0.16, 0.16, (x1 + x2) / 2, h, (z1 + z2) / 2,
              -Math.atan2(z2 - z1, x2 - x1), 0xa3a9ad);
      pushBox(METAL_BUCKET, 0.14, 0.14, 4.6, x1, h - 2, z1, 0, 0x9aa1a6);
    }
  }
  pushCyl(METAL_BUCKET, 0.28, 0.28, 4, 6, c.x, y + legH + 2, c.z, 0, 0, 0, 0xd2453c);
  pushBox(METAL_BUCKET, 5.2, 0.3, 5.2, c.x, y + 6, c.z, ry, 0x7d8489);
  for (let i = 0; i < 5; i++) {
    const a = RNG.range(0, Math.PI * 2), d = RNG.range(5, 16);
    const px = c.x + Math.cos(a) * d, pz = c.z + Math.sin(a) * d;
    World.lootPoints.push({ x: px, z: pz, y: World.heightAt(px, pz) + 0.35 });
  }
  addCrate(c.x + 6, c.z + 5, World.heightAt(c.x + 6, c.z + 5));
  addCrate(c.x - 5, c.z - 6, World.heightAt(c.x - 5, c.z - 6));
}
function buildLighthouse(c, y, ry) {
  pushCyl(METAL_BUCKET, 4.6, 6.2, 3.6, 14, c.x, y + 1.4, c.z, 0, 0, 0, 0x8f8b80);
  World.addCylinder(c.x, c.z, 5.6, y - 1, y + 3.4);
  const H = 24;
  pushCyl(METAL_BUCKET, 2.6, 3.6, H, 14, c.x, y + 3 + H / 2, c.z, 0, 0, 0, 0xf2efe6);
  World.addCylinder(c.x, c.z, 3.3, y + 3, y + 3 + H);
  for (let i = 0; i < 3; i++) {
    pushCyl(METAL_BUCKET, 3.35, 3.35, 2.6, 14, c.x, y + 7 + i * 7.5, c.z, 0, 0, 0,
            (i % 2) ? 0xf2efe6 : 0xc0392b);
  }
  const top = y + 3 + H;
  pushCyl(METAL_BUCKET, 3.0, 2.7, 1.2, 14, c.x, top + 0.6, c.z, 0, 0, 0, 0x6d7479);
  pushCyl(METAL_BUCKET, 2.9, 2.9, 3.2, 12, c.x, top + 2.6, c.z, 0, 0, 0, 0x9fd8e8);
  pushCyl(METAL_BUCKET, 0.2, 2.8, 2.4, 12, c.x, top + 5.2, c.z, 0, 0, 0, 0xc0392b);
  for (let i = 0; i < 4; i++) {
    const a = ry + i * 1.57;
    const px = c.x + Math.cos(a) * 8, pz = c.z + Math.sin(a) * 8;
    pushBox(WOOD_BUCKET, 1.4, 0.8, 1.4, px, y + 0.6, pz, a, WOOD_C);
    World.addCollider(px, pz, 0.7, 0.7, y - 0.6, y + 1.0, true);
  }
  for (let i = 0; i < 5; i++) {
    const a = RNG.range(0, Math.PI * 2), d = RNG.range(7, 15);
    const px = c.x + Math.cos(a) * d, pz = c.z + Math.sin(a) * d;
    World.lootPoints.push({ x: px, z: pz, y: World.heightAt(px, pz) + 0.35 });
  }
}
/* the pier steps out over the water from the beach and ends in a wide deck */
function buildPier(c, y, ry) {
  const len = Math.sqrt(c.x * c.x + c.z * c.z) || 1;
  const dx = c.x / len, dz = c.z / len;             // outward from the island centre
  const steps = 11, gap = 2.3, w = 8.5;
  const ax = Math.abs(dx), az = Math.abs(dz);
  let deckY = y;
  for (let i = 0; i < steps; i++) {
    const px = c.x + dx * i * gap, pz = c.z + dz * i * gap;
    deckY = y + 0.3 + i * 0.36;                     // gentle climb, each step is walkable
    pushBox(WOOD_BUCKET, ax * gap + az * w, 0.32, az * gap + ax * w, px, deckY, pz, 0, WOOD_C);
    World.addCollider(px, pz, ax * gap / 2 + az * w / 2, az * gap / 2 + ax * w / 2, deckY - 1.4, deckY, true);
    if (i % 2 === 0) {
      const ph = deckY + 8;
      pushCyl(WOOD_BUCKET, 0.32, 0.32, ph, 6, px, deckY - ph / 2, pz, 0, 0, 0, 0x6f5638);
    }
  }
  const ex = c.x + dx * steps * gap, ez = c.z + dz * steps * gap;
  const endY = y + 0.3 + steps * 0.36;
  pushBox(WOOD_BUCKET, 14, 0.34, 14, ex, endY, ez, 0, WOOD_C);
  World.addCollider(ex, ez, 7, 7, endY - 1.4, endY, true);
  for (let i = 0; i < 4; i++) {
    const ox = RNG.sign() * RNG.range(4, 6), oz = RNG.sign() * RNG.range(4, 6);
    const bx = ex + (ax > az ? ox : ox * 0.5), bz = ez + (ax > az ? oz * 0.5 : oz);
    pushCyl(WOOD_BUCKET, 0.34, 0.34, endY + 9, 6, bx, endY - (endY + 9) / 2, bz, 0, 0, 0, 0x6f5638);
    pushBox(WOOD_BUCKET, 2.2, 2.4, 2.2, bx, endY + 1.4, bz, RNG.range(0, 3), 0x6b5a3f);
    World.addCollider(bx, bz, 1.1, 1.1, endY, endY + 2.6, true);
  }
  for (let i = 0; i < 6; i++) {
    World.lootPoints.push({ x: ex + RNG.range(-5.5, 5.5), z: ez + RNG.range(-5.5, 5.5), y: endY + 0.7 });
  }
  c.deckY = endY;
}
/* merge the static buckets into four meshes: four draw calls for every town,
   landmark, fence, crate and hay bale on the whole map */
function flushStaticBuckets() {
  const lam = new THREE.MeshLambertMaterial({ vertexColors: true });
  const meshes = [
    mergeBucket(WALL_BUCKET, lam), mergeBucket(ROOF_BUCKET, lam),
    mergeBucket(WOOD_BUCKET, lam), mergeBucket(METAL_BUCKET, lam)
  ];
  for (let i = 0; i < meshes.length; i++) {
    const m = meshes[i];
    if (!m) continue;
    m.castShadow = !!World.quality.shadows;
    m.receiveShadow = !!World.quality.shadows;
    World.group.add(m);
  }
}




/* =====================================================================
   COLLISION - boxes + cylinders resolved against a moving circle, plus
   ray helpers used for bullets, AI line-of-sight and ground queries.
   ===================================================================== */
const _cq = [];      // scratch array reused by every collider query

/* highest walkable surface under (x,z) that is at most stepUp above feetY */
World.groundAt = function (x, z, feetY) {
  let g = World.heightAt(x, z);
  const plats = World.platforms;
  for (let i = 0; i < plats.length; i++) {
    const p = plats[i];
    if (p.y > g && p.y <= feetY + 0.62 &&
        x > p.x - p.hx && x < p.x + p.hx && z > p.z - p.hz && z < p.z + p.hz) g = p.y;
  }
  return g;
};

/* push a circle (x,z,r) out of nearby colliders. feetY/headY describe the body
   so low steps and overhangs are ignored. Returns true when something was hit. */
World.resolve = function (pos, r, feetY, headY) {
  let hit = false;
  World.grid.query(pos.x, pos.z, r + 6, _cq);
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < _cq.length; i++) {
      const c = _cq[i];
      if (c.y1 <= feetY + 0.62 || c.y0 >= headY) continue;
      if (c.cyl) {
        const dx = pos.x - c.x, dz = pos.z - c.z;
        const d = Math.sqrt(dx * dx + dz * dz);
        const min = c.r + r;
        if (d < min) {
          const inv = d > 0.0001 ? 1 / d : 0;
          const push = (min - d);
          pos.x += (d > 0.0001 ? dx * inv : 1) * push;
          pos.z += (d > 0.0001 ? dz * inv : 0) * push;
          hit = true;
        }
      } else {
        const cx = clamp(pos.x, c.x - c.hx, c.x + c.hx);
        const cz = clamp(pos.z, c.z - c.hz, c.z + c.hz);
        const dx = pos.x - cx, dz = pos.z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 > r * r) continue;
        hit = true;
        if (d2 > 0.000001) {
          const d = Math.sqrt(d2);
          const push = r - d;
          pos.x += (dx / d) * push;
          pos.z += (dz / d) * push;
        } else {
          /* centre is inside the box: escape along the shallowest axis */
          const lx = pos.x - (c.x - c.hx), rx = (c.x + c.hx) - pos.x;
          const lz = pos.z - (c.z - c.hz), rz = (c.z + c.hz) - pos.z;
          const mx = Math.min(lx, rx), mz = Math.min(lz, rz);
          if (mx < mz) pos.x += (lx < rx ? -(mx + r) : (mx + r));
          else pos.z += (lz < rz ? -(mz + r) : (mz + r));
        }
      }
    }
  }
  /* world boundary: a soft circular wall out in the water */
  const b = World.boundary;
  const dc = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
  if (dc > b) {
    const inv = b / dc;
    pos.x *= inv; pos.z *= inv;
    hit = true;
  }
  return hit;
};

/* slab test for a ray against one axis-aligned collider box.
   Returns the entry distance or -1. */
function rayBox(ox, oy, oz, dx, dy, dz, c, maxT) {
  let tmin = 0, tmax = maxT;
  const b0 = [c.x - c.hx, c.y0, c.z - c.hz];
  const b1 = [c.x + c.hx, c.y1, c.z + c.hz];
  const o = [ox, oy, oz], d = [dx, dy, dz];
  for (let i = 0; i < 3; i++) {
    if (Math.abs(d[i]) < 0.000001) {
      if (o[i] < b0[i] || o[i] > b1[i]) return -1;
    } else {
      const inv = 1 / d[i];
      let t1 = (b0[i] - o[i]) * inv, t2 = (b1[i] - o[i]) * inv;
      if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
      if (t1 > tmin) tmin = t1;
      if (t2 < tmax) tmax = t2;
      if (tmin > tmax) return -1;
    }
  }
  return tmin;
}
function rayCylinder(ox, oy, oz, dx, dy, dz, c, maxT) {
  const mx = ox - c.x, mz = oz - c.z;
  const a = dx * dx + dz * dz;
  if (a < 0.0000001) return -1;
  const b = 2 * (mx * dx + mz * dz);
  const cc = mx * mx + mz * mz - c.r * c.r;
  const disc = b * b - 4 * a * cc;
  if (disc < 0) return -1;
  const sq = Math.sqrt(disc);
  let t = (-b - sq) / (2 * a);
  if (t < 0) t = (-b + sq) / (2 * a);
  if (t < 0 || t > maxT) return -1;
  const y = oy + dy * t;
  if (y < c.y0 || y > c.y1) {
    /* hit the side but outside the vertical span: test the cap planes cheaply */
    if (Math.abs(dy) < 0.000001) return -1;
    const ty = ((dy > 0 ? c.y0 : c.y1) - oy) / dy;
    if (ty < 0 || ty > maxT) return -1;
    const hx = ox + dx * ty - c.x, hz = oz + dz * ty - c.z;
    if (hx * hx + hz * hz > c.r * c.r) return -1;
    return ty;
  }
  return t;
}
/* nearest world/collider hit along a ray. outInfo is filled in and reused. */
const _rayHit = { t: 0, nx: 0, ny: 1, nz: 0, obj: null };
World.raycast = function (ox, oy, oz, dx, dy, dz, maxT) {
  let best = maxT, obj = null;
  World.grid.query(ox + dx * maxT * 0.5, oz + dz * maxT * 0.5, maxT * 0.5 + 8, _cq);
  for (let i = 0; i < _cq.length; i++) {
    const c = _cq[i];
    const t = c.cyl ? rayCylinder(ox, oy, oz, dx, dy, dz, c, best)
                    : rayBox(ox, oy, oz, dx, dy, dz, c, best);
    if (t >= 0 && t < best) { best = t; obj = c; }
  }
  /* the ground counts as geometry too (a few cheap samples along the ray) */
  const steps = Math.min(48, Math.max(6, Math.floor(maxT / 1.8)));
  let prev = oy - World.heightAt(ox, oz);
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * maxT;
    const y = oy + dy * t;
    const gh = World.heightAt(ox + dx * t, oz + dz * t);
    if (y <= gh) {
      if (t < best) { best = t; obj = 'ground'; }
      break;
    }
    prev = y - gh;
  }
  _rayHit.t = obj ? best : -1;
  _rayHit.obj = obj;
  return _rayHit;
};
/* true when nothing solid sits between two points (AI vision) */
World.losClear = function (ax, ay, az, bx, by, bz) {
  const dx = bx - ax, dy = by - ay, dz = bz - az;
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (len < 0.001) return true;
  const h = World.raycast(ax, ay, az, dx / len, dy / len, dz / len, len - 0.4);
  return h.t < 0 || h.t > len - 0.4;
};

/* =====================================================================
   FX - pooled tracers, particles, screen shake, hit markers, floating damage
   numbers and directional damage arrows. Pools only: no per-frame garbage.
   ===================================================================== */
const FX = (function () {
  let scene3 = null, dotTex = null;
  const _projV = new THREE.Vector3();

  /* ---------------- tracers: a single LineSegments with a fixed pool ---------------- */
  const MAX_TRACERS = 240;
  const tracerPos = new Float32Array(MAX_TRACERS * 6);
  const tracerCol = new Float32Array(MAX_TRACERS * 6);
  const tracers = [];
  for (let i = 0; i < MAX_TRACERS; i++) {
    tracers.push({ ttl: 0, life: 0.08, x1: 0, y1: 0, z1: 0, x2: 0, y2: 0, z2: 0, r: 1, g: 0.85, b: 0.4 });
  }

  /* ---------------- particle clouds: one Points object per look ---------------- */
  function makePoints(count, size, blending, opacity) {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) pos[i * 3 + 1] = -9999;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: size, map: dotTex, vertexColors: true, transparent: true,
      depthWrite: false, blending: blending, sizeAttenuation: true, opacity: opacity
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    scene3.add(pts);
    return {
      geo: geo, pos: pos, col: col, n: count, next: 0, mesh: pts,
      vel: new Float32Array(count * 3), ttl: new Float32Array(count),
      maxTtl: new Float32Array(count), grav: new Float32Array(count),
      base: new Float32Array(count * 3)
    };
  }

  const shakeState = { amt: 0 };
  const dmgNumPool = [], dmgNumLive = [], dmgDirPool = [];

  const api = {
    init(scene) {
      scene3 = scene;
      dotTex = makeSoftDotTexture();
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(tracerPos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(tracerCol, 3));
      const mesh = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.9,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      mesh.frustumCulled = false;
      scene3.add(mesh);
      api.tracerGeo = geo;
      api.tracerMesh = mesh;
      api.sparks = makePoints(900, 0.22, THREE.AdditiveBlending, 1.0);
      api.smoke = makePoints(440, 1.8, THREE.AdditiveBlending, 0.5);
      api.debris = makePoints(360, 0.34, THREE.AdditiveBlending, 1.0);

      const dnHost = document.getElementById('dmgNums');
      for (let i = 0; i < 22; i++) {
        const el = document.createElement('div');
        el.className = 'dnum';
        el.style.display = 'none';
        dnHost.appendChild(el);
        dmgNumPool.push(el);
      }
      const ddHost = document.getElementById('dmgDirs');
      for (let i = 0; i < 8; i++) {
        const el = document.createElement('div');
        el.className = 'dmgdir';
        ddHost.appendChild(el);
        dmgDirPool.push(el);
      }
    },
    get shake() { return shakeState.amt; },
    addShake(a) { shakeState.amt = Math.min(0.9, shakeState.amt + a); },

    /* a bullet tracer. Reuses a dead slot, or the one closest to expiring. */
    tracer(ax, ay, az, bx, by, bz, r, g, b, life) {
      let slot = 0, bestTtl = Infinity;
      for (let i = 0; i < MAX_TRACERS; i++) {
        if (tracers[i].ttl <= 0) { slot = i; bestTtl = -1; break; }
        if (tracers[i].ttl < bestTtl) { bestTtl = tracers[i].ttl; slot = i; }
      }
      const t = tracers[slot];
      t.ttl = t.life = life || 0.075;
      t.x1 = ax; t.y1 = ay; t.z1 = az; t.x2 = bx; t.y2 = by; t.z2 = bz;
      t.r = r === undefined ? 1 : r;
      t.g = g === undefined ? 0.85 : g;
      t.b = b === undefined ? 0.4 : b;
    },
    /* grab one particle slot from a cloud */
    spawn(sys, x, y, z, vx, vy, vz, r, g, b, ttl, grav) {
      if (!sys) return;
      const i = sys.next;
      sys.next = (sys.next + 1) % sys.n;
      sys.pos[i * 3] = x; sys.pos[i * 3 + 1] = y; sys.pos[i * 3 + 2] = z;
      sys.vel[i * 3] = vx; sys.vel[i * 3 + 1] = vy; sys.vel[i * 3 + 2] = vz;
      sys.base[i * 3] = r; sys.base[i * 3 + 1] = g; sys.base[i * 3 + 2] = b;
      sys.col[i * 3] = r; sys.col[i * 3 + 1] = g; sys.col[i * 3 + 2] = b;
      sys.ttl[i] = ttl; sys.maxTtl[i] = ttl;
      sys.grav[i] = grav === undefined ? 6 : grav;
    },
    /* bullet impact: sparks + a puff, colour depends on what was hit */
    impact(x, y, z, nx, ny, nz, kind) {
      const dens = App.quality.particles;
      const n = Math.floor((kind === 'flesh' ? 9 : 6) * dens) + 3;
      const fr = kind === 'flesh' ? 0.85 : 1.0;
      const fg = kind === 'flesh' ? 0.13 : 0.72;
      const fb = kind === 'flesh' ? 0.13 : 0.26;
      for (let i = 0; i < n; i++) {
        const sp = 2 + Math.random() * 5;
        this.spawn(api.sparks, x, y, z,
          (nx + (Math.random() - 0.5) * 1.5) * sp,
          (ny + Math.random() * 1.2) * sp,
          (nz + (Math.random() - 0.5) * 1.5) * sp,
          fr, fg, fb, 0.22 + Math.random() * 0.22, 11);
      }
      for (let i = 0; i < 3; i++) {
        this.spawn(api.smoke, x, y, z, (Math.random() - 0.5) * 1.4, 0.9 + Math.random(),
                   (Math.random() - 0.5) * 1.4, 0.5, 0.5, 0.5, 0.45 + Math.random() * 0.4, -0.4);
      }
    },
    /* muzzle flash sparks blown out of the barrel */
    muzzle(x, y, z, dx, dy, dz) {
      for (let i = 0; i < 5; i++) {
        const sp = 4 + Math.random() * 6;
        this.spawn(api.sparks, x, y, z,
          dx * sp + (Math.random() - 0.5) * 2.6, dy * sp + (Math.random() - 0.5) * 2.6,
          dz * sp + (Math.random() - 0.5) * 2.6, 1.0, 0.85, 0.45, 0.08 + Math.random() * 0.07, 2);
      }
    },
    /* grenade / rocket explosion */
    explosion(x, y, z, power) {
      const dens = App.quality.particles;
      const n = Math.floor(46 * dens) + 12;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, e = Math.random() * Math.PI - Math.PI / 2;
        const sp = (5 + Math.random() * 16) * power;
        this.spawn(api.sparks, x, y, z,
          Math.cos(a) * Math.cos(e) * sp, Math.abs(Math.sin(e)) * sp * 0.9 + 3, Math.sin(a) * Math.cos(e) * sp,
          1.0, 0.7 + Math.random() * 0.3, 0.25, 0.5 + Math.random() * 0.6, 12);
      }
      for (let i = 0; i < Math.floor(22 * dens) + 6; i++) {
        const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 6;
        this.spawn(api.smoke, x, y + 0.6, z, Math.cos(a) * sp, 1.6 + Math.random() * 3.6,
                   Math.sin(a) * sp, 0.35, 0.32, 0.3, 1.2 + Math.random() * 0.9, -0.6);
      }
      for (let i = 0; i < Math.floor(16 * dens) + 4; i++) {
        const a = Math.random() * Math.PI * 2, sp = 6 + Math.random() * 14;
        this.spawn(api.debris, x, y, z, Math.cos(a) * sp, 4 + Math.random() * 9,
                   Math.sin(a) * sp, 0.42, 0.36, 0.3, 0.6 + Math.random() * 0.6, 16);
      }
      this.addShake(clamp(0.55 * power, 0.15, 0.85));
      SFX.play('explode', { pos: new THREE.Vector3(x, y, z), maxDist: 260 });
    },
    smokePuff(x, y, z, amount) {
      for (let i = 0; i < (amount || 4); i++) {
        this.spawn(api.smoke, x + (Math.random() - 0.5) * 1.6, y, z + (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 1.2, 2 + Math.random() * 2, (Math.random() - 0.5) * 1.2,
          0.55, 0.55, 0.58, 1.6 + Math.random(), -0.3);
      }
    },

    /* ---------- HUD feedback ---------- */
    hitMarker(kind) {
      const el = document.getElementById('hitmarker');
      if (!el) return;
      el.className = '';
      if (kind === 'head') el.className = 'head';
      else if (kind === 'kill') el.className = 'kill';
      void el.offsetWidth;                       // restart the CSS animation
      el.className += (el.className ? ' ' : '') + 'show';
    },
    damageDir(worldX, worldZ) {
      for (let i = 0; i < dmgDirPool.length; i++) {
        const el = dmgDirPool[i];
        if (el.classList.contains('show')) continue;
        const ang = worldYaw(worldX - CAM.pos.x, worldZ - CAM.pos.z) - CAM.yaw;
        el.style.transform = 'rotate(' + (-ang * 180 / Math.PI).toFixed(1) + 'deg)';
        el.classList.add('show');
        setTimeout(function () { el.classList.remove('show'); }, 1750);
        return;
      }
    },
    damageNumber(x, y, z, text, kind) {
      if (!dmgNumPool.length) return;
      const el = dmgNumPool.pop();
      el.textContent = text;
      el.className = 'dnum' + (kind ? ' ' + kind : '');
      el.style.display = 'block';
      dmgNumLive.push({ el: el, x: x, y: y, z: z, t: 0, ttl: 0.85 });
    },
    /* ---------- per-frame housekeeping ---------- */
    update(dt) {
      /* tracers: rewrite the whole (small) buffer every frame */
      let ti = 0;
      for (let i = 0; i < MAX_TRACERS; i++) {
        const t = tracers[i];
        const o = ti * 6;
        if (t.ttl > 0) {
          t.ttl -= dt;
          const k = clamp(t.ttl / t.life, 0, 1);
          tracerPos[o] = t.x1; tracerPos[o + 1] = t.y1; tracerPos[o + 2] = t.z1;
          tracerPos[o + 3] = t.x2; tracerPos[o + 4] = t.y2; tracerPos[o + 5] = t.z2;
          tracerCol[o] = t.r * k; tracerCol[o + 1] = t.g * k; tracerCol[o + 2] = t.b * k;
          tracerCol[o + 3] = t.r * k; tracerCol[o + 4] = t.g * k; tracerCol[o + 5] = t.b * k;
        } else {
          tracerPos[o] = tracerPos[o + 3] = 0;
          tracerPos[o + 1] = tracerPos[o + 4] = -9999;
          tracerPos[o + 2] = tracerPos[o + 5] = 0;
          tracerCol[o] = tracerCol[o + 1] = tracerCol[o + 2] = 0;
          tracerCol[o + 3] = tracerCol[o + 4] = tracerCol[o + 5] = 0;
        }
        ti++;
      }
      if (api.tracerGeo) {
        api.tracerGeo.attributes.position.needsUpdate = true;
        api.tracerGeo.attributes.color.needsUpdate = true;
      }

      /* particles */
      for (let s = 0; s < 3; s++) {
        const sys = s === 0 ? api.sparks : (s === 1 ? api.smoke : api.debris);
        if (!sys) continue;
        for (let i = 0; i < sys.n; i++) {
          if (sys.ttl[i] <= 0) continue;
          sys.ttl[i] -= dt;
          if (sys.ttl[i] <= 0) {
            sys.pos[i * 3 + 1] = -9999;
            sys.col[i * 3] = sys.col[i * 3 + 1] = sys.col[i * 3 + 2] = 0;
            continue;
          }
          sys.vel[i * 3 + 1] -= sys.grav[i] * dt;
          sys.pos[i * 3] += sys.vel[i * 3] * dt;
          sys.pos[i * 3 + 1] += sys.vel[i * 3 + 1] * dt;
          sys.pos[i * 3 + 2] += sys.vel[i * 3 + 2] * dt;
          const k = sys.ttl[i] / sys.maxTtl[i];
          sys.col[i * 3] = sys.base[i * 3] * k;
          sys.col[i * 3 + 1] = sys.base[i * 3 + 1] * k;
          sys.col[i * 3 + 2] = sys.base[i * 3 + 2] * k;
        }
        sys.geo.attributes.position.needsUpdate = true;
        sys.geo.attributes.color.needsUpdate = true;
      }

      shakeState.amt = Math.max(0, shakeState.amt - dt * 2.4);

      /* floating damage numbers drift up and follow their world position */
      for (let i = dmgNumLive.length - 1; i >= 0; i--) {
        const d = dmgNumLive[i];
        d.t += dt;
        d.y += dt * 1.3;
        if (d.t >= d.ttl) {
          d.el.style.display = 'none';
          dmgNumPool.push(d.el);
          dmgNumLive.splice(i, 1);
          continue;
        }
        _projV.set(d.x, d.y, d.z).project(CAM.camera);
        if (_projV.z > 1) { d.el.style.display = 'none'; continue; }
        d.el.style.display = 'block';
        d.el.style.left = ((_projV.x * 0.5 + 0.5) * window.innerWidth).toFixed(0) + 'px';
        d.el.style.top = ((-_projV.y * 0.5 + 0.5) * window.innerHeight).toFixed(0) + 'px';
        d.el.style.opacity = (1 - Math.pow(d.t / d.ttl, 2)).toFixed(2);
      }
    }


  };
  return api;
})();
/* =====================================================================
   WEAPONS - statistics live in CONFIG.WEAPONS (rarity 0..4 = Common..Legendary).
   ===================================================================== */
CONFIG.WEAPONS = {
  pistol: {
    id: 'pistol', name: 'P-9 SIDEARM', tier: 0, ammo: 'light',
    dmg: 26, rpm: 340, mag: 15, reserve0: 60, reload: 1.35,
    spread: 1.0, adsSpread: 0.22, moveSpread: 1.5, spreadPerShot: 0.6, spreadMax: 3.4,
    falloffStart: 32, falloffEnd: 95, falloffMul: 0.55, hs: 2.0,
    auto: false, pellets: 1, recoil: 1.5, shake: 0.05, sound: 'pistol', len: 0.44, adsZoom: 1.15
  },
  shotgun: {
    id: 'shotgun', name: 'BS-12 BREACHER', tier: 1, ammo: 'shells',
    dmg: 13, rpm: 78, mag: 6, reserve0: 26, reload: 2.6,
    spread: 4.4, adsSpread: 3.1, moveSpread: 1.6, spreadPerShot: 1.4, spreadMax: 6.0,
    falloffStart: 8, falloffEnd: 26, falloffMul: 0.12, hs: 1.5, pellets: 8,
    auto: false, recoil: 5.4, shake: 0.24, sound: 'shotgun', len: 0.9, adsZoom: 1.08
  },
  smg: {
    id: 'smg', name: 'VX-9 VIPER', tier: 2, ammo: 'light',
    dmg: 15, rpm: 900, mag: 32, reserve0: 120, reload: 1.95,
    spread: 1.7, adsSpread: 0.7, moveSpread: 1.0, spreadPerShot: 0.34, spreadMax: 4.8,
    falloffStart: 16, falloffEnd: 52, falloffMul: 0.45, hs: 1.6,
    auto: true, recoil: 1.2, shake: 0.045, sound: 'smg', len: 0.62, adsZoom: 1.2
  },
  burst: {
    id: 'burst', name: 'AR-3 BURST', tier: 2, ammo: 'medium',
    dmg: 24, rpm: 820, mag: 24, reserve0: 96, reload: 2.2, burst: 3, burstDelay: 0.27,
    spread: 0.85, adsSpread: 0.28, moveSpread: 1.1, spreadPerShot: 0.5, spreadMax: 3.2,
    falloffStart: 45, falloffEnd: 130, falloffMul: 0.7, hs: 2.0,
    auto: false, recoil: 1.8, shake: 0.09, sound: 'rifle', len: 0.8, adsZoom: 1.35
  },
  ar: {
    id: 'ar', name: 'RANGER AR', tier: 3, ammo: 'medium',
    dmg: 31, rpm: 600, mag: 30, reserve0: 120, reload: 2.35,
    spread: 1.05, adsSpread: 0.3, moveSpread: 1.15, spreadPerShot: 0.62, spreadMax: 4.2,
    falloffStart: 55, falloffEnd: 160, falloffMul: 0.72, hs: 2.1,
    auto: true, recoil: 2.0, shake: 0.10, sound: 'rifle', len: 0.9, adsZoom: 1.45
  },
  lmg: {
    id: 'lmg', name: 'M-90 HAMMER', tier: 4, ammo: 'heavy',
    dmg: 29, rpm: 700, mag: 75, reserve0: 150, reload: 4.6,
    spread: 2.1, adsSpread: 0.55, moveSpread: 1.5, spreadPerShot: 0.75, spreadMax: 5.0,
    falloffStart: 50, falloffEnd: 150, falloffMul: 0.68, hs: 1.8,
    auto: true, recoil: 1.8, shake: 0.12, sound: 'lmg', len: 1.05, adsZoom: 1.2
  },
  sniper: {
    id: 'sniper', name: 'LONGSHOT .50', tier: 4, ammo: 'heavy',
    dmg: 118, rpm: 44, mag: 5, reserve0: 20, reload: 3.2,
    spread: 0.12, adsSpread: 0.015, moveSpread: 2.4, spreadPerShot: 2.6, spreadMax: 7,
    falloffStart: 380, falloffEnd: 600, falloffMul: 0.92, hs: 2.5,
    auto: false, recoil: 9, shake: 0.32, sound: 'sniper', len: 1.3, adsZoom: 3.4, scope: true
  },
  launcher: {
    id: 'launcher', name: 'THUMPER GL', tier: 4, ammo: 'rockets',
    dmg: 30, rpm: 50, mag: 4, reserve0: 8, reload: 3.4,
    spread: 0.5, adsSpread: 0.25, moveSpread: 1.2, spreadPerShot: 1.2, spreadMax: 5,
    falloffStart: 300, falloffEnd: 460, falloffMul: 1.0, hs: 1.0,
    auto: false, recoil: 7, shake: 0.34, sound: 'launcher', len: 1.0, adsZoom: 1.15,
    projectile: 'rocket', splash: 92, splashRadius: 6.5
  }
};
/* order used by the loot tables and the AI's weapon choices */
const WEAPON_IDS = ['pistol', 'shotgun', 'smg', 'burst', 'ar', 'lmg', 'sniper', 'launcher'];
const AMMO_LABEL = { light: 'LIGHT', medium: 'MEDIUM', heavy: 'HEAVY', shells: 'SHELLS', rockets: 'ROCKETS' };
/* loot roll weights per rarity tier (index = tier) */
const TIER_WEIGHTS = [26, 20, 15, 8, 4];

/* deterministic per-shot spread cone unit vector written into _shotDir */
const _shotDir = new THREE.Vector3();
const _shotRight = new THREE.Vector3();
const _shotUp = new THREE.Vector3();
const _shotFwd = new THREE.Vector3();
/* build a basis around the aim vector, then offset inside a cone (degrees) */
function spreadDirection(out, dx, dy, dz, spreadDeg) {
  _shotFwd.set(dx, dy, dz).normalize();
  _shotRight.set(-_shotFwd.z, 0, _shotFwd.x).normalize();
  if (_shotRight.lengthSq() < 0.001) _shotRight.set(1, 0, 0);
  _shotUp.crossVectors(_shotRight, _shotFwd).normalize();
  const a = Math.random() * Math.PI * 2;
  const rad = (spreadDeg * Math.PI / 180) * Math.sqrt(Math.random());
  out.copy(_shotFwd)
    .addScaledVector(_shotRight, Math.cos(a) * rad)
    .addScaledVector(_shotUp, Math.sin(a) * rad * 0.85)
    .normalize();
  return out;
}
/* damage after distance falloff */
function falloffDamage(w, dist) {
  if (dist <= w.falloffStart) return w.dmg;
  const t = clamp((dist - w.falloffStart) / Math.max(1, w.falloffEnd - w.falloffStart), 0, 1);
  return w.dmg * lerp(1, w.falloffMul, t);
}

/* =====================================================================
   GRENADES + ROCKETS - shared projectile system for the player and the bots.
   ===================================================================== */
const Projectiles = (function () {
  const list = [];
  const GEO = new THREE.IcosahedronGeometry(0.13, 0);
  const geo = new THREE.SphereGeometry(0.16, 8, 6);
  const api = {
    init(scene) {
      this.scene = scene;
      /* one instanced mesh for frag grenades and one for rockets */
      const nade = new THREE.InstancedMesh(GEO, new THREE.MeshBasicMaterial({ color: 0x2f3a2f }), 24);
      nade.frustumCulled = false;
      scene.add(nade);
      this.nadeMesh = nade;
      const rocket = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ color: 0xdfd6b0 }), 16);
      rocket.frustumCulled = false;
      scene.add(rocket);
      this.rocketMesh = rocket;
      const zero = new THREE.Matrix4().makeScale(0, 0, 0);
      for (let i = 0; i < 24; i++) nade.setMatrixAt(i, zero);
      for (let i = 0; i < 16; i++) rocket.setMatrixAt(i, zero);
    },
    /* kind: 'frag' | 'rocket' */
    throwIt(kind, x, y, z, vx, vy, vz, owner, wName) {
      if (kind === 'frag' && list.filter(p => p.kind === 'frag').length >= 20) return;
      list.push({
        kind: kind, x: x, y: y, z: z, vx: vx, vy: vy, vz: vz,
        t: 0, fuse: kind === 'frag' ? CONFIG.GRENADE_FUSE : 6, owner: owner, wName: wName || 'Frag Grenade'
      });
    },
    update(dt) {
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.t += dt;
        p.vy -= CONFIG.GRAVITY * 0.62 * dt;
        const nx = p.x + p.vx * dt, ny = p.y + p.vy * dt, nz = p.z + p.vz * dt;
        /* bounce off the ground */
        const gh = World.groundAt(nx, nz, p.y);
        if (ny <= gh) {
          p.y = gh + 0.05;
          p.vy = Math.abs(p.vy) * 0.34;
          /* a frag bites into the dirt and stops fast; rockets only need to
             touch the ground to go off */
          const damp = p.kind === 'frag' ? 0.32 : 0.62;
          p.vx *= damp; p.vz *= damp;
          if (Math.abs(p.vy) > 1.6) SFX.play('bounce', { pos: new THREE.Vector3(p.x, p.y, p.z), maxDist: 60 });
          if (p.kind === 'rocket' && p.t > 0.05) { this.detonate(p); list.splice(i, 1); continue; }
        } else { p.y = ny; }
        /* bounce off walls: cheap sphere push out then reflect */
        const probe = { x: nx, z: nz };
        if (World.resolve(probe, 0.22, p.y - 0.2, p.y + 0.3)) {
          const ddx = probe.x - nx, ddz = probe.z - nz;
          const l = Math.sqrt(ddx * ddx + ddz * ddz) || 1;
          const nxv = ddx / l, nzv = ddz / l;
          const dot = p.vx * nxv + p.vz * nzv;
          p.vx = (p.vx - 2 * dot * nxv) * 0.45;
          p.vz = (p.vz - 2 * dot * nzv) * 0.45;
          p.x = probe.x; p.z = probe.z;
          SFX.play('bounce', { pos: new THREE.Vector3(p.x, p.y, p.z), maxDist: 55 });
        } else { p.x = nx; p.z = nz; }
        /* rocket hit on a bot or the player */
        if (p.kind === 'rocket') {
          const hits = Hit.probeSphere(p.x, p.y, p.z, 0.5, p.owner);
          if (hits) { this.detonate(p); list.splice(i, 1); continue; }
        }
        if (p.t >= p.fuse) { this.detonate(p); list.splice(i, 1); }
      }
      /* write instance matrices */
      const m = new THREE.Matrix4();
      let ni = 0, ri = 0;
      const zq = new THREE.Quaternion();
      const sc1 = new THREE.Vector3(1, 1, 1);
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        if (p.kind === 'frag') {
          if (ni >= 24) break;
          m.compose(new THREE.Vector3(p.x, p.y, p.z), zq, sc1);
          this.nadeMesh.setMatrixAt(ni++, m);
        } else {
          if (ri >= 16) break;
          m.compose(new THREE.Vector3(p.x, p.y, p.z), zq, sc1);
          this.rocketMesh.setMatrixAt(ri++, m);
        }
      }
      const zero = new THREE.Matrix4().makeScale(0, 0, 0);
      for (let i = ni; i < 24; i++) this.nadeMesh.setMatrixAt(i, zero);
      for (let i = ri; i < 16; i++) this.rocketMesh.setMatrixAt(i, zero);
      this.nadeMesh.instanceMatrix.needsUpdate = true;
      this.rocketMesh.instanceMatrix.needsUpdate = true;
    },
    /* area damage on detonation */
    detonate(p) {
      const isRocket = p.kind === 'rocket';
      const radius = isRocket ? CONFIG.ROCKET_RADIUS : CONFIG.GRENADE_RADIUS;
      const dmg = isRocket ? CONFIG.ROCKET_DAMAGE : CONFIG.GRENADE_DAMAGE;
      FX.explosion(p.x, p.y, p.z, isRocket ? 1.15 : 1.0);
      const near = entityGrid.query(p.x, p.z, radius + 8, spawnScratch);
      for (let i = 0; i < near.length; i++) {
        const e = near[i];
        if (!e.alive) continue;
        const cx = e.pos.x, cy = e.pos.y + 0.9, cz = e.pos.z;
        const d = Math.sqrt((cx - p.x) * (cx - p.x) + (cy - p.y) * (cy - p.y) + (cz - p.z) * (cz - p.z));
        if (d > radius) continue;
        const k = 1 - d / radius;
        const blocked = !World.losClear(p.x, p.y + 0.2, p.z, cx, cy, cz);
        const amount = dmg * k * k * (blocked ? 0.35 : 1);
        Hit.damage(e, amount, { attacker: p.owner, weapon: p.wName, head: false, splash: true });
      }
    },
    /* how many projectiles (frags + rockets) are live right now */
    get count() { return list.length; },
    clear() { list.length = 0; const zero = new THREE.Matrix4().makeScale(0, 0, 0); if (this.nadeMesh) { for (let i = 0; i < 24; i++) this.nadeMesh.setMatrixAt(i, zero); this.nadeMesh.instanceMatrix.needsUpdate = true; } if (this.rocketMesh) { for (let i = 0; i < 16; i++) this.rocketMesh.setMatrixAt(i, zero); this.rocketMesh.instanceMatrix.needsUpdate = true; } }
  };
  return api;
})();

/* =====================================================================
   LOOT - ground items (instanced, one draw call per shape), pickup
   prompts, world labels, death drops and supply crates.
   ===================================================================== */
const Loot = (function () {
  const CAP = 110;                       // instances per shape
  const meshes = {};                     // shapeKey -> {mesh, free[]}
  const items = [];                      // live ground items
  const labelPool = [];
  const crates = [], crateFree = [], crateMeshes = [];
  const _m = new THREE.Matrix4();
  const _q = new THREE.Quaternion();
  const _eu = new THREE.Euler();
  const _s = new THREE.Vector3(1, 1, 1);
  const _v = new THREE.Vector3();
  const _col = new THREE.Color();
  let aimed = null;                      // item under the crosshair

  /* ---------- procedural shapes (merged primitives, no assets) ---------- */
  function gunShape(w) {
    const L = w.len;
    const recv = new THREE.BoxGeometry(0.075, 0.09, L * 0.72);
    const barrel = new THREE.BoxGeometry(0.045, 0.045, L * 0.55);
    barrel.translate(0, 0.012, L * 0.55);
    const mag = new THREE.BoxGeometry(0.05, 0.22, 0.09);
    mag.translate(0, -0.14, -L * 0.05);
    const grip = new THREE.BoxGeometry(0.05, 0.16, 0.07);
    grip.translate(0, -0.11, -L * 0.28);
    const parts = [recv, barrel, mag, grip];
    const scope = new THREE.BoxGeometry(0.035, 0.05, L * 0.3);
    scope.translate(0, 0.085, -L * 0.02);
    parts.push(scope);
    if (w.mag >= 30) {
      const drum = new THREE.BoxGeometry(0.07, 0.2, 0.12);
      drum.translate(0, -0.12, -L * 0.12);
      parts.push(drum);
    }
    return mergeGeoms(parts);
  }
  function shapeFor(key) {
    if (key === 'ammo') {
      const lid = new THREE.BoxGeometry(0.36, 0.05, 0.26);
      lid.translate(0, 0.12, 0);
      return mergeGeoms([new THREE.BoxGeometry(0.34, 0.22, 0.24), lid]);
    }
    if (key === 'bandage') return new THREE.BoxGeometry(0.3, 0.14, 0.22);
    if (key === 'medkit') {
      const hx = new THREE.BoxGeometry(0.2, 0.26, 0.06);
      const hz = new THREE.BoxGeometry(0.06, 0.26, 0.2);
      hx.translate(0, 0, 0.13); hz.translate(0, 0, 0.13);
      return mergeGeoms([new THREE.BoxGeometry(0.38, 0.24, 0.26), hx, hz]);
    }
    if (key === 'shield') return new THREE.CylinderGeometry(0.13, 0.15, 0.36, 8);
    if (key === 'helmet') return new THREE.SphereGeometry(0.2, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.62);
    if (key === 'vest') {
      const collar = new THREE.BoxGeometry(0.4, 0.12, 0.2);
      collar.translate(0, 0.16, 0);
      return mergeGeoms([new THREE.BoxGeometry(0.34, 0.4, 0.18), collar]);
    }
    if (key === 'nade') return new THREE.IcosahedronGeometry(0.16, 0);
    return gunShape(CONFIG.WEAPONS[key] || CONFIG.WEAPONS.pistol);
  }

  const api = {
    init(scene) {
      for (let i = 0; i < WEAPON_IDS.length; i++) this.ensureMesh(scene, WEAPON_IDS[i]);
      ['ammo', 'bandage', 'medkit', 'shield', 'helmet', 'vest', 'nade'].forEach(k => this.ensureMesh(scene, k));
      const host = document.getElementById('lootLabels');
      for (let i = 0; i < 16; i++) {
        const el = document.createElement('div');
        el.className = 'llab';
        el.style.display = 'none';
        host.appendChild(el);
        labelPool.push(el);
      }
    },
    ensureMesh(scene, key) {
      if (meshes[key]) return meshes[key];
      const mesh = new THREE.InstancedMesh(shapeFor(key), new THREE.MeshBasicMaterial({ color: 0xffffff }), CAP);
      mesh.frustumCulled = false;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const zero = new THREE.Matrix4().makeScale(0, 0, 0);
      const free = [];
      for (let i = 0; i < CAP; i++) { mesh.setMatrixAt(i, zero); free.push(i); }
      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);
      meshes[key] = { mesh: mesh, free: free };
      return meshes[key];
    },
    /* item = {kind:'weapon', w} | {kind:'ammo', ammo, count} | {kind:'bandage'|'medkit'|'shield'}
       | {kind:'helmet'|'vest', tier} | {kind:'nade'} */
    spawn(item, x, y, z) {
      const key = item.kind === 'weapon' ? item.w : item.kind;
      const sd = meshes[key] || this.ensureMesh(App.scene, key);
      if (!sd) return null;
      if (!sd.free.length) {
        /* the pool for this shape is full: recycle the instance that is
           furthest from the player, so death drops and supply crates can
           always spawn instead of silently vanishing */
        let far = null, farD = -1;
        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          if (it.key !== key) continue;
          const d = distSq2D(it.x, it.z, CAM.pos.x, CAM.pos.z);
          if (d > farD) { farD = d; far = it; }
        }
        if (!far) return null;
        this.remove(far);
        if (!sd.free.length) return null;
      }
      const idx = sd.free.pop();
      const w = item.kind === 'weapon' ? CONFIG.WEAPONS[item.w] : null;
      const it = {
        item: item, key: key, idx: idx, mesh: sd.mesh, live: true,
        x: x, y: y, z: z, baseY: y, phase: Math.random() * 6.28,
        rotY: Math.random() * 6.28,
        scale: w ? 1 + (w.len - 0.44) * 0.35 : 1
      };
      it.info = Loot.info(item);
      _eu.set(0, it.rotY, 0);
      _q.setFromEuler(_eu);
      _v.set(x, y, z);
      _s.set(it.scale, it.scale, it.scale);
      _m.compose(_v, _q, _s);
      sd.mesh.setMatrixAt(idx, _m);
      sd.mesh.instanceMatrix.needsUpdate = true;
      sd.mesh.setColorAt(idx, _col.set(it.info.color));
      if (sd.mesh.instanceColor) sd.mesh.instanceColor.needsUpdate = true;
      items.push(it);
      return it;
    },
    /* release a ground item's instance back to its pool */
    remove(it) {
      if (!it || !it.live) return;
      it.live = false;
      _m.makeScale(0, 0, 0);
      it.mesh.setMatrixAt(it.idx, _m);
      it.mesh.instanceMatrix.needsUpdate = true;
      meshes[it.key].free.push(it.idx);
      const i = items.indexOf(it);
      if (i >= 0) items.splice(i, 1);
    },
    get count() { return items.length; },
    /* ---------- display info: name, rarity tier, colour ---------- */
    info(item) {
      if (!item) return null;               // nothing under the crosshair
      if (item.kind === 'weapon') {
        const w = CONFIG.WEAPONS[item.w];
        return { label: w.name, rarity: w.tier, color: CONFIG.RARITY_HEX[w.tier] };
      }
      if (item.kind === 'ammo') return { label: AMMO_LABEL[item.ammo] + ' AMMO x' + item.count, rarity: 0, color: '#d8d8d8' };
      if (item.kind === 'bandage') return { label: 'BANDAGE', rarity: 0, color: '#e6e6e6' };
      if (item.kind === 'medkit') return { label: 'MEDKIT', rarity: 1, color: CONFIG.RARITY_HEX[1] };
      if (item.kind === 'shield') return { label: 'SHIELD POTION', rarity: 2, color: CONFIG.RARITY_HEX[2] };
      if (item.kind === 'nade') return { label: 'FRAG GRENADE', rarity: 1, color: '#a8d46a' };
      if (item.kind === 'helmet' || item.kind === 'vest') {
        const t = clamp(item.tier | 0, 1, 3);
        return {
          label: ARMOR_NAMES[t] + ' ' + (item.kind === 'helmet' ? 'HELMET' : 'VEST'),
          rarity: t, color: CONFIG.RARITY_HEX[t]
        };
      }
      return { label: 'ITEM', rarity: 0, color: '#ffffff' };
    },

    /* ---------- loot table ---------- */
    pickWeapon(luck) {
      const weights = TIER_WEIGHTS.map((x, i) => x * (1 + i * 0.22 * (luck || 0)));
      const tier = RNG.weighted(weights);
      const pool = [];
      for (let i = 0; i < WEAPON_IDS.length; i++) {
        if (CONFIG.WEAPONS[WEAPON_IDS[i]].tier === tier) pool.push(WEAPON_IDS[i]);
      }
      return pool.length ? RNG.pick(pool) : 'pistol';
    },
    rollItem(luck) {
      const r = RNG.next();
      if (r < 0.25) return { kind: 'weapon', w: this.pickWeapon(luck) };
      if (r < 0.52) {
        const a = RNG.pick(CONFIG.AMMO_TYPES);
        return { kind: 'ammo', ammo: a, count: CONFIG.AMMO_PICKUP[a] };
      }
      if (r < 0.68) return { kind: 'bandage' };
      if (r < 0.76) return { kind: 'medkit' };
      if (r < 0.84) return { kind: 'shield' };
      if (r < 0.93) return { kind: RNG.chance(0.5) ? 'helmet' : 'vest', tier: RNG.int(1, 3) };
      return { kind: 'nade' };
    },
    /* roll one item straight onto the map (with a pool guard) */
    place(x, y, z, luck) {
      if (items.length >= CONFIG.MAX_GROUND_ITEMS) this.remove(items[0]);
      return this.spawn(this.rollItem(luck), x, y, z);
    },

    /* ---------- match start: fill every loot point in the world ---------- */
    populate() {
      const pts = World.lootPoints;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        this.place(p.x, p.y + 0.25, p.z, 0);
        if (RNG.chance(0.30)) this.place(p.x + RNG.range(-1.5, 1.5), p.y + 0.2, p.z + RNG.range(-1.5, 1.5), 0);
        if (RNG.chance(0.16)) {
          const a = RNG.pick(CONFIG.AMMO_TYPES);
          this.spawn({ kind: 'ammo', ammo: a, count: CONFIG.AMMO_PICKUP[a] },
                     p.x + RNG.range(-2, 2), p.y + 0.2, p.z + RNG.range(-2, 2));
        }
      }
    },
    /* ---------- death drops: weapons, ammo and consumables hit the floor ---------- */
    dropFrom(e) {
      const cx = e.pos.x, cz = e.pos.z, y = e.pos.y;
      if (e.weapons) {
        let n = 0;
        for (let i = 0; i < e.weapons.length && n < 3; i++) {
          const w = e.weapons[i];
          if (!w || !w.id) continue;
          const a = RNG.range(0, 6.28), r = 0.8 + n * 0.6;
          this.spawn({ kind: 'weapon', w: w.id }, cx + Math.cos(a) * r, y + 0.25, cz + Math.sin(a) * r);
          n++;
        }
      }
      if (e.ammoReserve) {
        let n = 0;
        for (const t in e.ammoReserve) {
          if (n >= 3) break;
          const have = e.ammoReserve[t] | 0;
          if (have <= 0) continue;
          const a = RNG.range(0, 6.28);
          this.spawn({ kind: 'ammo', ammo: t, count: Math.min(CONFIG.AMMO_PICKUP[t] + 6, have) },
                     cx + Math.cos(a) * 1.5, y + 0.25, cz + Math.sin(a) * 1.5);
          n++;
        }
      }
      if (e.inv) {
        if (e.inv.bandage > 0) this.spawn({ kind: 'bandage' }, cx + RNG.range(-1, 1), y + 0.25, cz + RNG.range(-1, 1));
        if (e.inv.medkit > 0) this.spawn({ kind: 'medkit' }, cx + RNG.range(-1.4, 1.4), y + 0.25, cz + RNG.range(-1.4, 1.4));
        if (e.inv.shield > 0) this.spawn({ kind: 'shield' }, cx + RNG.range(-1.6, 1.6), y + 0.25, cz + RNG.range(-1.6, 1.6));
        if (e.inv.nade > 0) this.spawn({ kind: 'nade' }, cx + RNG.range(-1.8, 1.8), y + 0.25, cz + RNG.range(-1.8, 1.8));
      }
    },

    /* ---------- per-frame: bobbing, world labels, aim target, auto ammo ---------- */
    update(dt) {
      const cam = CAM.pos, camDir = CAM.dir;
      aimed = null;
      let bestDot = 0.55, bestDist = 99;
      let labelIdx = 0;
      const rangeSq = CONFIG.INTERACT_RANGE * CONFIG.INTERACT_RANGE;
      /* Reach is measured from the *player*, not the camera: in third person the
         camera sits metres behind, so a camera-relative check would make items in
         front of your own character unpickable. Aiming still uses the camera ray,
         so you pick up whatever the crosshair is pointing at. */
      const px = Player.pos.x, py = Player.pos.y + 0.9, pz = Player.pos.z;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const dx = it.x - cam.x, dy = it.y - cam.y, dz = it.z - cam.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 3600) {
          /* close enough to animate: bob + spin */
          it.phase += dt * 2.2;
          const lift = 0.12 + Math.sin(it.phase) * 0.07;
          it.rotY += dt * 0.9;
          it.y = it.baseY + lift;
          _eu.set(0, it.rotY, 0);
          _q.setFromEuler(_eu);
          _v.set(it.x, it.y, it.z);
          _s.set(it.scale, it.scale, it.scale);
          _m.compose(_v, _q, _s);
          it.mesh.setMatrixAt(it.idx, _m);
          it.mesh.instanceMatrix.needsUpdate = true;
        }
        if (d2 < 225 && labelIdx < labelPool.length) {
          /* within 15 m: floating name tag coloured by rarity */
          const dist = Math.sqrt(d2);
          if ((dx * camDir.x + dy * camDir.y + dz * camDir.z) / Math.max(0.001, dist) > 0.25) {
            const el = labelPool[labelIdx++];
            it.labelEl = el;
            _v.set(it.x, it.y + 0.5, it.z);
            const p = _v.project(CAM.camera);
            if (p.z < 1) {
              el.style.display = 'block';
              el.textContent = it.info.label;
              el.style.color = it.info.color;
              el.style.left = ((p.x * 0.5 + 0.5) * window.innerWidth).toFixed(0) + 'px';
              el.style.top = ((-p.y * 0.5 + 0.5) * window.innerHeight).toFixed(0) + 'px';
            } else el.style.display = 'none';
          }
        }
        /* what the crosshair is on: direction from the camera, reach from the
           player, so third person can still pick up what it is standing next to */
        const dist = Math.sqrt(d2) || 0.001;
        const dot = (dx * camDir.x + dy * camDir.y + dz * camDir.z) / dist;
        const rx = it.x - px, ry = it.y - py, rz = it.z - pz;
        if (dot > bestDot && rx * rx + ry * ry + rz * rz < rangeSq) {
          bestDot = dot; bestDist = dist; aimed = it;
        }
      }
      for (let i = labelIdx; i < labelPool.length; i++) labelPool[i].style.display = 'none';
      for (let i = 0; i < labelPool.length; i++) labelPool[i].classList.remove('hot');
      if (aimed && aimed.labelEl) aimed.labelEl.classList.add('hot');
      UI.setPickupPrompt(aimed);
      /* walk over ammo you can actually use and it is picked up silently */
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        if (it.item.kind !== 'ammo') continue;
        if (Player.alive && dist2D(it.x, it.z, Player.pos.x, Player.pos.z) < 1.5 &&
            Math.abs(it.y - Player.pos.y) < 2.2 &&
            Player.hasAmmoType(it.item.ammo)) {          // needs a matching gun
          if (Player.takeAmmo(it.item.ammo, it.item.count, true)) {
            this.remove(it);
            SFX.play('pickup', { gain: 0.45 });
          }
        }
      }
      this.updateCrates(dt);
    },
    /* ---------- supply crates: parachute in, then cough up top-tier loot ---------- */
    initCrates(scene) {
      for (let i = 0; i < 4; i++) {
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 2.1),
                                    new THREE.MeshLambertMaterial({ color: 0x7d5f39 }));
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.42, 2.18),
                                      new THREE.MeshLambertMaterial({ color: 0xffc63d }));
        const chute = new THREE.Mesh(new THREE.ConeGeometry(3.1, 2.4, 10),
                                     new THREE.MeshLambertMaterial({ color: 0xe8eef2, side: THREE.DoubleSide }));
        chute.position.y = 4.6;
        g.add(body); g.add(stripe); g.add(chute);
        g.userData.chute = chute;
        g.visible = false;
        scene.add(g);
        crateMeshes.push(g);
        crateFree.push(g);
      }
    },
    /* called by the match when a zone phase rolls over */
    spawnCrate(x, z) {
      if (!crateFree.length) return null;
      const g = crateFree.pop();
      const y = CONFIG.DROP_ALTITUDE * 0.6;
      g.visible = true;
      g.userData.chute.visible = true;
      g.position.set(x, y, z);
      const c = { mesh: g, x: x, y: y, z: z, landed: false, trailT: 0, smokeT: 0 };
      crates.push(c);
      SFX.play('supply');
      UI.announce('SUPPLY DROP INCOMING');
      return c;
    },
    updateCrates(dt) {
      for (let i = 0; i < crates.length; i++) {
        const c = crates[i];
        if (!c.landed) {
          c.y -= 9.5 * dt;
          c.mesh.position.set(c.x, c.y, c.z);
          c.trailT -= dt;
          if (c.trailT <= 0) { c.trailT = 0.1; FX.smokePuff(c.x, c.y + 1.4, c.z, 1); }
          const gy = World.groundAt(c.x, c.z, c.y);
          if (c.y <= gy + 1.15) {
            c.y = gy + 1.15;
            c.landed = true;
            c.mesh.position.set(c.x, c.y, c.z);
            c.mesh.userData.chute.visible = false;
            SFX.play('land', { pos: new THREE.Vector3(c.x, c.y, c.z), maxDist: 160 });
            /* guaranteed high tier loot ring */
            const pool = WEAPON_IDS.filter(id => CONFIG.WEAPONS[id].tier >= 3);
            for (let k = 0; k < 4; k++) {
              const a = (k / 4) * Math.PI * 2;
              const ix = c.x + Math.cos(a) * 2.4, iz = c.z + Math.sin(a) * 2.4;
              const iy = World.heightAt(ix, iz) + 0.4;
              if (k < 2) this.spawn({ kind: 'weapon', w: pool[(k + Math.floor(RNG.next() * pool.length)) % pool.length] }, ix, iy, iz);
              else if (k === 2) this.spawn({ kind: 'shield' }, ix, iy, iz);
              else this.spawn({ kind: 'medkit' }, ix, iy, iz);
            }
            this.spawn({ kind: 'ammo', ammo: 'heavy', count: CONFIG.AMMO_PICKUP.heavy }, c.x, c.y + 0.4, c.z + 2.6);
            UI.announce('SUPPLY DROP LANDED');
          }
        } else {
          c.smokeT -= dt;
          if (c.smokeT <= 0) { c.smokeT = 0.4; FX.smokePuff(c.x, c.y + 1.6, c.z, 1); }
        }
      }
    },
    get crates() { return crates; },
    /* the ground item the crosshair is currently over (null when none is in
       reach) - this is what the E/F pickup key feeds into take() */
    get aimedItem() { return aimed; },

    /* ---------- the player pressed E on the aimed item ---------- */
    take(it) {
      if (!it) { SFX.play('deny'); return false; }
      const res = Player.takeItem(it.item);
      if (res) {
        this.remove(it);
        SFX.play(res.sound || 'pickup');
        UI.pickupToast(res.text, res.rarity);
        return true;
      }
      SFX.play('deny');
      return false;
    },
    clear() {
      while (items.length) this.remove(items[0]);
      for (let i = 0; i < labelPool.length; i++) labelPool[i].style.display = 'none';
      aimed = null;
      for (let i = 0; i < crates.length; i++) {
        crates[i].mesh.visible = false;
        crates[i].mesh.userData.chute.visible = true;
        crateFree.push(crates[i].mesh);
      }
      crates.length = 0;
    }



  };
  return api;
})();

/* ---------------- AI - state machine, steering, combat ---------------- */
const BOTS = [];
const entityGrid = new SpatialGrid(40);
const spawnScratch = [];
const ARMOR_NAMES = ['', 'LIGHT', 'MEDIUM', 'HEAVY'];
/* fun gamer tags for the bots (shown in the kill feed and on the death screen) */
const BOT_NAMES = [
  'xX_ShadowXx', 'NoScopeNate', 'LootGoblin', 'Sniper_Wolf', 'TiltedTom', 'PanMaster',
  'QuickScope_Q', 'BlueWall_Bob', 'Camper_Carl', 'ZoneRunner', 'BushWookie99', 'RushinRuss',
  'HeadshotHero', 'MedKitMike', 'AK_Annie', 'ShotgunSal', 'BuildKing', 'CrouchPotato',
  'FragFrenzy', 'SmokeKing', 'GliderGus', 'DustyDan', 'RiftRider', 'TryHardTina',
  'BotSlayer_X', 'TrapLord_T', 'SilentSam', 'FloatFrank', 'LazyLarry', 'TurboTina',
  'NadeNinja', 'StormChaser', 'HillHugger', 'LongbowLu', 'SplashDamage', 'ReloadRandy',
  'AimAssist_A', 'ChugJugJay', 'CrateCrazy', 'TowerTom', 'PierPete', 'FerryFred',
  'MountainMo', 'CamoKid', 'GhostGary', 'WraithWes', 'SkyDiver_S', 'DropShotD',
  'JumpyJim', 'AAccidental', 'PixelPete', 'RocketRon', 'FlickShot_F', 'TinyTina',
  'BigBrain_B', 'RustyRick', 'DoubleTapD', 'PumpPete', 'TrapBaseT', 'ZoneWizard',
  'BulletMagnet', 'WoodWarden', 'BrickBob', 'StoneCold_S', 'MudMike', 'SaltShaker',
  'FrostFred', 'Ashley_Aim', 'LavaLou', 'SandSurfer', 'ReefRider', 'CoralCody',
  'SunsetSam', 'MoonMaddie', 'CometKid', 'NovaNate', 'ZeroTwo', 'EchoEve',
  'DeltaDawn', 'AlphaAce', 'BravoBen', 'CharlieC', 'FoxtrotFlo', 'GolfGreg',
  'HotelHank', 'IndiaIvy', 'JuleJules', 'KiloKate', 'LimaLiam', 'MikeMia',
  'NovemberN', 'OscarOtto', 'PapaPhil', 'QuebecQuinn', 'RomeoRay', 'SierraSue',
  'TangoTy', 'UniformUma', 'VictorVic', 'WhiskeyW', 'XrayXav', 'YankeeYan',
  'ZuluZed', 'PotatoAim', 'SilverSurge', 'GoldRush_G', 'BronzeBrawler', 'DiamondDee',
  'PlatinumP', 'MasterMilo', 'GrandGary', 'EliteEli', 'ProPanda', 'SweatSid',
  'ChillChad', 'RageRoger', 'ClutchCarl', 'LastStand_L', 'FinalZone_F', 'OneHP_Ollie'
];

/* bot meshes are shared instanced meshes: 5 draw calls for 100 bots */
const BotView = {
  cap: 0, body: null, head: null, arms: null, gun: null, chute: null,
  init(scene, cap) {
    this.cap = cap;
    const bodyGeo = new THREE.CapsuleGeometry(0.33, 0.6, 4, 8);
    const headGeo = new THREE.SphereGeometry(0.23, 8, 6);
    const armGeo = new THREE.BoxGeometry(0.15, 0.52, 0.15);
    const gunGeo = new THREE.BoxGeometry(0.11, 0.13, 1.0);
    const chuteGeo = new THREE.ConeGeometry(1.7, 1.3, 8);
    this.body = new THREE.InstancedMesh(bodyGeo, new THREE.MeshLambertMaterial({}), cap);
    this.head = new THREE.InstancedMesh(headGeo, new THREE.MeshLambertMaterial({}), cap);
    this.arms = new THREE.InstancedMesh(armGeo, new THREE.MeshLambertMaterial({}), cap * 2);
    this.gun = new THREE.InstancedMesh(gunGeo, new THREE.MeshLambertMaterial({}), cap);
    this.chute = new THREE.InstancedMesh(chuteGeo, new THREE.MeshLambertMaterial({ color: 0xdde8ee, side: THREE.DoubleSide }), cap);
    const all = [this.body, this.head, this.arms, this.gun, this.chute];
    for (let i = 0; i < all.length; i++) {
      all[i].frustumCulled = false;
      all[i].castShadow = !!World.quality.shadows;
      all[i].instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(all[i]);
    }
    const zero = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < cap; i++) {
      this.body.setMatrixAt(i, zero); this.head.setMatrixAt(i, zero); this.gun.setMatrixAt(i, zero);
      this.chute.setMatrixAt(i, zero);
      this.arms.setMatrixAt(i * 2, zero); this.arms.setMatrixAt(i * 2 + 1, zero);
    }
  },
  hide(i) {
    const zero = new THREE.Matrix4().makeScale(0, 0, 0);
    this.body.setMatrixAt(i, zero);
    this.head.setMatrixAt(i, zero);
    this.gun.setMatrixAt(i, zero);
    this.chute.setMatrixAt(i, zero);
    this.arms.setMatrixAt(i * 2, zero);
    this.arms.setMatrixAt(i * 2 + 1, zero);
    this.dirty = true;
  },
  flush() {
    this.body.instanceMatrix.needsUpdate = true;
    this.head.instanceMatrix.needsUpdate = true;
    this.arms.instanceMatrix.needsUpdate = true;
    this.gun.instanceMatrix.needsUpdate = true;
    this.chute.instanceMatrix.needsUpdate = true;
    if (this.body.instanceColor) this.body.instanceColor.needsUpdate = true;
    if (this.head.instanceColor) this.head.instanceColor.needsUpdate = true;
    if (this.gun.instanceColor) this.gun.instanceColor.needsUpdate = true;
  }
};
/* =====================================================================
   AI - spawning, steering, the state machine and bot combat.
   ===================================================================== */
let lootGrid = null;
const avoidScratch = [];
const enemyScratch = [];
const _bv = new THREE.Vector3();
const _bq = new THREE.Quaternion();
const _beu = new THREE.Euler();
const _bm = new THREE.Matrix4();
const _bs = new THREE.Vector3(1, 1, 1);
const _bzero = new THREE.Matrix4().makeScale(0, 0, 0);
const _sfxPos = new THREE.Vector3();

function pickSpawnSpot() {
  const spots = World.spawnSpots;
  let total = 0;
  for (let i = 0; i < spots.length; i++) total += spots[i].w;
  let r = RNG.next() * total;
  for (let i = 0; i < spots.length; i++) {
    r -= spots[i].w;
    if (r <= 0) return spots[i];
  }
  return spots[0];
}
/* steer around geometry: repulsion from nearby collider faces */
function botAvoid(b, out) {
  out.x = 0; out.z = 0;
  World.grid.query(b.pos.x, b.pos.z, 5, avoidScratch);
  for (let i = 0; i < avoidScratch.length; i++) {
    const c = avoidScratch[i];
    if (c.y1 < b.pos.y + 0.5 || c.y0 > b.pos.y + 1.8) continue;
    let dx, dz, dist;
    if (c.cyl) {
      dx = b.pos.x - c.x; dz = b.pos.z - c.z;
      dist = Math.sqrt(dx * dx + dz * dz) - c.r;
    } else {
      const px = clamp(b.pos.x, c.x - c.hx, c.x + c.hx);
      const pz = clamp(b.pos.z, c.z - c.hz, c.z + c.hz);
      dx = b.pos.x - px; dz = b.pos.z - pz;
      dist = Math.sqrt(dx * dx + dz * dz) - 0.35;
    }
    if (dist > 2.6) continue;
    const inv = 1 / Math.max(0.35, Math.sqrt(dx * dx + dz * dz));
    const w = (2.6 - dist) * 0.9;
    out.x += dx * inv * w;
    out.z += dz * inv * w;
  }
}

/* ---------- bot factory ----------
   One plain object per combatant. `skill` drives accuracy, reaction delay,
   sight range and gear luck; `aggression` drives how hard a bot pushes and how
   often it throws frags. Everything else is per-bot state for the FSM. */
let namePool = [];
function makeBot(i) {
  const skill = 0.15 + Math.pow(RNG.next(), 1.6) * 0.8;    // a few aces, mostly average
  return {
    isPlayer: false, index: i,
    name: namePool[i] || ('BOT_' + (i + 1)),
    alive: true, hp: CONFIG.MAX_HP, shield: 0, helmetTier: 0, vestTier: 0,
    kills: 0, damageDealt: 0, placement: 0,
    pos: new THREE.Vector3(), vel: new THREE.Vector3(),
    yaw: 0, state: 'drop', stateT: 0,
    skill: skill, aggression: RNG.range(0.8, 1.32),
    /* perception */
    target: null, hasSeen: false, noSightT: 0, losT: RNG.range(0, 0.3),
    lastSeen: new THREE.Vector3(),
    moveTarget: { x: 0, z: 0 },
    /* gunplay bookkeeping */
    weaponId: 'pistol', weapons: [], mag: 0, reloadT: 0, fireT: 0, burstLeft: 0,
    ammoReserve: { light: 0, medium: 0, heavy: 0, shells: 0, rockets: 0 },
    inv: { bandage: 0, medkit: 0, shield: 0, nade: 0 },
    lootFindT: RNG.range(0, 8),
    bodyColor: new THREE.Color().setHSL(RNG.range(0, 1), 0.42, RNG.range(0.22, 0.42)),
    /* parachute drop */
    dropX: 0, dropZ: 0, chuteOpen: false,
    glideSpeed: CONFIG.GLIDER_SPEED * RNG.range(0.85, 1.2),
    /* movement bookkeeping */
    tickAcc: RNG.range(0, 0.15), stuckT: 0, nudgeCount: 0,
    lastPX: 0, lastPZ: 0, healT: 0,
    crouch: false, strafeT: 0, strafeDir: RNG.chance(0.5) ? 1 : -1
  };
}

const Bots = {
  count: 0,
  reset(count) {
    BOTS.length = 0;
    this.count = count;
    /* unique gamer tags: shuffle the list, then suffix on overflow */
    namePool = BOT_NAMES.slice();
    for (let i = namePool.length - 1; i > 0; i--) {
      const j = Math.floor(RNG.next() * (i + 1));
      const t = namePool[i]; namePool[i] = namePool[j]; namePool[j] = t;
    }
    for (let i = namePool.length; i < count; i++) namePool.push(BOT_NAMES[i % BOT_NAMES.length] + '_' + (i + 1));
    /* spatial index of the static loot points so bots know where to loot */
    lootGrid = new SpatialGrid(50);
    for (let i = 0; i < World.lootPoints.length; i++) {
      const p = World.lootPoints[i];
      lootGrid.insert(p.x, p.z, p);
    }
    for (let i = 0; i < count; i++) {
      const b = makeBot(i);
      const spot = pickSpawnSpot();
      const bias = (spot.name && spot.w > 1) ? 22 : 60;
      b.dropX = clamp(spot.x + RNG.range(-bias, bias), -420, 420);
      b.dropZ = clamp(spot.z + RNG.range(-bias, bias), -420, 420);
      const a = RNG.range(0, Math.PI * 2), r = RNG.range(300, 455);
      b.pos.set(Math.cos(a) * r, CONFIG.DROP_ALTITUDE + RNG.range(-50, 70), Math.sin(a) * r);
      b.moveTarget.x = b.dropX;
      b.moveTarget.z = b.dropZ;
      b.yaw = Math.atan2(b.dropX - b.pos.x, b.dropZ - b.pos.z);
      b.chuteOpen = false;
      /* Nobody is handed a gun at spawn - not the player and not the bots.
         Bots start empty handed and arm themselves by looting (upgradeGear),
         so the first minute is a scramble for weapons for everybody. */
      b.weapons = [];
      b.mag = 0;
      b.weaponId = null;
      BotView.body.setColorAt(i, b.bodyColor);
      const skin = new THREE.Color().setHSL(0.07, 0.4, RNG.range(0.3, 0.62));
      BotView.head.setColorAt(i, skin);
      this.paintGun(b);
      BOTS.push(b);
    }
    BotView.flush();
  },

  aliveCount() {
    let n = 0;
    for (let i = 0; i < BOTS.length; i++) if (BOTS[i].alive) n++;
    return n;
  },
  /* the instanced gun is tinted with the rarity of the weapon the bot found,
     and scaled by its length in syncView - an unarmed bot carries nothing */
  paintGun(b) {
    const w = b.weaponId ? CONFIG.WEAPONS[b.weaponId] : null;
    BotView.gun.setColorAt(b.index, new THREE.Color(w ? CONFIG.RARITY_COLORS[w.tier]
                                                     : CONFIG.RARITY_COLORS[0]));
    if (BotView.gun.instanceColor) BotView.gun.instanceColor.needsUpdate = true;
  },
  /* the closest living entity that is not the bot itself */
  nearestEnemy(b, maxDist) {
    let best = null, bestD = maxDist * maxDist;
    const near = entityGrid.query(b.pos.x, b.pos.z, maxDist, enemyScratch);
    for (let i = 0; i < near.length; i++) {
      const e = near[i];
      if (!e.alive || e === b) continue;
      const dx = e.pos.x - b.pos.x, dz = e.pos.z - b.pos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bestD) { bestD = d2; best = e; }
    }
    return best;
  },
  /* ---------- helpers ---------- */
  /* closest static loot point the bot has not "used" yet */
  pickLootTarget(b) {
    let best = null, bestD = 90000;
    const near = lootGrid.query(b.pos.x, b.pos.z, 90, enemyScratch);
    for (let i = 0; i < near.length; i++) {
      const p = near[i];
      const d = distSq2D(p.x, p.z, b.pos.x, b.pos.z);
      if (d < bestD) { bestD = d; best = p; }
    }
    /* supply crates are irresistible */
    const crates = Loot.crates;
    for (let i = 0; i < crates.length; i++) {
      const c = crates[i];
      if (!c.landed) continue;
      const d = distSq2D(c.x, c.z, b.pos.x, b.pos.z);
      if (d < 48000 && d < bestD * 2.4) { best = { x: c.x, z: c.z, y: c.y }; bestD = d; }
    }
    if (!best) {
      const a = RNG.range(0, Math.PI * 2), r = RNG.range(20, 70);
      best = { x: clamp(b.pos.x + Math.cos(a) * r, -420, 420), z: clamp(b.pos.z + Math.sin(a) * r, -420, 420) };
    }
    b.moveTarget.x = best.x + RNG.range(-3, 3);
    b.moveTarget.z = best.z + RNG.range(-3, 3);
  },
  /* simulate finding gear: an unarmed bot is in a hurry to find a gun, an
     armed one looks for upgrades. Faster for skilled bots and later phases. */
  upgradeGear(b, dt) {
    b.lootFindT -= dt;
    if (b.lootFindT > 0) return;
    const unarmed = !b.weaponId;
    b.lootFindT = unarmed ? RNG.range(2.5, 6) : RNG.range(6, 16) * (1.4 - b.skill * 0.5);
    const luck = 0.35 + b.skill * 0.5 + Zone.phase * 0.12;
    if (RNG.chance(unarmed ? 0.9 : 0.55)) {
      const id = Loot.pickWeapon(luck);
      const found = CONFIG.WEAPONS[id];
      const cur = b.weaponId ? CONFIG.WEAPONS[b.weaponId] : null;
      if (unarmed || found.tier > cur.tier || RNG.chance(0.15)) {
        b.weapons = [{ id: id, mag: found.mag }];
        b.weaponId = id;
        b.mag = found.mag;
        b.reloadT = 0;
        /* it also grabs the ammo it needs for its new gun */
        b.ammoReserve[found.ammo] = Math.max(b.ammoReserve[found.ammo] | 0,
          CONFIG.AMMO_PICKUP[found.ammo] * 3);
        this.paintGun(b);
      }
    }
    if (b.weaponId) {
      const t = CONFIG.WEAPONS[b.weaponId];
      b.ammoReserve[t.ammo] = Math.min(CONFIG.AMMO_LIMIT[t.ammo],
        (b.ammoReserve[t.ammo] | 0) + CONFIG.AMMO_PICKUP[t.ammo]);
    }
    if (RNG.chance(0.28)) b.inv.bandage = Math.min(3, b.inv.bandage + 1);
    if (RNG.chance(0.16)) b.inv.medkit = Math.min(2, b.inv.medkit + 1);
    if (RNG.chance(0.18)) b.inv.shield = Math.min(2, b.inv.shield + 1);
    if (RNG.chance(0.14)) b.inv.nade = Math.min(2, b.inv.nade + 1);
    if (RNG.chance(0.35)) b.helmetTier = Math.min(3, Math.max(b.helmetTier, RNG.int(1, 3)));
    if (RNG.chance(0.35)) b.vestTier = Math.min(3, Math.max(b.vestTier, RNG.int(1, 3)));
    if (RNG.chance(0.4) && b.shield < CONFIG.MAX_SHIELD) b.shield = Math.min(CONFIG.MAX_SHIELD, b.shield + 25);
  },
  /* pick a point inside the safe circle, with per-bot jitter so they do not stack */
  pickZonePoint(b) {
    const z = Zone.cur;
    const a = Math.atan2(b.pos.z - z.z, b.pos.x - z.x) + RNG.range(-0.9, 0.9);
    const r = z.r * RNG.range(0.15, 0.72);
    b.moveTarget.x = z.x + Math.cos(a) * r;
    b.moveTarget.z = z.z + Math.sin(a) * r;
  },

  /* ---------- state machine: one bot, one tick ---------- */
  step(b, dt) {
    if (!b.alive) return;
    b.stateT += dt;
    const wz = Zone.isOutside(b.pos.x, b.pos.z);
    /* The last circles have no loot worth having: once only a handful of
       combatants are left in a tiny circle everyone switches to hunting, which
       also guarantees a 1v1 can never stall out. */
    const hunt = (Zone.state === 'final' || Zone.cur.r < 30) && Bots.aliveCount() <= 4;
    if (hunt && (b.state === 'loot' || b.state === 'heal')) { b.state = 'rotate'; b.stateT = 0; }
    switch (b.state) {
      case 'drop': break;               // handled in update() with the landing logic
      case 'loot': {
        /* an unarmed bot keeps its head down and keeps looking for a gun;
           an armed one reacts to anyone genuinely on top of it */
        const enemy = b.weaponId ? this.checkSight(b, dt, 34) : null;
        if (enemy) { b.state = 'engage'; b.stateT = 0; return; }
        this.upgradeGear(b, dt);
        this.walkTo(b, dt, CONFIG.BOT_SPEED_RUN * 0.72, true);
        if (b.stuckT > 1.6 || b.stateT > RNG.range(16, 30) || wz) {
          b.state = 'rotate'; b.stateT = 0; this.pickZonePoint(b);
        }
        break;
      }
      case 'rotate': {
        const enemy = this.checkSight(b, dt);
        if (enemy && RNG.chance(0.8)) { b.state = 'engage'; b.stateT = 0; return; }
        /* in the last circles, walk straight at the nearest survivor */
        if (hunt) {
          const rival = this.nearestEnemy(b, 220);
          if (rival) {
            b.moveTarget.x = rival.pos.x + RNG.range(-1.5, 1.5);
            b.moveTarget.z = rival.pos.z + RNG.range(-1.5, 1.5);
          }
        }
        this.walkTo(b, dt, CONFIG.BOT_SPEED_RUN, false);
        if (b.stuckT > 1.4) this.pickZonePoint(b);
        if (!wz && Zone.state !== 'final' && Zone.timeLeft() > 12 && RNG.chance(0.02)) {
          b.state = 'loot'; b.stateT = 0; this.pickLootTarget(b);
        }
        if (wz || b.stateT > 22) {
          this.pickZonePoint(b);
          b.stateT = 0;
        }
        break;
      }
      case 'engage': {
        if (b.hp <= 34 && (b.inv.medkit > 0 || b.inv.bandage > 0 || b.inv.shield > 0)) {
          b.state = 'heal'; b.stateT = 0;
          b.healT = CONFIG.BOT_HEAL_DELAY;
          break;
        }
        this.combat(b, dt, wz);
        break;
      }
      case 'heal': {
        this.healBehaviour(b, dt);
        break;
      }
      default: b.state = 'loot';
    }
  },
  /* line of sight + FOV gate: returns the enemy the bot can see, else null.
     maxRange lets the caller keep a busy bot (looting) from picking fights
     with everyone in sight, which keeps the early match from being a brawl. */
  checkSight(b, dt, maxRange) {
    b.losT -= dt;
    if (b.losT > 0) return (b.hasSeen && b.target && b.target.alive) ? b.target : null;
    b.losT = 0.22 + RNG.next() * 0.25;
    const range = Math.min(CONFIG.BOT_SIGHT * (0.55 + b.skill * 0.6), maxRange || 1e9);
    const enemy = this.nearestEnemy(b, range);
    if (!enemy) { b.hasSeen = false; return null; }
    const dx = enemy.pos.x - b.pos.x, dz = enemy.pos.z - b.pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const toEnemy = Math.atan2(dx, -dz);
    const diff = Math.abs(angDiff(toEnemy, b.yaw));
    /* FOV gate: a wide cone ahead, peripheral awareness of a narrower cone
       directly behind, and anything at point-blank range */
    const rear = diff > Math.PI - CONFIG.BOT_FOV_BACK;
    if (diff > CONFIG.BOT_SIGHT_FOV_FRONT && !rear && dist > 13) { b.hasSeen = false; return null; }
    const blocked = !World.losClear(b.pos.x, b.pos.y + 1.45, b.pos.z,
                                    enemy.pos.x, enemy.pos.y + 1.1, enemy.pos.z);
    if (blocked) {
      /* Late game: a bot that can hear someone this close keeps pushing their
         position, and at point-blank range it engages through cover, so the
         final circles always resolve instead of stalling behind a wall. */
      if (Zone.state === 'final' || Zone.cur.r < 45) {
        b.moveTarget.x = enemy.pos.x + RNG.range(-2.5, 2.5);
        b.moveTarget.z = enemy.pos.z + RNG.range(-2.5, 2.5);
        if (dist > 14) { b.hasSeen = false; return null; }
      } else {
        b.hasSeen = false;
        return null;
      }
    }
    b.target = enemy;
    b.hasSeen = true;
    b.noSightT = 0;
    b.lastSeen.set(enemy.pos.x, enemy.pos.y, enemy.pos.z);
    return enemy;
  },
  /* steer toward b.moveTarget with obstacle avoidance */
  walkTo(b, dt, speed, lootOnArrival) {
    const dx = b.moveTarget.x - b.pos.x, dz = b.moveTarget.z - b.pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    let vx = 0, vz = 0;
    if (dist > 1.4) {
      vx = dx / dist * speed;
      vz = dz / dist * speed;
      b.yaw = angLerp(b.yaw, Math.atan2(dx, -dz), 1 - Math.exp(-7 * dt));
    } else if (lootOnArrival) {
      this.pickLootTarget(b);
    }
    botAvoid(b, _bv);
    vx += _bv.x * speed * 0.8;
    vz += _bv.z * speed * 0.8;
    const k = 1 - Math.exp(-9 * dt);
    b.vel.x += (vx - b.vel.x) * k;
    b.vel.z += (vz - b.vel.z) * k;
    this.integrate(b, dt);
  },
  /* move + collide + stuck detection + deep water push back */
  integrate(b, dt) {
    const probe = { x: b.pos.x + b.vel.x * dt, z: b.pos.z + b.vel.z * dt };
    World.resolve(probe, 0.42, b.pos.y, b.pos.y + 1.7);
    b.pos.x = probe.x;
    b.pos.z = probe.z;
    b.pos.y = World.groundAt(b.pos.x, b.pos.z, b.pos.y + 0.7);
    const moved = dist2D(b.pos.x, b.pos.z, b.lastPX, b.lastPZ);
    if (moved < 0.025) {
      b.stuckT += dt;
      if (b.stuckT > 1.1) {
        b.nudgeCount++;
        if (b.nudgeCount < 3) {
          /* slide sideways so it can round the corner */
          const a = Math.atan2(b.moveTarget.z - b.pos.z, b.moveTarget.x - b.pos.x) + RNG.sign() * 1.25;
          b.pos.x += Math.cos(a) * 1.8;
          b.pos.z += Math.sin(a) * 1.8;
        } else {
          /* last resort: hop a short distance toward the goal */
          const dx = b.moveTarget.x - b.pos.x, dz = b.moveTarget.z - b.pos.z;
          const d = Math.max(0.001, Math.sqrt(dx * dx + dz * dz));
          const step = Math.min(9, d);
          b.pos.x += dx / d * step;
          b.pos.z += dz / d * step;
          b.nudgeCount = 0;
        }
        b.pos.x = clamp(b.pos.x, -425, 425);
        b.pos.z = clamp(b.pos.z, -425, 425);
        b.pos.y = World.groundAt(b.pos.x, b.pos.z, b.pos.y + 2.2);
        b.stuckT = 0;
      }
    } else {
      b.stuckT = 0;
      b.lastPX = b.pos.x;
      b.lastPZ = b.pos.z;
      b.nudgeCount = 0;
    }
    /* nobody wants to swim: deep water pushes them back toward the shore */
    if (World.waterDepth(b.pos.x, b.pos.z) > 2.2) {
      const len = Math.sqrt(b.pos.x * b.pos.x + b.pos.z * b.pos.z) || 1;
      b.pos.x -= (b.pos.x / len) * 0.5;
      b.pos.z -= (b.pos.z / len) * 0.5;
      b.pos.y = World.groundAt(b.pos.x, b.pos.z, b.pos.y + 2.2);
    }
  },
  /* ---------- fight: strafe, hold a useful range, fire, sometimes lob a frag ---------- */
  combat(b, dt, inZone) {
    const tgt = b.target;
    if (!tgt || !tgt.alive) { b.state = 'loot'; b.stateT = 0; this.pickLootTarget(b); return; }
    /* empty handed: break off and go find a weapon instead of shadow boxing */
    if (!b.weaponId) { b.state = 'loot'; b.stateT = 0; this.pickLootTarget(b); return; }
    const w = CONFIG.WEAPONS[b.weaponId];
    const dx = tgt.pos.x - b.pos.x, dz = tgt.pos.z - b.pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const ideal = w.id === 'shotgun' ? 9 : (w.id === 'sniper' ? 65 : (w.id === 'smg' ? 14 : 24));
    b.strafeT -= dt;
    if (b.strafeT <= 0) { b.strafeT = RNG.range(0.5, 1.5); b.strafeDir *= -1; }
    const fx = dx / Math.max(0.001, dist), fz = dz / Math.max(0.001, dist);
    let mvx = -fz * b.strafeDir * 0.85, mvz = fx * b.strafeDir * 0.85;
    const closing = dist > ideal * 1.35 ? 1 : (dist < ideal * 0.65 ? -1 : 0);
    mvx += fx * closing;
    mvz += fz * closing;
    if (inZone) {
      mvx += (Zone.cur.x - b.pos.x) * 0.02;
      mvz += (Zone.cur.z - b.pos.z) * 0.02;
    }
    botAvoid(b, _bv);
    mvx += _bv.x;
    mvz += _bv.z;
    const l = Math.sqrt(mvx * mvx + mvz * mvz) || 1;
    const endgame = (Zone.state === 'final' || Zone.cur.r < 40);
    const speed = CONFIG.BOT_SPEED_WALK * (0.75 + b.skill * 0.5) * b.aggression * (endgame ? 1.4 : 1);
    const k = 1 - Math.exp(-9 * dt);
    b.vel.x += (mvx / l * speed - b.vel.x) * k;
    b.vel.z += (mvz / l * speed - b.vel.z) * k;
    this.integrate(b, dt);
    /* drop into a crouch now and then at range */
    if (dist > 25 && RNG.chance(dt * 0.25)) b.crouch = !b.crouch;
    if (dist < 12) b.crouch = false;
    b.yaw = angLerp(b.yaw, Math.atan2(dx, -dz), 1 - Math.exp(-11 * dt));
    /* human reaction window before the first shot on a freshly spotted target */
    const react = CONFIG.BOT_REACTION[0] +
      (1 - b.skill) * (CONFIG.BOT_REACTION[1] - CONFIG.BOT_REACTION[0]);
    if (b.stateT < react) return;
    this.fireAt(b, tgt, dist, dt);
    /* occasional frag toward a cluster at medium range */
    if (b.inv.nade > 0 && dist > 9 && dist < 32 && RNG.chance(dt * 0.1 * b.skill * b.aggression)) {
      b.inv.nade--;
      const gx = b.pos.x + fx * 0.8, gy = b.pos.y + 1.4, gz = b.pos.z + fz * 0.8;
      const tx = tgt.pos.x - gx, ty = tgt.pos.y + 0.4 - gy, tz = tgt.pos.z - gz;
      const d = Math.max(1, Math.sqrt(tx * tx + tz * tz));
      const sp = CONFIG.GRENADE_SPEED * 0.72;
      const tt = Math.max(0.4, d / sp);
      _sfxPos.set(gx, gy, gz);
      Projectiles.throwIt('frag', gx, gy, gz, tx / d * sp,
        (ty + 0.5 * CONFIG.GRAVITY * 0.62 * tt * tt) / tt, tz / d * sp, b, 'Frag Grenade');
    }
    /* give up the chase if the target stays hidden */
    if (b.hasSeen) b.noSightT = 0;
    else {
      b.noSightT = (b.noSightT || 0) + dt;
      if (b.noSightT > (endgame ? 3.5 : 7)) { b.state = 'rotate'; b.stateT = 0; this.pickZonePoint(b); }
    }
  },

  /* ---- shooting: reaction-scaled hit chance, bursts, tracers, positional audio ---- */
  fireAt(b, tgt, dist, dt) {
    const w = CONFIG.WEAPONS[b.weaponId];
    if (!w) return;                       // unarmed: combat() sends it looting
    if (b.reloadT > 0) {
      b.reloadT -= dt;
      if (b.reloadT <= 0) {
        const need = w.mag - b.mag;
        const have = b.ammoReserve[w.ammo] | 0;
        const take = Math.min(need, have);
        b.mag += take;
        b.ammoReserve[w.ammo] = have - take;
        if (b.mag <= 0) this.downgradeWeapon(b);
      }
      return;
    }
    if (b.mag <= 0) {
      if ((b.ammoReserve[w.ammo] | 0) > 0) { b.reloadT = w.reload * (1.5 - b.skill * 0.5); return; }
      this.downgradeWeapon(b);
      return;
    }
    b.fireT -= dt;
    if (b.fireT > 0) return;
    if (b.burstLeft <= 0) b.burstLeft = w.auto ? RNG.int(2, 5) : 1;
    b.burstLeft--;
    b.mag--;
    b.fireT = 60 / w.rpm;
    if (b.burstLeft <= 0) b.fireT += RNG.range(0.45, 1.5) * (1.5 - b.skill * 0.6);

    const mx = b.pos.x + Math.sin(b.yaw) * 0.65;
    const mz = b.pos.z - Math.cos(b.yaw) * 0.65;
    const my = b.pos.y + (b.crouch ? 1.05 : 1.3);
    /* aim quality: skill, distance, whether the shooter is moving, crouch bonus.
       The cap keeps even the best bots human - they miss a lot at range. */
    const base = 0.18 + b.skill * 0.34;
    const distMul = clamp(1 - dist / (w.falloffEnd * 1.15), 0.10, 1);
    const movePenalty = (b.vel.x * b.vel.x + b.vel.z * b.vel.z) > 4 ? 0.78 : 1;
    const chance = clamp(base * (0.12 + distMul * 0.88) * movePenalty * (b.crouch ? 1.15 : 1), 0.02, 0.5);
    const hit = RNG.chance(chance);
    const isHead = hit && RNG.chance(0.05 + b.skill * 0.2);
    let ex, ey, ez;
    if (hit) {
      ex = tgt.pos.x; ey = tgt.pos.y + (isHead ? 1.34 : 0.95); ez = tgt.pos.z;
    } else {
      const a = RNG.range(0, 6.283), r = RNG.range(0.7, 3.0);
      ex = tgt.pos.x + Math.cos(a) * r;
      ey = tgt.pos.y + RNG.range(0.2, 2.0);
      ez = tgt.pos.z + Math.sin(a) * r;
    }
    FX.tracer(mx, my, mz, ex, ey, ez, 1, 0.72, 0.32, 0.07);
    _sfxPos.set(mx, my, mz);
    SFX.play(w.sound, { pos: _sfxPos, maxDist: 180, gain: 0.5 });
    if (hit) {
      const dmg = falloffDamage(w, dist) * (isHead ? w.hs : 1) * (0.8 + b.skill * 0.3);
      Hit.damage(tgt, dmg, { head: isHead, attacker: b, weapon: w.name });
      FX.impact(ex, ey, ez, -Math.sin(b.yaw), -0.2, Math.cos(b.yaw), 'flesh');
    }
  },
  /* out of ammo for everything it carries: holster it and go looking again */
  downgradeWeapon(b) {
    b.weaponId = null;
    b.mag = 0;
    b.weapons = [];
    b.reloadT = 0;
    this.paintGun(b);
    b.state = 'loot';
    b.stateT = 0;
    this.pickLootTarget(b);
  },
  /* ---------- situational healing: break contact, then patch up ---------- */
  healBehaviour(b, dt) {
    if (b.stateT < 0.12 && b.lastSeen) {
      /* run away from the last known threat */
      const dx = b.pos.x - b.lastSeen.x, dz = b.pos.z - b.lastSeen.z;
      const d = Math.max(0.6, Math.sqrt(dx * dx + dz * dz));
      b.moveTarget.x = clamp(b.pos.x + dx / d * 16, -418, 418);
      b.moveTarget.z = clamp(b.pos.z + dz / d * 16, -418, 418);
    }
    if (Zone.isOutside(b.pos.x, b.pos.z)) this.pickZonePoint(b);
    this.walkTo(b, dt, CONFIG.BOT_SPEED_WALK * 1.2, false);
    b.healT -= dt;
    if (b.healT <= 0) {
      if (b.inv.medkit > 0) { b.inv.medkit--; b.hp = Math.min(CONFIG.MAX_HP, b.hp + 60); }
      else if (b.inv.bandage > 0) { b.inv.bandage--; b.hp = Math.min(CONFIG.MAX_HP, b.hp + 25); }
      else if (b.inv.shield > 0) { b.inv.shield--; b.shield = Math.min(CONFIG.MAX_SHIELD, b.shield + 50); }
      b.healT = CONFIG.BOT_HEAL_DELAY + RNG.range(0, 1.2);
    }
    const out = (b.inv.medkit <= 0 && b.inv.bandage <= 0 && b.inv.shield <= 0);
    if (b.hp > 72 || out || b.stateT > 14) { b.state = 'loot'; b.stateT = 0; this.pickLootTarget(b); }
  },

  /* ---------- visuals: five instanced meshes carry the whole bot army ---------- */
  syncView(b) {
    const i = b.index;
    _beu.set(0, Math.PI - b.yaw, 0);
    _bq.setFromEuler(_beu);
    const fwdX = Math.sin(b.yaw), fwdZ = -Math.cos(b.yaw);
    const rgtX = Math.cos(b.yaw), rgtZ = Math.sin(b.yaw);
    const y = b.pos.y;
    _bs.set(1, b.crouch ? 0.78 : 1, 1);
    _bv.set(b.pos.x, y + (b.crouch ? 0.52 : 0.72), b.pos.z);
    _bm.compose(_bv, _bq, _bs);
    BotView.body.setMatrixAt(i, _bm);
    _bs.set(1, 1, 1);
    _bv.set(b.pos.x, y + (b.crouch ? 1.06 : 1.34), b.pos.z);
    _bm.compose(_bv, _bq, _bs);
    BotView.head.setMatrixAt(i, _bm);
    for (let k = 0; k < 2; k++) {
      const s = k === 0 ? 0.33 : -0.33;
      _bv.set(b.pos.x + rgtX * s + fwdX * 0.1, y + (b.crouch ? 0.8 : 1.04), b.pos.z + rgtZ * s + fwdZ * 0.1);
      _bm.compose(_bv, _bq, _bs);
      BotView.arms.setMatrixAt(i * 2 + k, _bm);
    }
    /* the gun scales with the weapon length, so gear upgrades are visible */
    const w = CONFIG.WEAPONS[b.weaponId];
    if (w) {
      _bv.set(b.pos.x + fwdX * 0.52, y + (b.crouch ? 0.92 : 1.14), b.pos.z + fwdZ * 0.52);
      _bs.set(1, 1, w.len);
      _bm.compose(_bv, _bq, _bs);
      BotView.gun.setMatrixAt(i, _bm);
    } else {
      /* empty handed until it finds something */
      BotView.gun.setMatrixAt(i, _bzero);
    }
    /* parachute only while dropping with the canopy open */
    if (b.state === 'drop' && b.chuteOpen) {
      _bs.set(1, 1, 1);
      _bv.set(b.pos.x, y + 3.5, b.pos.z);
      _bm.compose(_bv, _bq, _bs);
      BotView.chute.setMatrixAt(i, _bm);
    } else {
      BotView.chute.setMatrixAt(i, _bzero);
    }
  },

  /* ---------- parachute descent ---------- */
  dropStep(b, dt) {
    const dx = b.dropX - b.pos.x, dz = b.dropZ - b.pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > 1.5) b.yaw = angLerp(b.yaw, Math.atan2(dx, -dz), 1 - Math.exp(-4 * dt));
    if (!b.chuteOpen) {
      b.pos.y -= CONFIG.DROP_FALL_SPEED * dt;
      if (dist > 2) { b.pos.x += dx / dist * 24 * dt; b.pos.z += dz / dist * 24 * dt; }
      if (b.pos.y < CONFIG.GLIDER_AUTO_ALT + RNG.range(0, 60)) b.chuteOpen = true;
    } else {
      b.pos.y -= CONFIG.GLIDER_FALL_SPEED * dt;
      if (dist > 1.5) { b.pos.x += dx / dist * b.glideSpeed * dt; b.pos.z += dz / dist * b.glideSpeed * dt; }
    }
    b.pos.x = clamp(b.pos.x, -420, 420);
    b.pos.z = clamp(b.pos.z, -420, 420);
    const g = World.groundAt(b.pos.x, b.pos.z, b.pos.y + 1);
    if (b.pos.y <= g) {
      b.pos.y = g;
      b.state = 'loot';
      b.stateT = 0;
      b.chuteOpen = false;
      b.lastPX = b.pos.x;
      b.lastPZ = b.pos.z;
      this.pickLootTarget(b);
    }
  },

  /* ---------- the whole army, one frame ---------- */
  update(dt) {
    /* rebuild the entity index used by bullets, vision and explosions */
    entityGrid.clear();
    if (Player.alive) entityGrid.insert(Player.pos.x, Player.pos.z, Player);
    const px = CAM.pos.x, pz = CAM.pos.z;
    const near = CONFIG.BOT_TICK_NEAR, mid = CONFIG.BOT_TICK_MID;
    for (let i = 0; i < BOTS.length; i++) {
      const b = BOTS[i];
      if (!b.alive) continue;
      entityGrid.insert(b.pos.x, b.pos.z, b);
      const d = dist2D(b.pos.x, b.pos.z, px, pz);
      const interval = d < near ? 0 : (d < mid ? 0.05 : (d < CONFIG.BOT_TICK_FAR ? 0.15 : 0.28));
      b.tickAcc += dt;
      if (b.tickAcc >= interval || interval === 0) {
        const step = Math.min(0.3, b.tickAcc);
        b.tickAcc = 0;
        if (b.state === 'drop') this.dropStep(b, step);
        else if (App.state === 'DROP') { /* everyone is still in the air */ }
        else this.step(b, step);
        /* the storm hurts bots too (and kills them) */
        if (b.alive && Zone.isOutside(b.pos.x, b.pos.z)) {
          Hit.damage(b, Zone.dps() * step, {
            attacker: null, weapon: 'the storm', ignoresArmor: true, ignoresShield: true, silent: true
          });
        }
      }
    }
    /* cosmetic pass: pose the bots close enough to matter */
    for (let i = 0; i < BOTS.length; i++) {
      const b = BOTS[i];
      if (!b.alive) continue;
      if (dist2D(b.pos.x, b.pos.z, px, pz) < 420) this.syncView(b);
    }
    BotView.flush();
  },

  clear() {
    for (let i = 0; i < BOTS.length; i++) BotView.hide(i);
    BotView.flush();
    BOTS.length = 0;
  }
};

const hitScratch = [];
const _hitResults = [];
for (let i = 0; i < 24; i++) _hitResults.push({ t: 0, bot: null, head: false, world: false, x: 0, y: 0, z: 0 });
let _hitIdx = 0;

function raySphereT(ox, oy, oz, dx, dy, dz, cx, cy, cz, r) {
  const mx = ox - cx, my = oy - cy, mz = oz - cz;
  const b = mx * dx + my * dy + mz * dz;
  const c = mx * mx + my * my + mz * mz - r * r;
  const disc = b * b - c;
  if (disc < 0) return -1;
  const t = -b - Math.sqrt(disc);
  return t >= 0 ? t : -1;
}

/* =====================================================================
   HIT - one place where damage resolves: armour, shields, streaks, kill
   feed, death drops, placement and the win/lose hand-off.
   ===================================================================== */
const Hit = {
  /* damage *multiplier* from helmet + vest tiers (1 = no protection at all,
     ~0.42 = full level-3 protection). Must stay a multiplier: the caller does
     `damage *= armorMul(e)`, so returning 0 here would make unarmoured players
     and bots immune to gunfire. */
  armorMul(e) {
    const r = CONFIG.ARMOR_REDUCTION;
    return (1 - r[clamp(e.helmetTier | 0, 0, 3)]) * (1 - r[clamp(e.vestTier | 0, 0, 3)]);
  },
  /* nearest entity whose body sphere is touched (rocket proximity fuse) */
  probeSphere(x, y, z, r, ignore) {
    const near = entityGrid.query(x, z, 12, hitScratch);
    for (let i = 0; i < near.length; i++) {
      const e = near[i];
      if (!e.alive || e === ignore) continue;
      const dx = e.pos.x - x, dy = e.pos.y + 0.9 - y, dz = e.pos.z - z;
      const rr = r + 0.55;
      if (dx * dx + dy * dy + dz * dz < rr * rr) return e;
    }
    return null;
  },
  /* bullet ray: world geometry first, then bodies (head sphere beats torso) */
  hitscan(ox, oy, oz, dx, dy, dz, maxDist, shooter) {
    const w = World.raycast(ox, oy, oz, dx, dy, dz, maxDist);
    let bestT = w.t > 0 ? w.t : maxDist;
    let hitBot = null, head = false;
    const near = entityGrid.query(ox + dx * maxDist * 0.5, oz + dz * maxDist * 0.5, maxDist * 0.5 + 6, hitScratch);
    for (let i = 0; i < near.length; i++) {
      const e = near[i];
      if (!e.alive || e === shooter) continue;
      const bx = e.pos.x, bz = e.pos.z, by = e.pos.y;
      let t = raySphereT(ox, oy, oz, dx, dy, dz, bx, by + 0.62, bz, 0.46);
      let isHead = false;
      const th = raySphereT(ox, oy, oz, dx, dy, dz, bx, by + 1.34, bz, 0.28);
      if (th >= 0 && (t < 0 || th < t)) { t = th; isHead = true; }
      if (t >= 0 && t < bestT) { bestT = t; hitBot = e; head = isHead; }
    }
    const res = _hitResults[_hitIdx];
    _hitIdx = (_hitIdx + 1) % _hitResults.length;
    res.t = bestT; res.bot = hitBot; res.head = head; res.world = !hitBot;
    res.x = ox + dx * bestT; res.y = oy + dy * bestT; res.z = oz + dz * bestT;
    return res;
  },
  /* opts: {head, attacker, weapon, ignoresArmor, ignoresShield, silent} */
  damage(e, amount, opts) {
    if (!e || !e.alive || amount <= 0) return 0;
    const o = opts || {};
    let amt = amount;
    if (!o.ignoresArmor) amt *= this.armorMul(e);
    const dealt = amt;
    if (!o.ignoresShield && e.shield > 0) {
      const absorbed = Math.min(e.shield, amt);
      e.shield -= absorbed;
      amt -= absorbed;
      if (e === Player && absorbed > 0 && !o.silent) SFX.play('hitShield', { gain: 0.5 });
    }
    e.hp -= amt;
    if (e === Player) {
      Player.lastDamageTime = Game.time;
      Player.lastDamageFrom = o.attacker || null;
      if (o.attacker && o.attacker.pos) FX.damageDir(o.attacker.pos.x, o.attacker.pos.z);
      Player.cancelUse(true);
      if (!o.silent) UI.flashDamage();
    }
    if (o.attacker) {
      o.attacker.damageDealt = (o.attacker.damageDealt || 0) + dealt;
      if (o.attacker === Player && !o.silent) UI.addDamage(dealt);
    }
    if (e.hp <= 0) this.die(e, o);
    return dealt;
  },
  die(e, o) {
    if (!e.alive) return;
    e.alive = false;
    e.hp = 0;
    App.deathsThisTick++;
    e.placement = Math.max(1, App.aliveCount - App.deathsThisTick + 1);
    const attacker = (o && o.attacker) || null;
    const weapon = (o && o.weapon) || 'the zone';
    const headshot = !!(o && o.head);
    if (attacker && attacker !== e) {
      /* Player.kills IS attacker.kills when the player is the shooter, so this
         single increment is the only one - do not add a second for the player. */
      attacker.kills = (attacker.kills || 0) + 1;
      if (attacker === Player) {
        FX.hitMarker('kill');
        SFX.play('kill');
      }
    }
    UI.killFeed(attacker ? (attacker.isPlayer ? 'YOU' : attacker.name) : 'THE ISLAND',
                e.isPlayer ? 'YOU' : e.name, weapon, headshot, attacker === Player);
    Loot.dropFrom(e);
    if (e.isPlayer) {
      Game.onPlayerDeath(attacker, weapon, headshot);
    } else {
      BotView.hide(e.index);
      checkWin();
    }
  }
};


/* =====================================================================
   ZONE - shrinking circle. Visible during the wait, then interpolated to a
   smaller circle placed randomly inside the old one. Out-of-zone damage
   ignores armour and shields and escalates every phase.
   ===================================================================== */
const Zone = {
  phase: 0,
  state: 'idle',          // idle | wait | shrink | final
  timer: 0, waitTotal: 1, shrinkTotal: 1,
  cur: { x: 0, z: 0, r: CONFIG.ZONE_START_R },
  from: { x: 0, z: 0, r: CONFIG.ZONE_START_R },
  next: { x: 0, z: 0, r: CONFIG.ZONE_START_R },
  wall: null, nextRing: null, uniform: null, nextUniform: null,

  /* roll the next circle: same phase radius, thrown randomly inside the current
     one and nudged back towards the island so the endgame stays on land */
  rollNext(cur, r) {
    const maxOff = Math.max(0, cur.r - r);
    const out = { x: cur.x, z: cur.z, r: r };
    for (let i = 0; i < 40; i++) {
      const a = RNG.range(0, Math.PI * 2), d = RNG.range(0, maxOff);
      out.x = cur.x + Math.cos(a) * d;
      out.z = cur.z + Math.sin(a) * d;
      if (Math.sqrt(out.x * out.x + out.z * out.z) + r <= CONFIG.ISLAND_RADIUS * 0.94) return out;
    }
    const c = Math.sqrt(out.x * out.x + out.z * out.z) || 1;
    const lim = Math.max(0, CONFIG.ISLAND_RADIUS * 0.94 - r) / c;
    out.x *= lim; out.z *= lim;
    return out;
  },

  build() {
    const wallGeo = new THREE.CylinderGeometry(1, 1, 1, 72, 1, true);
    wallGeo.translate(0, 0.5, 0);
    const uni = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(0.35, 0.86, 1.0) },
      uAlpha: { value: 0.34 }
    };
    const vs = [
      'varying vec2 vUv;',
      'void main(){ vUv = uv;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }'
    ].join('\n');
    const fs = [
      'uniform float uTime; uniform vec3 uColor; uniform float uAlpha;',
      'varying vec2 vUv;',
      'void main(){',
      '  float y = fract(vUv.y);',
      '  float base = smoothstep(0.0, 0.12, y) * (1.0 - smoothstep(0.5, 1.0, y));',
      '  float bands = 0.55 + 0.45 * sin(y * 54.0 - uTime * 2.4);',
      '  float pulse = 0.78 + 0.22 * sin(uTime * 3.0);',
      '  gl_FragColor = vec4(uColor * (0.7 + 0.5 * bands), uAlpha * base * (0.6 + 0.4 * bands) * pulse);',
      '}'
    ].join('\n');
    const mat = new THREE.ShaderMaterial({
      uniforms: uni, transparent: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false, vertexShader: vs, fragmentShader: fs
    });
    this.wall = new THREE.Mesh(wallGeo, mat);
    this.wall.frustumCulled = false;
    this.wall.renderOrder = 4;
    World.group.add(this.wall);
    this.uniform = uni;

    /* preview of the next circle: a short, faint white wall */
    const nGeo = new THREE.CylinderGeometry(1, 1, 1, 64, 1, true);
    nGeo.translate(0, 0.5, 0);
    const nUni = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(1, 1, 1) },
      uAlpha: { value: 0.17 }
    };
    const nMat = mat.clone();
    nMat.uniforms = nUni;
    this.nextRing = new THREE.Mesh(nGeo, nMat);
    this.nextRing.frustumCulled = false;
    this.nextRing.renderOrder = 3;
    World.group.add(this.nextRing);
    this.nextUniform = nUni;
  },
  reset() {
    this.phase = 0;
    this.state = 'wait';
    this.cur = { x: 0, z: 0, r: CONFIG.ZONE_START_R };
    this.from = { x: 0, z: 0, r: CONFIG.ZONE_START_R };
    this.next = this.rollNext(this.cur, CONFIG.ZONE_PHASES[0].r);
    this.waitTotal = CONFIG.ZONE_PHASES[0].wait;
    this.shrinkTotal = CONFIG.ZONE_PHASES[0].shrink;
    this.timer = CONFIG.ZONE_PHASES[0].wait;
    if (!this.wall) this.build();
    this.sync();
  },

  /* damage per second of the active phase (ignores armour and shields) */
  dps() { return CONFIG.ZONE_PHASES[Math.min(this.phase, CONFIG.ZONE_PHASES.length - 1)].dps; },
  /* signed distance outside the circle (positive = taking damage) */
  outsideBy(x, z) { return dist2D(x, z, this.cur.x, this.cur.z) - this.cur.r; },
  isOutside(x, z) { return this.outsideBy(x, z) > 0; },

  update(dt) {
    if (this.state === 'idle' || this.state === 'final') { this.sync(); return; }
    this.timer -= dt;
    if (this.state === 'wait') {
      if (this.timer <= 0) {
        const p = CONFIG.ZONE_PHASES[this.phase];
        this.state = 'shrink';
        this.from = { x: this.cur.x, z: this.cur.z, r: this.cur.r };
        this.shrinkTotal = p.shrink;
        this.timer = p.shrink;
        SFX.play('zoneWarn');
        App.zoneWarn();
      }
    } else if (this.state === 'shrink') {
      const t = this.shrinkTotal > 0 ? 1 - clamp(this.timer / this.shrinkTotal, 0, 1) : 1;
      const e = smoothstep(clamp(t, 0, 1));
      this.cur.x = lerp(this.from.x, this.next.x, e);
      this.cur.z = lerp(this.from.z, this.next.z, e);
      this.cur.r = lerp(this.from.r, this.next.r, e);
      if (this.timer <= 0) {
        this.cur.x = this.next.x; this.cur.z = this.next.z; this.cur.r = this.next.r;
        this.phase++;
        if (this.phase >= CONFIG.ZONE_PHASES.length) {
          this.state = 'final';         // circle stops here, damage keeps ticking
        } else {
          const np = CONFIG.ZONE_PHASES[this.phase];
          this.next = this.rollNext(this.cur, np.r);
          this.waitTotal = np.wait;
          this.timer = np.wait;
          this.state = 'wait';
          App.onZonePhase(this.phase);
        }
      }
    }
    this.sync();
  },

  /* keep the wall meshes glued to the current / next circle */
  sync() {
    const h = CONFIG.ZONE_WALL_H;
    if (this.wall) {
      this.wall.position.set(this.cur.x, World.heightAt(this.cur.x, this.cur.z) - 14, this.cur.z);
      this.wall.scale.set(this.cur.r, h * 2.4, this.cur.r);
    }
    if (this.nextRing) {
      const show = (this.state === 'wait' || this.state === 'shrink');
      this.nextRing.visible = show;
      if (show) {
        this.nextRing.position.set(this.next.x, World.heightAt(this.next.x, this.next.z) - 8, this.next.z);
        this.nextRing.scale.set(this.next.r, 46, this.next.r);
      }
    }
  },
  tickUniforms(t) {
    if (this.uniform) this.uniform.uTime.value = t;
    if (this.nextUniform) this.nextUniform.uTime.value = t * 0.6;
  },
  timeLeft() { return Math.max(0, this.timer); },
  total() { return this.state === 'shrink' ? this.shrinkTotal : this.waitTotal; }

};

/* =====================================================================
   PLAYER - camera, inventory, consumables, movement and gunplay.
   ===================================================================== */
const CAM = {
  pos: new THREE.Vector3(0, 6, 0),
  yaw: 0, pitch: 0, fov: CONFIG.FOV_BASE,
  camera: null,
  dir: new THREE.Vector3(0, 0, -1),
  right: new THREE.Vector3(1, 0, 0),
  sync() {
    /* yaw is a compass heading: 0 = north (-Z), +90 deg = east (+X) */
    const cp = Math.cos(this.pitch);
    this.dir.set(Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp);
    this.right.set(Math.cos(this.yaw), 0, Math.sin(this.yaw));
  }
};

const Player = {
  isPlayer: true, alive: false, name: 'YOU',
  pos: new THREE.Vector3(), vel: new THREE.Vector3(),
  hp: CONFIG.MAX_HP, shield: 0, helmetTier: 0, vestTier: 0,
  weapons: [null, null, null, null, null],   // each slot is {id, mag} or null
  curSlot: 0,
  ammoReserve: { light: 0, medium: 0, heavy: 0, shells: 0, rockets: 0 },
  inv: { bandage: 0, medkit: 0, shield: 0, nade: 0 },
  grounded: false, crouching: false, sprinting: false, stamina: CONFIG.STAMINA_MAX,
  ads: false, adsT: 0, inWater: false, waterDepth: 0,
  recoilPitch: 0, recoilYaw: 0, recoilKick: 0, spreadExtra: 0,
  reloadT: 0, reloadTotal: 0, nextShotT: 0, burstLeft: 0, burstT: 0,
  using: null, headBob: 0, stepT: 0, lastDamageTime: -99, lastDamageFrom: null,
  kills: 0, damageDealt: 0, shotsFired: 0, shotsHit: 0, survived: 0, killedBy: null,
  airborne: false, gliderOpen: false, dropVelocity: 0, spawnY: 0,
  swapT: 0, wasSprinting: false, lastY: 0,
  yaw: 0,                  // where the character model is facing (follows CAM.yaw)
  camReach: CONFIG.CAM_DIST,   // smoothed third-person camera distance
  /* ---------- inventory ---------- */
  currentWeapon() { return this.weapons[this.curSlot]; },
  wdef() { const w = this.currentWeapon(); return w ? CONFIG.WEAPONS[w.id] : null; },
  armorFactor() { return Hit.armorMul(this); },
  hasAmmoType(t) {
    for (let i = 0; i < this.weapons.length; i++) {
      const w = this.weapons[i];
      if (w && CONFIG.WEAPONS[w.id].ammo === t) return true;
    }
    return false;
  },
  totalAmmoFor(t) { return this.ammoReserve[t] | 0; },
  addAmmo(type, count) {
    const lim = CONFIG.AMMO_LIMIT[type];
    const cur = this.ammoReserve[type] | 0;
    if (cur >= lim) return 0;
    const add = Math.min(count, lim - cur);
    this.ammoReserve[type] = cur + add;
    return add;
  },
  takeAmmo(type, count, silent) {
    if (!silent && !this.hasAmmoType(type) && (this.ammoReserve[type] | 0) >= CONFIG.AMMO_LIMIT[type]) return false;
    return this.addAmmo(type, count) > 0;
  },
  addWeapon(id, mag) {
    const w = CONFIG.WEAPONS[id];
    let slot = -1;
    for (let i = 0; i < this.weapons.length; i++) if (!this.weapons[i]) { slot = i; break; }
    let text = w.name + ' EQUIPPED';
    if (slot < 0) {
      /* every slot full: the current slot's gun goes back on the floor */
      const old = this.weapons[this.curSlot];
      if (old) {
        const a = RNG.range(0, 6.28);
        Loot.spawn({ kind: 'weapon', w: old.id }, this.pos.x + Math.cos(a), this.pos.y + 0.3, this.pos.z + Math.sin(a));
        text = 'SWAPPED: ' + w.name;
      }
      slot = this.curSlot;
    }
    this.weapons[slot] = { id: id, mag: mag === undefined ? w.mag : mag };
    this.curSlot = slot;
    this.reloadT = 0;
    this.swapT = 0.25;
    this.addAmmo(w.ammo, CONFIG.AMMO_PICKUP[w.ammo] * 2);
    return { text: text, rarity: w.tier, sound: 'pickup' };
  },
  /* returns {text, rarity, sound} when taken, false when it cannot be carried */
  takeItem(item) {
    if (!item) return false;
    if (item.kind === 'weapon') return this.addWeapon(item.w);
    if (item.kind === 'ammo') {
      const added = this.addAmmo(item.ammo, item.count);
      if (added <= 0) return false;
      return { text: '+' + added + ' ' + AMMO_LABEL[item.ammo], rarity: 0, sound: 'pickup' };
    }
    if (item.kind === 'bandage') {
      if (this.inv.bandage >= CONFIG.MAX_BANDAGES) return false;
      this.inv.bandage++;
      return { text: 'BANDAGE x' + this.inv.bandage, rarity: 0, sound: 'pickup' };
    }
    if (item.kind === 'medkit') {
      if (this.inv.medkit >= CONFIG.MAX_MEDKITS) return false;
      this.inv.medkit++;
      return { text: 'MEDKIT x' + this.inv.medkit, rarity: 1, sound: 'pickup' };
    }
    if (item.kind === 'shield') {
      if (this.inv.shield >= CONFIG.MAX_SHIELD_POTIONS) return false;
      this.inv.shield++;
      return { text: 'SHIELD POTION x' + this.inv.shield, rarity: 2, sound: 'pickup' };
    }
    if (item.kind === 'nade') {
      if (this.inv.nade >= CONFIG.MAX_GRENADES) return false;
      this.inv.nade++;
      return { text: 'FRAG GRENADE x' + this.inv.nade, rarity: 1, sound: 'pickup' };
    }
    if (item.kind === 'helmet' || item.kind === 'vest') {
      const t = clamp(item.tier | 0, 1, 3);
      if (item.kind === 'helmet') {
        if (t <= this.helmetTier) return false;
        this.helmetTier = t;
        return { text: ARMOR_NAMES[t] + ' HELMET ON', rarity: t, sound: 'shield' };
      }
      if (t <= this.vestTier) return false;
      this.vestTier = t;
      return { text: ARMOR_NAMES[t] + ' VEST ON', rarity: t, sound: 'shield' };
    }
    return false;
  },
  /* ---------- consumables ---------- */
  startUse(kind) {
    if (this.using || !this.alive) return false;
    if (kind === 'bandage' && (!this.inv.bandage || this.hp >= CONFIG.MAX_HP)) { SFX.play('deny'); return false; }
    if (kind === 'medkit' && (!this.inv.medkit || this.hp >= CONFIG.MAX_HP)) { SFX.play('deny'); return false; }
    if (kind === 'shield' && (!this.inv.shield || this.shield >= CONFIG.MAX_SHIELD)) { SFX.play('deny'); return false; }
    const total = kind === 'medkit' ? CONFIG.MEDKIT_TIME : (kind === 'bandage' ? CONFIG.BANDAGE_TIME : CONFIG.SHIELD_TIME);
    this.using = { kind: kind, t: 0, total: total };
    SFX.play(kind === 'shield' ? 'shield' : 'heal');
    return true;
  },
  cancelUse(silent) {
    if (!this.using) return;
    this.using = null;
    if (!silent) { SFX.play('deny'); UI.pickupToast('HEAL CANCELLED', 1); }
  },
  finishUse() {
    const kind = this.using.kind;
    this.using = null;
    if (kind === 'bandage') {
      this.inv.bandage--;
      this.hp = Math.min(CONFIG.MAX_HP, this.hp + CONFIG.BANDAGE_HEAL);
    } else if (kind === 'medkit') {
      this.inv.medkit--;
      this.hp = Math.min(CONFIG.MAX_HP, this.hp + CONFIG.MEDKIT_HEAL);
    } else if (kind === 'shield') {
      this.inv.shield--;
      this.shield = Math.min(CONFIG.MAX_SHIELD, this.shield + CONFIG.SHIELD_POTION);
      SFX.play('shield');
    }
    SFX.play('reloadDone', { gain: 0.5 });
  },
  cycleSlot(dir) {
    for (let i = 1; i <= this.weapons.length; i++) {
      const idx = (this.curSlot + i * dir + this.weapons.length * 2) % this.weapons.length;
      if (this.weapons[idx]) {
        if (idx !== this.curSlot) {
          this.curSlot = idx;
          this.reloadT = 0;
          this.swapT = 0.25;
          SFX.play('reload2', { gain: 0.45 });
        }
        return;
      }
    }
  },

  /* ---------- shooting ---------- */
  shotInterval() {
    const w = this.wdef();
    if (!w) return 0.4;
    return 60 / w.rpm;
  },
  /* effective spread in degrees right now */
  currentSpread() {
    const w = this.wdef();
    if (!w) return 0;
    const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.z * this.vel.z);
    let s = this.ads ? w.adsSpread : w.spread;
    if (!this.ads) s += clamp(speed / CONFIG.SPEED_WALK, 0, 1.4) * w.moveSpread * 0.7;
    if (this.crouching) s *= 0.72;
    s += this.spreadExtra;
    return s;
  },
  reload() {
    const slot = this.currentWeapon(), w = this.wdef();
    if (!slot || !w || this.reloadT > 0 || !this.alive) return;
    if (slot.mag >= w.mag) return;
    if ((this.ammoReserve[w.ammo] | 0) <= 0) { SFX.play('deny'); return; }
    this.reloadT = w.reload;
    this.reloadTotal = w.reload;
    this.cancelUse(true);
    SFX.play('reload1');
  },
  finishReload() {
    const slot = this.currentWeapon(), w = this.wdef();
    this.reloadT = 0;
    if (!slot || !w) return;
    const need = w.mag - slot.mag;
    const have = this.ammoReserve[w.ammo] | 0;
    const take = Math.min(need, have);
    slot.mag += take;
    this.ammoReserve[w.ammo] = have - take;
    SFX.play('reloadDone', { gain: 0.6 });
  },
  /* one trigger pull (autos keep calling this while held) */
  fire() {
    if (!this.alive || this.using) return;
    const slot = this.currentWeapon(), w = this.wdef();
    if (!w) return this.melee();
    if (this.reloadT > 0 || this.nextShotT > 0) return;
    if (slot.mag <= 0) { this.reload(); return; }
    this.nextShotT = this.shotInterval();
    if (w.burst) { this.burstLeft = w.burst; this.burstT = 0; }
    this.shootOne();
  },
  shootOne() {
    const slot = this.currentWeapon(), w = this.wdef();
    if (!slot || !w || slot.mag <= 0) return;
    slot.mag--;
    this.shotsFired++;
    this.nextShotT = this.shotInterval();
    const spread = this.currentSpread();
    const maxDist = Math.max(w.falloffEnd, 120);

    /* In third person the camera sits behind the player, so the shot has to be
       fired from the character's muzzle toward the point the crosshair is on.
       Otherwise you would shoot your own cover whenever the camera had a clear
       line but the barrel did not, and the tracer would start behind you. */
    const camHit = Hit.hitscan(CAM.pos.x, CAM.pos.y, CAM.pos.z,
                               CAM.dir.x, CAM.dir.y, CAM.dir.z, maxDist, Player);
    const aimX = CAM.pos.x + CAM.dir.x * camHit.t;
    const aimY = CAM.pos.y + CAM.dir.y * camHit.t;
    const aimZ = CAM.pos.z + CAM.dir.z * camHit.t;

    /* muzzle: the tip of the gun in the character's hands */
    const fwdX = Math.sin(this.yaw), fwdZ = -Math.cos(this.yaw);
    const rgtX = Math.cos(this.yaw), rgtZ = Math.sin(this.yaw);
    const mx = this.pos.x + fwdX * 0.95 + rgtX * 0.22;
    const my = this.pos.y + (this.crouching ? 0.82 : 0.99);
    const mz = this.pos.z + fwdZ * 0.95 + rgtZ * 0.22;
    FX.muzzle(mx, my, mz, CAM.dir.x, CAM.dir.y, CAM.dir.z);
    SFX.play(w.sound, { gain: w.tier >= 3 ? 0.95 : 0.8 });
    FX.addShake(w.shake);

    /* if the aim point ended up behind the barrel (camera inside geometry),
       fall back to shooting straight down the crosshair */
    let dx = aimX - mx, dy = aimY - my, dz = aimZ - mz;
    if (dx * CAM.dir.x + dy * CAM.dir.y + dz * CAM.dir.z <= 0) {
      dx = CAM.dir.x; dy = CAM.dir.y; dz = CAM.dir.z;
    }

    const pellets = w.pellets || 1;
    for (let p = 0; p < pellets; p++) {
      spreadDirection(_shotDir, dx, dy, dz, spread);
      const hit = Hit.hitscan(mx, my, mz, _shotDir.x, _shotDir.y, _shotDir.z, maxDist, Player);
      const ex = mx + _shotDir.x * hit.t, ey = my + _shotDir.y * hit.t, ez = mz + _shotDir.z * hit.t;
      if (w.projectile === 'rocket') {
        Projectiles.throwIt('rocket', mx, my, mz, _shotDir.x * 44, _shotDir.y * 44 + 1, _shotDir.z * 44, Player, w.name);
        break;
      }
      FX.tracer(mx, my, mz, ex, ey, ez, 1, 0.86, 0.5, 0.06);
      if (hit.bot) {
        const dmg = falloffDamage(w, hit.t) * (hit.head ? w.hs : 1);
        Hit.damage(hit.bot, dmg, { head: hit.head, attacker: Player, weapon: w.name });
        this.shotsHit++;
        FX.impact(ex, ey, ez, -_shotDir.x, -_shotDir.y, -_shotDir.z, 'flesh');
        SFX.play(hit.head ? 'hitHead' : 'hitFlesh', { gain: 0.55 });
        FX.hitMarker(hit.head ? 'head' : 'hit');
        FX.damageNumber(ex, ey + 0.35, ez, Math.round(dmg), hit.head ? 'head' : '');
      } else {
        FX.impact(ex, ey, ez, -_shotDir.x, -_shotDir.y, -_shotDir.z, 'wall');
        SFX.play('hitWall', { gain: 0.35 });
      }
    }
    /* recoil + bloom */
    const adsMul = this.ads ? 0.62 : 1;
    this.recoilPitch += w.recoil * 0.0075 * adsMul;
    this.recoilYaw += (Math.random() - 0.5) * w.recoil * 0.004 * adsMul;
    this.spreadExtra = Math.min(w.spreadMax, this.spreadExtra + w.spreadPerShot * (this.ads ? 0.6 : 1));
    this.recoilKick = Math.min(0.16, this.recoilKick + w.recoil * 0.008);
  },
  /* no gun in hand: a weak melee swing so the drop phase is never helpless */
  melee() {
    if (this.nextShotT > 0) return;
    this.nextShotT = 0.7;
    const hit = Hit.hitscan(CAM.pos.x, CAM.pos.y, CAM.pos.z, CAM.dir.x, CAM.dir.y, CAM.dir.z, 2.4, Player);
    if (hit.bot) {
      Hit.damage(hit.bot, 20, { attacker: Player, weapon: 'Fists' });
      FX.hitMarker('hit');
      SFX.play('hitFlesh', { gain: 0.6 });
      FX.impact(hit.x, hit.y, hit.z, -CAM.dir.x, -CAM.dir.y, -CAM.dir.z, 'flesh');
    } else {
      SFX.play('step', { gain: 0.4 });
    }
  },
  throwGrenade() {
    if (!this.alive || this.inv.nade <= 0 || this.using) { SFX.play('deny'); return; }
    this.inv.nade--;
    const ox = CAM.pos.x + CAM.dir.x * 0.6;
    const oy = CAM.pos.y + CAM.dir.y * 0.6;
    const oz = CAM.pos.z + CAM.dir.z * 0.6;
    /* Throw on an arc that lands on whatever the crosshair is on, so a frag
       goes where you are looking instead of sailing over everything. */
    const hit = Hit.hitscan(CAM.pos.x, CAM.pos.y, CAM.pos.z, CAM.dir.x, CAM.dir.y, CAM.dir.z, 45, Player);
    const d = clamp(hit.t, 2.5, 45);
    const tx = CAM.pos.x + CAM.dir.x * d;
    const ty = CAM.pos.y + CAM.dir.y * d;
    const tz = CAM.pos.z + CAM.dir.z * d;
    const speed = CONFIG.GRENADE_SPEED * 0.55;       // a lob, not a fastball
    const dx = tx - ox, dz = tz - oz;
    const flat = Math.sqrt(dx * dx + dz * dz);
    const flight = Math.max(0.25, flat / speed);
    const g = CONFIG.GRAVITY * 0.62;                 // the projectile gravity factor
    const vy = (ty - oy) / flight + 0.5 * g * flight;
    Projectiles.throwIt('frag', ox, oy, oz, dx / flight, vy, dz / flight, Player, 'Frag Grenade');
    SFX.play('reload2', { gain: 0.5 });
    UI.pickupToast('GRENADE OUT (' + this.inv.nade + ')', 1);
  },
  /* ---------- life cycle ---------- */
  reset(x, z, y) {
    this.alive = true;
    this.pos.set(x, y, z);
    this.vel.set(0, 0, 0);
    this.hp = CONFIG.MAX_HP;
    this.shield = 0;
    this.helmetTier = 0;
    this.vestTier = 0;
    this.weapons = [null, null, null, null, null];
    this.curSlot = 0;
    this.ammoReserve = { light: 0, medium: 0, heavy: 0, shells: 0, rockets: 0 };
    this.inv = { bandage: 0, medkit: 0, shield: 0, nade: 0 };
    this.stamina = CONFIG.STAMINA_MAX;
    this.grounded = false; this.crouching = false; this.sprinting = false;
    this.ads = false; this.adsT = 0; this.inWater = false; this.waterDepth = 0;
    this.recoilPitch = 0; this.recoilYaw = 0; this.recoilKick = 0; this.spreadExtra = 0;
    this.reloadT = 0; this.nextShotT = 0; this.burstLeft = 0; this.burstT = 0;
    this.using = null; this.headBob = 0; this.stepT = 0; this.swapT = 0;
    this.lastDamageTime = -99; this.lastDamageFrom = null;
    this.kills = 0; this.damageDealt = 0; this.shotsFired = 0; this.shotsHit = 0;
    this.survived = 0; this.killedBy = null; this.placement = 0;
    this.airborne = false; this.gliderOpen = false;
    this.yaw = 0;
    this.camReach = CONFIG.CAM_DIST;
  },
  /* start the match in the sky, facing the middle of the island */
  beginDrop() {
    const a = RNG.range(0, Math.PI * 2), r = RNG.range(300, 450);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    this.pos.set(x, CONFIG.DROP_ALTITUDE, z);
    this.vel.set(0, 0, 0);
    this.airborne = true;
    this.gliderOpen = false;
    CAM.yaw = Math.atan2(-x, z);
    CAM.pitch = -0.32;
    this.yaw = CAM.yaw;          // face the island from the first frame
    CAM.sync();
  },
  /* skydive then glider: WASD steers, Space deploys the canopy early */
  updateDrop(dt) {
    const fwdX = Math.sin(CAM.yaw), fwdZ = -Math.cos(CAM.yaw);
    const rgtX = Math.cos(CAM.yaw), rgtZ = Math.sin(CAM.yaw);
    let dx = rgtX * Input.moveX + fwdX * Input.moveZ;
    let dz = rgtZ * Input.moveX + fwdZ * Input.moveZ;
    const len = Math.hypot(dx, dz);
    if (len > 1) { dx /= len; dz /= len; }
    else if (len < 0.08) {
      /* idle hands: drift gently toward the island so an untouched skydive
         still ends on land instead of in the sea */
      const cx = -this.pos.x, cz = -this.pos.z;
      const cl = Math.hypot(cx, cz) || 1;
      dx = cx / cl * 0.6;
      dz = cz / cl * 0.6;
    }
    if (Input.jumpQueued && !this.gliderOpen) {
      this.gliderOpen = true;
      Input.jumpQueued = false;
      SFX.play('jump', { gain: 0.7 });
    }
    if (!this.gliderOpen) {
      this.pos.y -= CONFIG.DROP_FALL_SPEED * dt;
      this.pos.x += dx * 34 * dt;
      this.pos.z += dz * 34 * dt;
      if (this.pos.y < CONFIG.GLIDER_AUTO_ALT) this.gliderOpen = true;
    } else {
      this.pos.y -= CONFIG.GLIDER_FALL_SPEED * dt;
      this.pos.x += dx * CONFIG.GLIDER_SPEED * dt;
      this.pos.z += dz * CONFIG.GLIDER_SPEED * dt;
    }
    this.pos.x = clamp(this.pos.x, -430, 430);
    this.pos.z = clamp(this.pos.z, -430, 430);
    /* the sea surface is a landing plane as well: a player who drifts out over
       the water - or never touches the controls at all - still has to touch
       down, otherwise the DROP phase would never hand over to the live match */
    const g = World.groundAt(this.pos.x, this.pos.z, this.pos.y + 1.2);
    const landing = Math.max(g, CONFIG.SEA_LEVEL + 0.02);
    if (this.pos.y <= landing + 0.05) {
      this.pos.y = landing;
      this.airborne = false;
      this.gliderOpen = false;
      this.grounded = true;
      this.vel.set(0, 0, 0);
      SFX.play('land', { gain: 0.9 });
      FX.impact(this.pos.x, landing + 0.1, this.pos.z, 0, 1, 0, 'wall');
      return true;
    }
    this.pos.y = Math.max(this.pos.y, CONFIG.SEA_LEVEL + 0.6);
    return false;
  },
  /* ---------- per-frame ---------- */
  update(dt) {
    if (!this.alive) return;
    this.survived += dt;
    if (this.nextShotT > 0) this.nextShotT -= dt;
    if (this.swapT > 0) this.swapT -= dt;
    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) this.finishReload();
    }
    if (this.using) {
      this.using.t += dt;
      if (this.using.t >= this.using.total) this.finishUse();
    }
    this.spreadExtra = Math.max(0, this.spreadExtra - dt * 6);
    const rk = Math.exp(-CONFIG.RECOIL_RECOVER * dt);
    this.recoilPitch *= rk;
    this.recoilYaw *= rk;
    this.recoilKick *= rk;

    if (this.airborne) {
      const landed = this.updateDrop(dt);
      if (!landed) { this.updateCamera(dt); return; }
    }

    /* burst continuation + full-auto fire */
    if (this.burstLeft > 0) {
      this.burstT -= dt;
      if (this.burstT <= 0) {
        this.burstLeft--;
        const bw = this.wdef();
        this.shootOne();
        this.burstT = (bw && bw.burstDelay) ? bw.burstDelay : 0.12;
      }
    } else if (Input.firing) {
      const aw = this.wdef();
      if (aw && aw.auto) this.fire();
    }

    /* aim down sights */
    const wantAds = Input.ads && !this.using && !!this.wdef() && !this.sprinting;
    this.ads = wantAds;
    this.adsT = lerp(this.adsT, wantAds ? 1 : 0, 1 - Math.exp(-14 * dt));

    /* wish direction in world space */
    const fwdX = Math.sin(CAM.yaw), fwdZ = -Math.cos(CAM.yaw);
    const rgtX = Math.cos(CAM.yaw), rgtZ = Math.sin(CAM.yaw);
    let dx = rgtX * Input.moveX + fwdX * Input.moveZ;
    let dz = rgtZ * Input.moveX + fwdZ * Input.moveZ;
    const len = Math.hypot(dx, dz);
    if (len > 1) { dx /= len; dz /= len; }
    const moving = len > 0.08;

    this.crouching = Input.crouch && this.grounded;
    const wantSprint = Input.sprint && Input.moveZ > 0.35 && !this.crouching && !this.ads &&
                       this.stamina > CONFIG.STAMINA_MIN_SPRINT && !this.using && this.grounded;
    this.sprinting = wantSprint;
    if (wantSprint) this.stamina = Math.max(0, this.stamina - CONFIG.STAMINA_DRAIN * dt);
    else {
      this.stamina = Math.min(CONFIG.STAMINA_MAX,
        this.stamina + CONFIG.STAMINA_REGEN * dt * (this.grounded ? 1 : 0.35));
    }

    /* speed selection */
    let speed = this.ads ? CONFIG.SPEED_ADS
      : (this.crouching ? CONFIG.SPEED_CROUCH : (this.sprinting ? CONFIG.SPEED_SPRINT : CONFIG.SPEED_WALK));
    if (this.using) speed *= 0.55;
    /* wading slows you down, swimming slows you a lot */
    if (this.waterDepth > CONFIG.WATER_WADE_DEPTH * 1.6) speed = Math.min(speed, CONFIG.SPEED_WATER);
    else if (this.waterDepth > CONFIG.WATER_WADE_DEPTH * 0.6) speed = Math.min(speed, CONFIG.SPEED_WALK * 0.8);

    /* accelerate toward the target velocity */
    const accel = this.grounded ? CONFIG.ACCEL_GROUND : CONFIG.ACCEL_AIR;
    const k = 1 - Math.exp(-accel * 0.16 * dt);
    if (moving) {
      this.vel.x += (dx * speed - this.vel.x) * k;
      this.vel.z += (dz * speed - this.vel.z) * k;
    } else if (this.grounded) {
      const f = Math.exp(-CONFIG.FRICTION * dt);
      this.vel.x *= f;
      this.vel.z *= f;
    }

    /* jump + gravity */
    if (this.grounded && Input.jumpQueued) {
      this.vel.y = CONFIG.JUMP_VEL;
      this.grounded = false;
      Input.jumpQueued = false;
      SFX.play('jump');
    }
    this.vel.y -= CONFIG.GRAVITY * dt;
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.pos.y += this.vel.y * dt;

    /* collide with the world, then snap to the ground */
    const headY = this.pos.y + (this.crouching ? 1.25 : 1.8);
    World.resolve(this.pos, CONFIG.PLAYER_RADIUS, this.pos.y, headY);
    let g = World.groundAt(this.pos.x, this.pos.z, this.pos.y + 0.65);
    /* deep water keeps you afloat on the surface instead of the sea bed */
    if (World.waterDepth(this.pos.x, this.pos.z) > 1.4) {
      g = Math.max(g, CONFIG.SEA_LEVEL - 0.35);
    }
    if (this.pos.y <= g) {
      const impact = -this.vel.y;
      if (!this.grounded && impact > 3) {
        SFX.play('land', { gain: clamp(impact / 22, 0.25, 1) });
        if (impact > CONFIG.FALL_DAMAGE_MIN_VEL) {
          Hit.damage(this, (impact - CONFIG.FALL_DAMAGE_MIN_VEL) * 3.4,
                     { weapon: 'the fall', ignoresArmor: true, ignoresShield: true, silent: true });
        }
      }
      this.pos.y = g;
      this.vel.y = 0;
      this.grounded = true;
    } else {
      this.grounded = (this.pos.y - g) < 0.08;
    }

    /* water + footsteps */
    this.waterDepth = World.waterDepth(this.pos.x, this.pos.z);
    this.inWater = this.waterDepth > 0.35;
    const hspeed = Math.hypot(this.vel.x, this.vel.z);
    if (this.grounded && hspeed > 0.7) {
      this.stepT -= dt * hspeed;
      if (this.stepT <= 0) {
        this.stepT = 2.8;
        SFX.play(this.inWater ? 'stepWater' : 'step', { gain: clamp(hspeed / CONFIG.SPEED_SPRINT, 0.3, 0.95) });
      }
      this.headBob += dt * hspeed * 2.2;
    } else {
      this.headBob += dt * 0.5;
    }

    /* the storm bites through armour and shields */
    if (Zone.isOutside(this.pos.x, this.pos.z)) {
      Hit.damage(this, Zone.dps() * dt, {
        weapon: 'the storm', ignoresArmor: true, ignoresShield: true, silent: true
      });
    }
    this.updateCamera(dt);
  },

  /* ---------- third-person camera ----------
     The camera orbits a pivot at the player's chest: it sits behind and a little
     above, swings around as the mouse moves, and is pulled in when a wall, tree
     or the terrain gets between the pivot and the wanted position. The character
     always turns to face wherever the camera is aiming. */
  updateCamera(dt) {
    /* yaw is owned by the mouse; the *character* turns toward it smoothly */
    this.yaw = angLerp(this.yaw, CAM.yaw, 1 - Math.exp(-CONFIG.MOVE_FACE_LAG * dt));
    CAM.pitch = clamp(CAM.pitch, CONFIG.CAM_PITCH_MIN, CONFIG.CAM_PITCH_MAX);
    CAM.sync();

    const hspeed = Math.hypot(this.vel.x, this.vel.z);
    const amp = this.grounded ? clamp(hspeed / CONFIG.SPEED_SPRINT, 0, 1) * CONFIG.BOB_AMOUNT : 0;
    const bob = Math.sin(this.headBob * 6) * amp;

    /* the point the camera looks at, and orbits around */
    const pivotH = this.crouching ? CONFIG.CAM_PIVOT_CROUCH
                 : (this.airborne ? CONFIG.CAM_PIVOT + 0.35 : CONFIG.CAM_PIVOT);
    const px = this.pos.x, py = this.pos.y + pivotH + bob * 0.5, pz = this.pos.z;

    const w = this.wdef();
    const scoped = !!(this.ads && w && w.scope);
    let reach = scoped ? CONFIG.CAM_DIST_SCOPE
              : (this.ads ? CONFIG.CAM_DIST_ADS
              : (this.airborne ? CONFIG.CAM_DIST * 1.45 : CONFIG.CAM_DIST));
    const shoulder = this.ads ? CONFIG.CAM_SHOULDER_ADS : CONFIG.CAM_SHOULDER;

    /* wanted direction: backwards along the aim, nudged toward the right shoulder */
    let dx = -CAM.dir.x * reach + CAM.right.x * shoulder;
    let dy = -CAM.dir.y * reach;
    let dz = -CAM.dir.z * reach + CAM.right.z * shoulder;
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
    dx /= len; dy /= len; dz /= len;
    const want = scoped ? reach
               : Math.sqrt(Math.pow(dx * reach, 2) + Math.pow(dy * reach, 2) + Math.pow(dz * reach, 2));

    /* camera collision: pull in along that ray if something solid is in the way */
    let allowed = len;
    const hit = World.raycast(px, py, pz, dx, dy, dz, len);
    if (hit.t >= 0) allowed = Math.max(CONFIG.CAM_MIN_DIST, hit.t - CONFIG.CAM_COLLIDE_PAD);

    /* ease outward, snap inward - never let the smoothing push us into a wall */
    const k = 1 - Math.exp(-CONFIG.CAM_LAG * dt);
    this.camReach = lerp(this.camReach === undefined ? want : this.camReach, want, k);
    if (this.camReach > allowed) this.camReach = allowed;

    CAM.pos.set(px + dx * this.camReach, py + dy * this.camReach, pz + dz * this.camReach);
    /* and keep it out of the ground */
    const floor = World.groundAt(CAM.pos.x, CAM.pos.z, CAM.pos.y) + CONFIG.CAM_GROUND_CLEAR;
    if (CAM.pos.y < floor) CAM.pos.y = floor;
  },



};

/* =====================================================================
   PLAYER MODEL - the third-person character. A low-poly humanoid built from
   primitives (capsule torso, sphere head, box arms/legs), the weapon it is
   holding, a parachute while gliding, and a simple walk cycle / crouch squash
   / recoil kick so the pose always reads on screen.
   Local space: feet on y = 0, forward = +Z, so the group's yaw is
   `Math.PI - player.yaw` exactly like BotView (yaw 0 = -Z in world space).
   ===================================================================== */
const PlayerView = (function () {
  const geoCache = {};
  let group = null, gun = null, chute = null;
  let torso = null, head = null, armL = null, armR = null, legL = null, legR = null;
  const tint = new THREE.Color();
  let walkPhase = 0, kick = 0, lean = 0;

  /* palette: the player is teal-trimmed so it never reads as a bot */
  const CLOTH_C = 0x2f5b68, TRIM_C = 0x63d6f2, SKIN_C = 0xe3b48d, BOOT_C = 0x27343a;

  /* the held gun: a few boxes merged into one geometry per weapon */
  function heldGunGeo(w) {
    const L = Math.min(1.25, 0.55 + w.len * 0.5);
    const parts = [
      boxGeo(0.09, 0.12, L, 0, 0, 0, 0),
      boxGeo(0.06, 0.06, L * 0.7, 0, 0.02, L * 0.62, 0),
      boxGeo(0.07, 0.26, 0.12, 0, -0.17, -L * 0.06, 0),
      boxGeo(0.06, 0.2, 0.1, 0, -0.14, -L * 0.36, 0)
    ];
    if (w.tier >= 3) parts.push(boxGeo(0.05, 0.07, L * 0.36, 0, 0.12, -L * 0.05, 0));
    if (w.mag >= 30) parts.push(boxGeo(0.09, 0.24, 0.16, 0, -0.15, -L * 0.16, 0));
    const geo = mergeGeoms(parts);
    for (let i = 0; i < parts.length; i++) parts[i].dispose();
    return geo;
  }

  /* one box limb hinged at its top so rotation.x swings it like a joint */
  function limb(w, h, d, hex, jointY, x, z) {
    const geo = new THREE.BoxGeometry(w, h, d);
    geo.translate(0, -h / 2, 0);
    const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: hex }));
    m.position.set(x, jointY, z);
    return m;
  }

  return {
    /* builds the character and parks it in the scene (it is not parented to
       the camera any more, so the player can actually see themselves) */
    init(scene) {
      group = new THREE.Group();
      const cast = !!World.quality.shadows;

      /* torso: a capsule whose chest lines up with the +0.62 hit sphere */
      const torsoGeo = new THREE.CapsuleGeometry(0.30, 0.50, 4, 10);
      torso = new THREE.Mesh(torsoGeo, new THREE.MeshLambertMaterial({ color: CLOTH_C }));
      torso.position.set(0, 0.70, 0);

      /* head: sits on the +1.34 head sphere so shots land where they look */
      head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8),
                            new THREE.MeshLambertMaterial({ color: SKIN_C }));
      head.position.set(0, 1.34, 0);

      /* a bright trim strip across the chest so you can spot yourself */
      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.34),
                                  new THREE.MeshLambertMaterial({ color: TRIM_C }));
      trim.position.set(0, 1.05, 0.04);

      armL = limb(0.15, 0.50, 0.15, CLOTH_C, 1.16, -0.34, 0);
      armR = limb(0.15, 0.50, 0.15, CLOTH_C, 1.16, 0.34, 0);
      legL = limb(0.17, 0.54, 0.19, BOOT_C, 0.54, -0.13, 0);
      legR = limb(0.17, 0.54, 0.19, BOOT_C, 0.54, 0.13, 0);

      /* the gun is held in front, pointing along +Z (the model's forward) */
      gun = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.6),
                           new THREE.MeshLambertMaterial({ color: 0x3a4045 }));
      gun.position.set(0.24, 0.98, 0.42);
      gun.visible = false;

      chute = new THREE.Mesh(new THREE.ConeGeometry(1.7, 1.3, 8),
                             new THREE.MeshLambertMaterial({ color: 0xdde8ee, side: THREE.DoubleSide }));
      chute.position.set(0, 3.3, 0);
      chute.visible = false;

      group.add(torso, head, trim, armL, armR, legL, legR, gun, chute);
      group.traverse(function (o) { if (o.isMesh) { o.castShadow = cast; o.frustumCulled = false; } });
      group.visible = false;
      scene.add(group);
    },
    /* called with the equipped weapon id (null = empty handed) */
    setWeapon(id) {
      if (!gun) return;
      if (!id) { gun.visible = false; return; }
      if (!geoCache[id]) geoCache[id] = heldGunGeo(CONFIG.WEAPONS[id]);
      gun.geometry = geoCache[id];
      const w = CONFIG.WEAPONS[id];
      tint.set(CONFIG.RARITY_COLORS[w.tier]).lerp(new THREE.Color(0x23282c), 0.65);
      gun.material.color.copy(tint);
      gun.visible = true;
    },
    hide() { if (group) group.visible = false; },
    visible() { return !!(group && group.visible); },

    /* pose the character from the player state */
    update(dt, player) {
      if (!group) return;
      group.visible = true;

      /* world transform: position at the feet, yaw matching the aim (BotView's
         convention: the model's local forward is +Z, hence PI - yaw) */
      group.position.set(player.pos.x, player.pos.y, player.pos.z);
      group.rotation.y = Math.PI - player.yaw;

      /* walk cycle from the horizontal speed */
      const speed = Math.hypot(player.vel.x, player.vel.z);
      const moveAmt = clamp(speed / CONFIG.SPEED_SPRINT, 0, 1);
      walkPhase += dt * (2.5 + speed * 2.1);
      const swing = Math.sin(walkPhase) * (0.15 + moveAmt * 0.55);
      if (legL) { legL.rotation.x = swing; legR.rotation.x = -swing; }
      if (armL) { armL.rotation.x = -swing * 0.6; armR.rotation.x = swing * 0.6; }

      /* crouch squash (the group pivot is at the feet, so this reads right) */
      group.scale.set(1, player.crouching ? 0.78 : 1, 1);

      /* airborne: arms up, parachute out while the glider is open */
      if (player.airborne) {
        if (armL) armL.rotation.x = -2.3;
        if (armR) armR.rotation.x = -2.3;
        if (legL) legL.rotation.x = 0.5;
        if (legR) legR.rotation.x = -0.35;
        if (chute) chute.visible = !!player.gliderOpen;
      } else if (chute) {
        chute.visible = false;
      }

      /* aim lean: the torso leads the camera by a few degrees while turning */
      const lead = clamp(angDiff(CAM.yaw, player.yaw), -0.4, 0.4);
      lean = lerp(lean, lead, 1 - Math.exp(-8 * dt));
      if (torso) { torso.rotation.y = -lean * 0.5; head.rotation.y = -lean * 0.7; }

      /* recoil kick pushes the gun back into the shoulder */
      kick = lerp(kick, player.recoilKick, 1 - Math.exp(-18 * dt));
      if (gun) {
        gun.position.set(0.24 - player.adsT * 0.16, 0.98 + player.adsT * 0.05,
                         0.42 - player.adsT * 0.12 - kick * 0.5);
        gun.rotation.x = -kick * 2.2 + player.adsT * 0.04;
      }
      /* aiming raises the whole upper body slightly */
      if (torso) torso.position.y = 0.70 + player.adsT * 0.03;
      if (head) head.position.y = 1.34 + player.adsT * 0.03;
    }
  };
})();
/* =====================================================================
   INPUT - pointer lock mouse look, WASD movement and every action key.
   ===================================================================== */
const Input = {
  keys: Object.create(null),
  moveX: 0, moveZ: 0, firing: false, ads: false, sprint: false, crouch: false,
  jumpQueued: false, locked: false,
  bindings: {
    KeyW: 'fwd', KeyS: 'back', KeyA: 'left', KeyD: 'right',
    ArrowUp: 'fwd', ArrowDown: 'back', ArrowLeft: 'left', ArrowRight: 'right',
    ShiftLeft: 'sprint', ShiftRight: 'sprint', Space: 'jump',
    KeyC: 'crouch', ControlLeft: 'crouch', ControlRight: 'crouch'
  },
  init(canvas) {
    window.addEventListener('keydown', function (e) { Input.onKey(e, true); });
    window.addEventListener('keyup', function (e) { Input.onKey(e, false); });
    window.addEventListener('mousedown', function (e) { Input.onMouse(e, true); });
    window.addEventListener('mouseup', function (e) { Input.onMouse(e, false); });
    window.addEventListener('wheel', function (e) { Input.onWheel(e); }, { passive: false });
    document.addEventListener('mousemove', function (e) { Input.onMove(e); });
    document.addEventListener('pointerlockchange', function () {
      Input.locked = (document.pointerLockElement === canvas);
      App.onPointerLockChange(Input.locked);
    });
    window.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    window.addEventListener('blur', function () {
      Input.keys = Object.create(null);
      Input.updateAxes();
      Input.firing = false;
      Input.ads = false;
    });
  },
  requestLock() {
    const c = document.getElementById('gameCanvas');
    if (!c || !c.requestPointerLock) return;
    /* Chrome returns a promise that rejects when the lock is refused - most
       commonly during the short cooldown right after the player hits ESC.
       Swallow the rejection: the match stays playable with the mouse free. */
    const res = c.requestPointerLock();
    if (res && typeof res.catch === 'function') res.catch(function () {});
  },
  releaseLock() { if (document.exitPointerLock) document.exitPointerLock(); },
  updateAxes() {
    const k = this.keys;
    this.moveX = (k.right ? 1 : 0) - (k.left ? 1 : 0);
    this.moveZ = (k.fwd ? 1 : 0) - (k.back ? 1 : 0);
    this.sprint = !!k.sprint;
    this.crouch = !!k.crouch;
  },
  onKey(e, down) {
    const code = e.code;
    /* stop the browser doing its own thing with these */
    if (code === 'Tab' || code === 'F1' || code === 'Space' || code.indexOf('Arrow') === 0) {
      e.preventDefault();
    }
    if (code === 'Escape') {
      if (down && (App.state === 'PLAYING' || App.state === 'DROP')) App.pause();
      return;
    }
    const bind = this.bindings[code];
    if (bind) {
      if (bind === 'jump') {
        if (down && !this.keys.jump) this.jumpQueued = true;
        this.keys.jump = down;
      } else this.keys[bind] = down;
      this.updateAxes();
      return;
    }
    if (!down) return;
    switch (code) {
      case 'KeyR': if (Player.alive) Player.reload(); break;
      case 'KeyE': case 'KeyF': Loot.take(Loot.aimedItem); break;
      case 'KeyG': if (Player.alive) Player.throwGrenade(); break;
      case 'Digit1': case 'Digit2': case 'Digit3': case 'Digit4': case 'Digit5': {
        const slot = parseInt(code.slice(5), 10) - 1;
        if (Player.weapons[slot]) {
          Player.curSlot = slot;
          Player.reloadT = 0;
          Player.swapT = 0.25;
          PlayerView.setWeapon(Player.weapons[slot].id);
          SFX.play('reload2', { gain: 0.4 });
        } else SFX.play('deny', { gain: 0.4 });
        break;
      }
      case 'Digit6': Player.startUse('bandage'); break;
      case 'Digit7': Player.startUse('medkit'); break;
      case 'Digit8': Player.startUse('shield'); break;
      case 'KeyM': UI.toggleMap(); break;
      case 'Tab': UI.toggleScoreboard(); break;
      case 'F1': SETTINGS.showFps = !SETTINGS.showFps; break;
      default: break;
    }
  },
  onMouse(e, down) {
    if (App.state === 'SPECTATING') {
      if (down && e.button === 0) Game.spectateNext();
      return;
    }
    if (!this.locked) {
      if (down && e.button === 0 && (App.state === 'PLAYING' || App.state === 'DROP')) {
        this.requestLock();
      }
      return;
    }
    if (e.button === 0) {
      this.firing = down;
      /* Fire once on the trigger pull. Automatics keep going while the button
         is held (Player.update), but semi-autos, bursts, the shotgun, the
         sniper and the launcher only ever shoot here - without this a picked up
         pistol could not be fired at all. Player.fire() has the fire-rate gate,
         so holding the button on an automatic still cannot double-fire. */
      if (down && Player.alive) Player.fire();
    } else if (e.button === 2) this.ads = down;
  },
  onWheel(e) {
    e.preventDefault();
    if (!this.locked || !Player.alive) return;
    Player.cycleSlot(e.deltaY > 0 ? 1 : -1);
    const w = Player.currentWeapon();
    if (w) PlayerView.setWeapon(w.id);
  },
  onMove(e) {
    if (!this.locked) return;
    const s = SETTINGS.sensitivity;
    /* THE INVERTED-MOUSE LINE. CAM.yaw is a compass heading: 0 = north (-Z) and
       +90 deg = east (+X), which is also what CAM.dir/CAM.right are derived
       from (see CAM.sync). Screen-right therefore has to *increase* yaw, so the
       sign here must be +=. It used to be `-=`, which turned the view left when
       the mouse moved right. Vertical look was already correct and is untouched. */
    CAM.yaw += e.movementX * s;
    CAM.pitch = clamp(CAM.pitch - e.movementY * s, -1.45, 1.45);
    if (CAM.yaw > Math.PI) CAM.yaw -= Math.PI * 2;
    if (CAM.yaw < -Math.PI) CAM.yaw += Math.PI * 2;
  }
};


/* =====================================================================
   UI - in-game HUD, kill feed, compass, prompts, scoreboard.
   ===================================================================== */
const UI = (function () {
  const el = {};
  const feed = [];
  let toastTimer = 0, warnTimer = 0, outsideTimer = 0;
  let lastAlive = -1, lastKills = -1, lastDmg = -1, lastPhase = -1;
  const crossLines = {};

  const api = {
    init() {
      const ids = ['hud', 'hudBottom', 'aliveCount', 'killCount', 'dmgCount', 'zonePhase',
        'zoneTimer', 'zoneSub', 'zonePanel', 'killfeed', 'crosshair', 'hitmarker', 'pickupPrompt',
        'pickupName', 'hpBar', 'shBar', 'helmPip', 'vestPip', 'weaponName', 'weaponTier',
        'ammoLine', 'slotRow', 'consumRow', 'healBarWrap', 'healBarLabel', 'healBarFill',
        'zoneWarn', 'outsideWarn', 'lowHp', 'flash', 'dropPanel', 'altitude', 'spectatePanel',
        'specName', 'fpsBox', 'fullmapWrap', 'fullmap', 'mmCoord', 'minimap', 'compass',
        'scoreboard', 'sbTable', 'sbSub'];
      for (let i = 0; i < ids.length; i++) el[ids[i]] = document.getElementById(ids[i]);
      el.hpFill = el.hpBar.querySelector('i');
      el.hpVal = el.hpBar.querySelector('span');
      el.shFill = el.shBar.querySelector('i');
      el.shVal = el.shBar.querySelector('span');
      crossLines.t = el.crosshair.querySelector('.ch-t');
      crossLines.b = el.crosshair.querySelector('.ch-b');
      crossLines.l = el.crosshair.querySelector('.ch-l');
      crossLines.r = el.crosshair.querySelector('.ch-r');
      /* toast lane (built in JS so the markup stays lean) */
      const lane = document.createElement('div');
      lane.style.cssText = 'position:absolute;left:50%;bottom:24%;transform:translateX(-50%);' +
        'text-align:center;display:flex;flex-direction:column;gap:4px;align-items:center;';
      el.hud.appendChild(lane);
      el.toastLane = lane;
      for (let i = 0; i < 5; i++) {
        const d = document.createElement('div');
        d.className = 'slot';
        d.innerHTML = '<b>' + (i + 1) + '</b><span>-</span>';
        el.slotRow.appendChild(d);
      }
      el.slots = Array.prototype.slice.call(el.slotRow.children);
    },
    show(visible) {
      el.hud.classList.toggle('hidden', !visible);
      el.hudBottom.classList.toggle('hidden', !visible);
    },
    /* ---------------- kill feed ---------------- */
    /* wipe the feed so a restarted match never shows the previous one's kills */
    clearFeed() {
      for (let i = 0; i < feed.length; i++) {
        if (feed[i].el.parentNode) feed[i].el.parentNode.removeChild(feed[i].el);
      }
      feed.length = 0;
      if (el.killfeed) el.killfeed.innerHTML = '';
    },
    killFeed(killer, victim, weapon, headshot, mine) {
      const d = document.createElement('div');
      d.className = 'kf' + (mine ? ' mine' : '');
      d.innerHTML = '<b>' + killer + '</b> <span class="ar">&#9656;</span> <span class="w">' +
        weapon + (headshot ? ' <span class="hs">HS</span>' : '') +
        '</span> <span class="ar">&#9656;</span> <b>' + victim + '</b>';
      el.killfeed.appendChild(d);
      feed.push({ el: d, t: 0, ttl: 7 });
      while (feed.length > 6) {
        const old = feed.shift();
        if (old.el.parentNode) old.el.parentNode.removeChild(old.el);
      }
    },
    /* ---------------- transient messages ---------------- */
    pickupToast(text, rarity) {
      if (!text) return;
      const d = document.createElement('div');
      const col = CONFIG.RARITY_HEX[rarity] || '#41e0ff';
      d.style.cssText = 'font-size:13px;font-weight:700;letter-spacing:1px;padding:3px 12px;' +
        'border-radius:4px;background:rgba(3,7,10,.72);border:1px solid ' + col +
        ';color:' + col + ';opacity:0;transition:opacity .12s;';
      d.textContent = text;
      el.toastLane.appendChild(d);
      requestAnimationFrame(function () { d.style.opacity = '1'; });
      setTimeout(function () {
        d.style.opacity = '0';
        setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 250);
      }, 1500);
      while (el.toastLane.children.length > 5) el.toastLane.removeChild(el.toastLane.firstChild);
    },
    announce(text) { this.pickupToast(text, 4); },
    /* ---------- pickup prompt, screen flash, zone notice ---------- */
    setPickupPrompt(item) {
      if (item) {
        el.pickupPrompt.classList.add('show');
        el.pickupName.textContent = item.info.label;
        el.pickupName.style.color = item.info.color;
      } else {
        el.pickupPrompt.classList.remove('show');
      }
    },
    addDamage() { /* totals refresh in update() */ },
    flashDamage() {
      el.flash.style.background = 'rgba(170,10,10,0.30)';
      el.flash.style.opacity = '1';
      setTimeout(function () { el.flash.style.opacity = '0'; }, 90);
    },
    zoneWarn() {
      warnTimer = 3.4;
      el.zoneWarn.classList.add('show');
      SFX.setMusicMode('tense');
    },
    onZonePhase(phase) {
      const p = CONFIG.ZONE_PHASES[Math.min(phase, CONFIG.ZONE_PHASES.length - 1)];
      this.announce('PHASE ' + (phase + 1) + ' — ' + p.dps + ' DPS OUTSIDE');
    },
    /* ---------- per-frame HUD refresh ---------- */
    update(dt) {
      /* health + shield */
      el.hpFill.style.width = (clamp(Player.hp / CONFIG.MAX_HP, 0, 1) * 100).toFixed(0) + '%';
      el.hpVal.textContent = Math.max(0, Math.ceil(Player.hp));
      el.shFill.style.width = (clamp(Player.shield / CONFIG.MAX_SHIELD, 0, 1) * 100).toFixed(0) + '%';
      el.shVal.textContent = Math.max(0, Math.ceil(Player.shield));
      el.helmPip.textContent = 'HELMET ' + (Player.helmetTier ? ARMOR_NAMES[Player.helmetTier] : '—');
      el.helmPip.classList.toggle('on', Player.helmetTier > 0);
      el.vestPip.textContent = 'VEST ' + (Player.vestTier ? ARMOR_NAMES[Player.vestTier] : '—');
      el.vestPip.classList.toggle('on', Player.vestTier > 0);
      el.lowHp.style.opacity = Player.hp < 32 ? (1 - Math.max(0, Player.hp) / 32).toFixed(2) : '0';

      /* weapon + ammo */
      const slot = Player.currentWeapon(), w = Player.wdef();
      if (w) {
        el.weaponName.textContent = w.name;
        el.weaponName.style.color = CONFIG.RARITY_HEX[w.tier];
        el.weaponTier.textContent = CONFIG.RARITY_NAMES[w.tier] + ' • ' + AMMO_LABEL[w.ammo];
        el.weaponTier.style.color = CONFIG.RARITY_HEX[w.tier];
        el.ammoLine.innerHTML = Player.reloadT > 0 ? '<small>RELOADING</small>'
          : slot.mag + '<small> / ' + (Player.ammoReserve[w.ammo] | 0) + '</small>';
      } else {
        el.weaponName.textContent = 'UNARMED';
        el.weaponName.style.color = '#9ec6d6';
        el.weaponTier.textContent = 'FISTS — hold E on loot';
        el.weaponTier.style.color = '#7fb6c9';
        el.ammoLine.innerHTML = '<small>&mdash;</small>';
      }
      for (let i = 0; i < 5; i++) {
        const s = Player.weapons[i], node = el.slots[i];
        node.className = 'slot' + (i === Player.curSlot ? ' sel' : '');
        const nameSpan = node.querySelector('span');
        if (s) {
          nameSpan.textContent = CONFIG.WEAPONS[s.id].name.split(' ')[0];
          nameSpan.style.color = CONFIG.RARITY_HEX[CONFIG.WEAPONS[s.id].tier];
        } else {
          nameSpan.textContent = '-';
          nameSpan.style.color = '#7fb6c9';
        }
      }
      el.consumRow.innerHTML =
        '<div class="cons' + (Player.inv.bandage ? '' : ' empty') + '"><b>6</b> BANDAGE x' + Player.inv.bandage + '</div>' +
        '<div class="cons' + (Player.inv.medkit ? '' : ' empty') + '"><b>7</b> MEDKIT x' + Player.inv.medkit + '</div>' +
        '<div class="cons' + (Player.inv.shield ? '' : ' empty') + '"><b>8</b> SHIELD x' + Player.inv.shield + '</div>' +
        '<div class="cons' + (Player.inv.nade ? '' : ' empty') + '"><b>G</b> NADE x' + Player.inv.nade + '</div>';

      /* counters */
      if (App.aliveCount !== lastAlive) { el.aliveCount.textContent = App.aliveCount; lastAlive = App.aliveCount; }
      if (Player.kills !== lastKills) { el.killCount.textContent = Player.kills; lastKills = Player.kills; }
      const dmg = Math.round(Player.damageDealt);
      if (dmg !== lastDmg) { el.dmgCount.textContent = dmg; lastDmg = dmg; }
      /* zone phase panel */
      const ph = Zone.phase;
      if (ph !== lastPhase) {
        el.zonePhase.textContent = (Zone.state === 'final') ? 'FINAL ZONE' : 'PHASE ' + (ph + 1);
        lastPhase = ph;
      }
      const tl = Zone.timeLeft();
      const mins = Math.floor(tl / 60), secs = Math.floor(tl % 60);
      el.zoneTimer.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
      const shrinking = Zone.state === 'shrink';
      el.zoneSub.textContent = shrinking ? 'ZONE SHRINKING!'
        : (Zone.state === 'final' ? 'NO MORE SHRINKS' : 'Zone moves in');
      el.zonePanel.classList.toggle('danger', shrinking);

      /* zone warnings + outdoor indicator */
      if (warnTimer > 0) {
        warnTimer -= dt;
        if (warnTimer <= 0) el.zoneWarn.classList.remove('show');
      }
      if (Player.alive && Zone.isOutside(Player.pos.x, Player.pos.z)) {
        outsideTimer = 0.45;
        el.outsideWarn.classList.add('show');
        el.outsideWarn.textContent = 'OUTSIDE THE ZONE — ' + Zone.dps() + ' DPS';
      } else if (outsideTimer > 0) {
        outsideTimer -= dt;
        if (outsideTimer <= 0) el.outsideWarn.classList.remove('show');
      }

      /* crosshair bloom + scope */
      const sp = Player.currentSpread();
      const gap = Math.max(3, 5 + sp * 4 - (Player.ads ? 3 : 0));
      crossLines.t.style.transform = 'translateY(' + (-gap - 9) + 'px)';
      crossLines.b.style.transform = 'translateY(' + gap + 'px)';
      crossLines.l.style.transform = 'translateX(' + (-gap - 9) + 'px)';
      crossLines.r.style.transform = 'translateX(' + gap + 'px)';
      const wd = Player.wdef();
      el.crosshair.classList.toggle('scoped', !!(Player.ads && wd && wd.scope));

      /* consumable progress */
      if (Player.using) {
        el.healBarWrap.classList.add('show');
        el.healBarLabel.textContent = 'USING ' + Player.using.kind.toUpperCase();
        el.healBarFill.style.width = ((Player.using.t / Player.using.total) * 100).toFixed(0) + '%';
      } else {
        el.healBarWrap.classList.remove('show');
      }

      /* drop phase readout */
      if (App.state === 'DROP') {
        el.dropPanel.classList.remove('hidden');
        el.altitude.textContent = Math.max(0, Math.round(Player.pos.y)) + ' m';
      } else {
        el.dropPanel.classList.add('hidden');
      }

      /* kill feed fades */
      for (let i = feed.length - 1; i >= 0; i--) {
        const f = feed[i];
        f.t += dt;
        if (f.t > f.ttl) {
          if (f.el.parentNode) f.el.parentNode.removeChild(f.el);
          feed.splice(i, 1);
        } else if (f.t > f.ttl - 1) {
          f.el.style.opacity = (f.ttl - f.t).toFixed(2);
        }
      }
      this.drawCompass();
    },

    /* ---------------- compass strip ---------------- */
    drawCompass() {
      const c = el.compass;
      if (!c) return;
      const g = c.getContext('2d');
      const w = c.width, h = c.height;
      g.clearRect(0, 0, w, h);
      const deg = ((CAM.yaw * 180 / Math.PI) % 360 + 360) % 360;
      const pxPerDeg = w / 200;
      const labels = { 0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW' };
      const start = Math.ceil((deg - 100) / 15) * 15;
      for (let b = start; b <= deg + 100; b += 15) {
        const rel = b - deg;
        const bx = w / 2 + rel * pxPerDeg;
        if (bx < -20 || bx > w + 20) continue;
        const abs = ((b % 360) + 360) % 360;
        const major = abs % 45 === 0;
        g.strokeStyle = major ? 'rgba(234,252,255,.92)' : 'rgba(120,180,200,.5)';
        g.lineWidth = major ? 2 : 1;
        g.beginPath();
        g.moveTo(bx, h);
        g.lineTo(bx, major ? h - 12 : h - 6);
        g.stroke();
        if (labels[abs] !== undefined) {
          g.fillStyle = major ? '#eafcff' : '#9ec6d6';
          g.font = 'bold 11px Segoe UI, sans-serif';
          g.textAlign = 'center';
          g.fillText(labels[abs], bx, h - 14);
        }
      }
      /* bearing to the zone centre */
      if (Player.alive) {
        const zRel = angDiff(worldYaw(Zone.cur.x - CAM.pos.x, Zone.cur.z - CAM.pos.z), CAM.yaw) * 180 / Math.PI;
        if (Math.abs(zRel) < 100) {
          const zx = w / 2 + zRel * pxPerDeg;
          g.fillStyle = '#41e0ff';
          g.beginPath();
          g.moveTo(zx, h);
          g.lineTo(zx - 5, h - 10);
          g.lineTo(zx + 5, h - 10);
          g.closePath();
          g.fill();
        }
      }
      g.fillStyle = '#ffc63d';
      g.fillRect(w / 2 - 1, 0, 2, h);
    },
    /* ---------- scoreboard (Tab) ---------- */
    toggleScoreboard(show) {
      const sb = el.scoreboard;
      if (show === undefined) show = sb.classList.contains('hidden');
      sb.classList.toggle('hidden', !show);
      if (show) this.buildScoreboard();
      return show;
    },
    buildScoreboard() {
      const rows = [{
        name: 'YOU (player)', kills: Player.kills, alive: Player.alive,
        placement: Player.placement, me: true
      }];
      for (let i = 0; i < BOTS.length; i++) {
        const b = BOTS[i];
        rows.push({ name: b.name, kills: b.kills, alive: b.alive, placement: b.placement });
      }
      rows.sort(function (a, b2) {
        if (b2.kills !== a.kills) return b2.kills - a.kills;
        if (a.alive !== b2.alive) return a.alive ? -1 : 1;
        return (a.placement || 999) - (b2.placement || 999);
      });
      let html = '<tr><th style="text-align:left;color:#7fb6c9">COMBATANT</th>' +
                 '<th style="color:#7fb6c9">KILLS</th><th style="color:#7fb6c9">STATUS</th></tr>';
      const limit = Math.min(rows.length, 30);
      for (let i = 0; i < limit; i++) {
        const r = rows[i];
        html += '<tr><td class="k" style="color:' + (r.me ? '#5cf07a' : '#cfe9f3') + '">' + r.name + '</td>' +
          '<td style="text-align:center;color:#ffc63d">' + (r.kills | 0) + '</td>' +
          '<td style="text-align:center;color:' + (r.alive ? '#41e0ff' : '#7a93a0') + '">' +
          (r.alive ? 'ALIVE' : '#' + (r.placement || '?')) + '</td></tr>';
      }
      el.sbTable.innerHTML = html;
      el.sbSub.textContent = App.aliveCount + ' ALIVE  •  ' + App.totalCombatants + ' COMBATANTS';
    },
    /* ---------- fullscreen map ---------- */
    toggleMap(show) {
      const wrap = el.fullmapWrap;
      if (show === undefined) show = wrap.classList.contains('hidden');
      wrap.classList.toggle('hidden', !show);
      if (show) Maps.drawFull();
      return show;
    },
    mapOpen() { return !el.fullmapWrap.classList.contains('hidden'); },
    /* ---------- spectating ---------- */
    setSpectate(name) {
      el.spectatePanel.classList.toggle('hidden', !name);
      if (name) el.specName.textContent = name;
    },
    setFps(t) {
      el.fpsBox.style.display = SETTINGS.showFps ? 'block' : 'none';
      if (SETTINGS.showFps) el.fpsBox.textContent = t + ' FPS';
    },
    damageTaken(amount) {
      el.flash.style.background = 'rgba(170,10,10,' + Math.min(0.45, 0.1 + amount / 120) + ')';
    }

  };
  return api;
})();

/* =====================================================================
   PROPS - trees, rocks and bushes. Everything is instanced, and every
   tree and rock also registers a collider so it blocks movement and LOS.
   ===================================================================== */
const propScratch = [];
function generateProps(q) {
  const treeCount = Math.max(60, Math.floor(CONFIG.TREE_COUNT * q.treeScale));
  /* ---- trees: trunk + two stacked cones (one draw call each) ---- */
  const trunkGeo = new THREE.CylinderGeometry(0.2, 0.34, 4.6, 6);
  trunkGeo.translate(0, 2.3, 0);
  const coneA = new THREE.ConeGeometry(2.6, 3.8, 7);
  coneA.translate(0, 5.2, 0);
  const coneB = new THREE.ConeGeometry(1.9, 3.2, 7);
  coneB.translate(0, 7.3, 0);
  const leafGeo = mergeGeoms([coneA, coneB]);
  coneA.dispose(); coneB.dispose();
  const trunk = new THREE.InstancedMesh(trunkGeo, new THREE.MeshLambertMaterial({ color: 0x6b4f34 }), treeCount);
  const leaves = new THREE.InstancedMesh(leafGeo, new THREE.MeshLambertMaterial({}), treeCount);
  const _mm = new THREE.Matrix4(), _qq = new THREE.Quaternion(), _pp = new THREE.Vector3();
  const _ss = new THREE.Vector3(), _ee = new THREE.Euler(), leafCol = new THREE.Color();
  const zero = new THREE.Matrix4().makeScale(0, 0, 0);
  const propGrid = new SpatialGrid(6);
  let placed = 0, guard = 0;
  while (placed < treeCount && guard++ < treeCount * 40) {
    const a = RNG.range(0, Math.PI * 2), r = RNG.range(0, CONFIG.ISLAND_RADIUS * 0.93);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = World.heightAt(x, z);
    if (y < 2.6 || y > 34) continue;
    const slope = Math.abs(World.heightAt(x + 2, z) - y) + Math.abs(World.heightAt(x, z + 2) - y);
    if (slope > 2.6) continue;
    let blocked = false;
    for (let t = 0; t < World.towns.length; t++) {
      if (dist2D(x, z, World.towns[t].x, World.towns[t].z) < 66) { blocked = true; break; }
    }
    if (!blocked) {
      for (let t = 0; t < World.landmarks.length; t++) {
        if (dist2D(x, z, World.landmarks[t].x, World.landmarks[t].z) < 26) { blocked = true; break; }
      }
    }
    if (blocked) continue;
    if (propGrid.query(x, z, 5.5, propScratch).length) continue;   // keep trunks apart
    propGrid.insert(x, z, { x: x, z: z });
    const s = RNG.range(0.72, 1.35);
    _ee.set(0, RNG.range(0, 6.283), 0);
    _qq.setFromEuler(_ee);
    _pp.set(x, y, z);
    _ss.set(s, s * RNG.range(0.85, 1.25), s);
    _mm.compose(_pp, _qq, _ss);
    trunk.setMatrixAt(placed, _mm);
    leaves.setMatrixAt(placed, _mm);
    leafCol.setHSL(RNG.range(0.22, 0.32), RNG.range(0.35, 0.6), RNG.range(0.22, 0.42));
    leaves.setColorAt(placed, leafCol);
    World.addCylinder(x, z, 0.42 * s, y - 1, y + 5 * s);
    World.treeSpots.push({ x: x, z: z, y: y, s: s });
    placed++;
  }
  for (let i = placed; i < treeCount; i++) { trunk.setMatrixAt(i, zero); leaves.setMatrixAt(i, zero); }
  trunk.castShadow = !!q.shadows;
  leaves.castShadow = !!q.shadows;
  trunk.frustumCulled = false;
  leaves.frustumCulled = false;
  World.group.add(trunk);
  World.group.add(leaves);
  /* ---- rocks: squashed icosahedra, each with a collider ---- */
  const rockCount = Math.max(40, Math.floor(CONFIG.ROCK_COUNT * q.treeScale));
  const rocks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0),
    new THREE.MeshLambertMaterial({}), rockCount);
  const rockCol = new THREE.Color();
  let rp = 0, rguard = 0;
  while (rp < rockCount && rguard++ < rockCount * 30) {
    const a = RNG.range(0, Math.PI * 2), r = RNG.range(10, CONFIG.ISLAND_RADIUS * 0.95);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = World.heightAt(x, z);
    if (y < 1.6 || y > 36) continue;
    let blocked = false;
    for (let t = 0; t < World.towns.length; t++) {
      if (dist2D(x, z, World.towns[t].x, World.towns[t].z) < 58) { blocked = true; break; }
    }
    if (blocked) continue;
    const s = RNG.range(0.8, 2.7);
    const sy = s * RNG.range(0.6, 1.0);
    _ee.set(RNG.range(-0.2, 0.2), RNG.range(0, 6.283), RNG.range(-0.2, 0.2));
    _qq.setFromEuler(_ee);
    _pp.set(x, y + sy * 0.35, z);
    _ss.set(s, sy, s * RNG.range(0.8, 1.2));
    _mm.compose(_pp, _qq, _ss);
    rocks.setMatrixAt(rp, _mm);
    rockCol.setHSL(0.09, RNG.range(0.02, 0.09), RNG.range(0.3, 0.5));
    rocks.setColorAt(rp, rockCol);
    World.addCylinder(x, z, s * 0.85, y - 1, y + sy * 1.15);
    rp++;
  }
  for (let i = rp; i < rockCount; i++) rocks.setMatrixAt(i, zero);
  rocks.castShadow = !!q.shadows;
  rocks.receiveShadow = !!q.shadows;
  rocks.frustumCulled = false;
  World.group.add(rocks);

  /* ---- low bushes for ground detail (no collision) ---- */
  const bushCount = q.grass ? 320 : 0;
  if (bushCount > 0) {
    const bushGeo = new THREE.ConeGeometry(0.85, 1.15, 5);
    bushGeo.translate(0, 0.55, 0);
    const bushes = new THREE.InstancedMesh(bushGeo, new THREE.MeshLambertMaterial({}), bushCount);
    const bushCol = new THREE.Color();
    let bp = 0, bguard = 0;
    while (bp < bushCount && bguard++ < bushCount * 20) {
      const a = RNG.range(0, Math.PI * 2), r = RNG.range(0, CONFIG.ISLAND_RADIUS * 0.95);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const y = World.heightAt(x, z);
      if (y < 2.2 || y > 34) continue;
      _ee.set(0, RNG.range(0, 6.283), 0);
      _qq.setFromEuler(_ee);
      _pp.set(x, y, z);
      const s = RNG.range(0.6, 1.5);
      _ss.set(s, s, s);
      _mm.compose(_pp, _qq, _ss);
      bushes.setMatrixAt(bp, _mm);
      bushCol.setHSL(RNG.range(0.2, 0.3), 0.4, RNG.range(0.18, 0.3));
      bushes.setColorAt(bp, bushCol);
      bp++;
    }
    for (let i = bp; i < bushCount; i++) bushes.setMatrixAt(i, zero);
    bushes.frustumCulled = false;
    World.group.add(bushes);
  }

  /* ---- scattered crates and hay bales so the open ground has cover ---- */
  for (let i = 0; i < CONFIG.CRATE_COUNT; i++) {
    const a = RNG.range(0, Math.PI * 2), r = RNG.range(40, CONFIG.ISLAND_RADIUS * 0.9);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const y = World.heightAt(x, z);
    if (y < 2.4 || y > 30) continue;
    if (RNG.chance(0.55)) addCrate(x, z, y);
    else addHayBale(x, z, y);
  }
  /* a sprinkling of extra loot points out in the wild */
  for (let i = 0; i < World.treeSpots.length; i += 9) {
    const t = World.treeSpots[i];
    if (RNG.chance(0.25)) {
      World.lootPoints.push({ x: t.x + RNG.range(-3, 3), z: t.z + RNG.range(-3, 3), y: t.y + 0.35 });
    }
  }
}

/* =====================================================================
   MAPS - a pre-rendered top-down island image drives both the minimap and
   the fullscreen map; zone circles and markers are drawn on top live.
   ===================================================================== */
const MAP_IMG_SIZE = 512;
World.mapPoint = function (x, z) {
  const s = MAP_IMG_SIZE / CONFIG.MAP_SIZE;
  return { x: (x + CONFIG.MAP_SIZE / 2) * s, y: (z + CONFIG.MAP_SIZE / 2) * s };
};

function buildMapImage() {
  const S = MAP_IMG_SIZE;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d');
  g.fillStyle = '#0c2534';
  g.fillRect(0, 0, S, S);
  /* terrain bands straight off the heightmap */
  const n = World.hN + 1;
  const px = S / n;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const h = World.height[j * n + i];
      let col;
      if (h < -9) col = '#09202e';
      else if (h < -1.5) col = '#123c52';
      else if (h < 1.4) col = '#c4b183';
      else if (h < 3.6) col = '#9d9a63';
      else if (h < 15) col = '#4f7d3d';
      else if (h < 25) col = '#3d6530';
      else col = '#7c7c74';
      g.fillStyle = col;
      g.fillRect(i * px, j * px, px + 1, px + 1);
    }
  }
  /* buildings as bright blocks, town names underneath */
  g.textAlign = 'center';
  for (let t = 0; t < World.towns.length; t++) {
    const town = World.towns[t];
    for (let b = 0; b < town.buildings.length; b++) {
      const bd = town.buildings[b];
      const p = World.mapPoint(bd.x, bd.z);
      const w = Math.max(3, bd.w * S / CONFIG.MAP_SIZE);
      const h = Math.max(3, bd.d * S / CONFIG.MAP_SIZE);
      g.fillStyle = 'rgba(226,222,206,.92)';
      g.fillRect(p.x - w / 2, p.y - h / 2, w, h);
    }
    const c = World.mapPoint(town.x, town.z);
    g.fillStyle = 'rgba(255,240,190,.95)';
    g.font = 'bold 13px Segoe UI, sans-serif';
    g.fillText(town.name, c.x, c.y - 16);
  }
  /* landmark markers */
  for (let i = 0; i < World.landmarks.length; i++) {
    const lm = World.landmarks[i];
    const p = World.mapPoint(lm.x, lm.z);
    g.fillStyle = 'rgba(255,200,80,.95)';
    g.beginPath();
    g.arc(p.x, p.y, 5, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(240,250,255,.9)';
    g.font = 'bold 11px Segoe UI, sans-serif';
    g.fillText(lm.name, p.x, p.y - 9);
  }
  World.mapCanvas = cv;
}
const Maps = {
  /* world (x,z) -> screen pixel for a view centred on (cx,cz) */
  proj(x, z, cx, cz, scale, size) {
    return { x: (x - cx) * scale + size / 2, y: (z - cz) * scale + size / 2 };
  },
  /* shared overlay pass: background image, zone circles, markers, arrows */
  overlays(g, cx, cz, scale, size, full) {
    const imgScale = MAP_IMG_SIZE / CONFIG.MAP_SIZE;
    const halfWorld = size / (2 * scale);
    g.drawImage(World.mapCanvas,
      (cx - halfWorld + CONFIG.MAP_SIZE / 2) * imgScale,
      (cz - halfWorld + CONFIG.MAP_SIZE / 2) * imgScale,
      halfWorld * 2 * imgScale, halfWorld * 2 * imgScale,
      0, 0, size, size);
    /* current zone */
    const zc = this.proj(Zone.cur.x, Zone.cur.z, cx, cz, scale, size);
    g.lineWidth = 3;
    g.strokeStyle = 'rgba(65,224,255,.95)';
    g.beginPath();
    g.arc(zc.x, zc.y, Math.max(1, Zone.cur.r * scale), 0, Math.PI * 2);
    g.stroke();
    /* next zone preview */
    if (Zone.state === 'wait' || Zone.state === 'shrink') {
      const nc = this.proj(Zone.next.x, Zone.next.z, cx, cz, scale, size);
      g.lineWidth = 2;
      g.setLineDash([5, 4]);
      g.strokeStyle = 'rgba(255,255,255,.9)';
      g.beginPath();
      g.arc(nc.x, nc.y, Math.max(1, Zone.next.r * scale), 0, Math.PI * 2);
      g.stroke();
      g.setLineDash([]);
    }
    /* supply crates */
    const crates = Loot.crates;
    for (let i = 0; i < crates.length; i++) {
      const c = crates[i];
      const p = this.proj(c.x, c.z, cx, cz, scale, size);
      g.fillStyle = c.landed ? '#ffc63d' : 'rgba(255,198,61,.5)';
      g.fillRect(p.x - 4, p.y - 4, 8, 8);
      g.strokeStyle = '#5a3f10';
      g.lineWidth = 1;
      g.strokeRect(p.x - 4, p.y - 4, 8, 8);
    }
    /* the player */
    if (Player.alive) {
      const p = this.proj(Player.pos.x, Player.pos.z, cx, cz, scale, size);
      g.save();
      g.translate(p.x, p.y);
      g.rotate(CAM.yaw);
      g.fillStyle = '#5cf07a';
      g.beginPath();
      g.moveTo(0, -9);
      g.lineTo(6, 7);
      g.lineTo(0, 3.5);
      g.lineTo(-6, 7);
      g.closePath();
      g.fill();
      g.strokeStyle = 'rgba(0,0,0,.6)';
      g.lineWidth = 1;
      g.stroke();
      g.restore();
    }
    /* spectated bot */
    if (!Player.alive && Game.spectating) {
      const p = this.proj(Game.spectating.pos.x, Game.spectating.pos.z, cx, cz, scale, size);
      g.strokeStyle = '#ffc63d';
      g.lineWidth = 2;
      g.beginPath();
      g.arc(p.x, p.y, 7, 0, Math.PI * 2);
      g.stroke();
    }
    if (full) {
      g.strokeStyle = 'rgba(65,224,255,.5)';
      g.lineWidth = 4;
      g.strokeRect(2, 2, size - 4, size - 4);
      g.fillStyle = 'rgba(234,252,255,.75)';
      g.font = 'bold 18px Segoe UI, sans-serif';
      g.textAlign = 'center';
      g.fillText('N', size / 2, 24);
      g.fillText('S', size / 2, size - 10);
      g.fillText('W', 18, size / 2 + 6);
      g.fillText('E', size - 18, size / 2 + 6);
    }
  },
  drawMinimap() {
    const cv = document.getElementById('minimap');
    if (!cv) return;
    const g = cv.getContext('2d');
    const size = cv.width;
    const scale = size / 430;                    // roughly 430 world units across
    const track = Player.alive ? Player.pos : (Game.spectating ? Game.spectating.pos : CAM.pos);
    g.clearRect(0, 0, size, size);
    this.overlays(g, track.x, track.z, scale, size, false);
  },
  drawFull() {
    const cv = document.getElementById('fullmap');
    if (!cv) return;
    const size = cv.width;
    const scale = size / (CONFIG.MAP_SIZE * 1.02);
    const g = cv.getContext('2d');
    g.clearRect(0, 0, size, size);
    this.overlays(g, 0, 0, scale, size, true);
  }
};
/* =====================================================================
   MENUS / APP - screens, settings, and the application shell that owns the
   renderer, the scene and the whole match life cycle.
   ===================================================================== */
function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

const App = {
  renderer: null, scene: null, camera: null, canvas: null,
  state: 'MENU',                      // MENU | DROP | PLAYING | SPECTATING | GAME_OVER
  quality: QUALITY_PRESETS.high,
  totalCombatants: 0, aliveCount: 0, deathsThisTick: 0, matchTime: 0,
  paused: false, win: false, lastFps: 0,
  screens: {},

  init() {
    this.canvas = document.getElementById('gameCanvas');
    const bootLoading = document.getElementById('bootLoading');
    if (!webglAvailable()) {
      bootLoading.classList.add('hidden');
      document.getElementById('bootError').classList.remove('hidden');
      return false;
    }
    this.quality = QUALITY_PRESETS[SETTINGS.quality] || QUALITY_PRESETS.high;
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: SETTINGS.quality !== 'low',
        powerPreference: 'high-performance'
      });
    } catch (e) {
      bootLoading.classList.add('hidden');
      document.getElementById('bootError').classList.remove('hidden');
      document.getElementById('bootErrorText').textContent =
        'WebGL could not start on this machine: ' + (e && e.message ? e.message : 'unknown error');
      return false;
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.quality.pixelRatio));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = !!this.quality.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(CONFIG.FOV_BASE,
      window.innerWidth / Math.max(1, window.innerHeight), 0.08, 1600);
    this.camera.rotation.order = 'YXZ';
    CAM.camera = this.camera;
    this.scene.add(this.camera);

    FX.init(this.scene);
    UI.init();
    PlayerView.init(this.scene);
    Input.init(this.canvas);
    Loot.init(this.scene);
    Loot.initCrates(this.scene);
    Projectiles.init(this.scene);
    /* one extra slot of headroom so a full 100-bot match always fits */
    BotView.init(this.scene, CONFIG.BOT_COUNT + 3);

    const ids = ['startScreen', 'controlsScreen', 'pauseScreen', 'deathScreen', 'victoryScreen', 'scoreboard'];
    for (let i = 0; i < ids.length; i++) this.screens[ids[i]] = document.getElementById(ids[i]);
    window.addEventListener('resize', function () { App.onResize(); });
    document.getElementById('fmtCombatants').textContent = CONFIG.BOT_COUNT + 1;
    document.getElementById('fmtPhases').textContent = CONFIG.ZONE_PHASES.length;
    this.buildSettingsUI();
    this.wireMenus();
    bootLoading.classList.add('hidden');
    this.showScreen('startScreen');
    return true;
  },

  onResize() {
    if (!this.renderer) return;
    const w = window.innerWidth, h = Math.max(1, window.innerHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  },

  /* quality tweaks that do not require rebuilding the island */
  applyQuality() {
    this.quality = QUALITY_PRESETS[SETTINGS.quality] || QUALITY_PRESETS.high;
    if (!this.renderer) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.quality.pixelRatio));
    this.renderer.shadowMap.enabled = !!this.quality.shadows;
    if (this.scene && this.scene.fog) this.scene.fog.far = this.quality.viewDist;
    UI.announce('QUALITY: ' + this.quality.label.toUpperCase() + ' — takes full effect next match');
  },
  /* one settings panel, cloned into each host element */
  buildSettingsUI() {
    const hosts = document.querySelectorAll('.settingsHost');
    for (let h = 0; h < hosts.length; h++) {
      const host = hosts[h];
      host.innerHTML =
        '<h3>SETTINGS</h3>' +
        '<div class="settingRow"><label>Mouse sens</label>' +
        '<input type="range" data-set="sensitivity" min="0.0006" max="0.006" step="0.0002">' +
        '<span class="val" data-out="sensitivity"></span></div>' +
        '<div class="settingRow"><label>Volume</label>' +
        '<input type="range" data-set="volume" min="0" max="1" step="0.05">' +
        '<span class="val" data-out="volume"></span></div>' +
        '<div class="settingRow"><label>Quality</label>' +
        '<select data-set="quality">' +
        '<option value="low">Low &mdash; 40 bots</option>' +
        '<option value="med">Medium &mdash; 68 bots</option>' +
        '<option value="high">High &mdash; 100 bots</option></select></div>' +
        '<div class="settingRow"><label>Mute audio</label>' +
        '<input type="checkbox" data-set="muted" style="accent-color:#41e0ff;width:16px;height:16px"></div>' +
        '<div class="settingRow"><label>Show FPS</label>' +
        '<input type="checkbox" data-set="showFps" style="accent-color:#41e0ff;width:16px;height:16px"></div>';
      const sync = function () {
        host.querySelector('[data-set=sensitivity]').value = SETTINGS.sensitivity;
        host.querySelector('[data-set=volume]').value = SETTINGS.volume;
        host.querySelector('[data-set=quality]').value = SETTINGS.quality;
        host.querySelector('[data-set=muted]').checked = SETTINGS.muted;
        host.querySelector('[data-set=showFps]').checked = SETTINGS.showFps;
        host.querySelector('[data-out=sensitivity]').textContent =
          (SETTINGS.sensitivity * 1000).toFixed(1);
        host.querySelector('[data-out=volume]').textContent = Math.round(SETTINGS.volume * 100) + '%';
      };
      host._syncSettings = sync;
      host.addEventListener('input', function (ev) {
        const t = ev.target;
        const key = t.getAttribute('data-set');
        if (!key) return;
        if (key === 'sensitivity') SETTINGS.sensitivity = parseFloat(t.value);
        else if (key === 'volume') { SETTINGS.volume = parseFloat(t.value); SFX.setVolume(SETTINGS.volume); }
        else if (key === 'quality') { SETTINGS.quality = t.value; App.applyQuality(); }
        else if (key === 'muted') { SETTINGS.muted = t.checked; SFX.setMuted(SETTINGS.muted); }
        else if (key === 'showFps') SETTINGS.showFps = t.checked;
        sync();
      });
      sync();
    }
  },
  syncSettings() {
    const hosts = document.querySelectorAll('.settingsHost');
    for (let i = 0; i < hosts.length; i++) if (hosts[i]._syncSettings) hosts[i]._syncSettings();
  },
  showScreen(name) {
    for (const k in this.screens) {
      if (this.screens[k]) this.screens[k].classList.toggle('hidden', k !== name);
    }
  },
  wireMenus() {
    const self = this;
    function click(id, fn) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', function () {
        SFX.init();
        SFX.play('uiClick');
        fn();
      });
    }
    click('btnPlay', function () { self.startMatch(); });
    click('btnControls', function () { self.showScreen('controlsScreen'); });
    click('btnControlsBack', function () { self.showScreen('startScreen'); });
    click('btnResume', function () { self.resume(); });
    click('btnRestart2', function () { self.startMatch(); });
    click('btnQuit', function () { self.quitToMenu(); });
    click('btnQuit2', function () { self.quitToMenu(); });
    click('btnQuit3', function () { self.quitToMenu(); });
    click('btnPlayAgain', function () { self.startMatch(); });
    click('btnPlayAgain2', function () { self.startMatch(); });
    click('btnSpectate', function () { Game.beginSpectate(); });
    click('btnSbClose', function () { UI.toggleScoreboard(false); });
  },
  /* ---------- match control ---------- */
  startMatch() {
    SFX.init();
    SFX.resume();
    RNG.set((Math.random() * 0xffffffff) >>> 0);
    const seed = RNG.int(1, 2147483000);
    this.quality = QUALITY_PRESETS[SETTINGS.quality] || QUALITY_PRESETS.high;
    this.totalCombatants = Math.min(CONFIG.BOT_COUNT + 1,
      1 + Math.max(40, Math.round(CONFIG.BOT_COUNT * this.quality.botScale)));
    this.aliveCount = this.totalCombatants;
    this.deathsThisTick = 0;
    this.matchTime = 0;
    this.paused = false;
    this.win = false;
    /* the world comes first: zone, loot and bots all read from it */
    World.build(this.quality, seed);
    Zone.reset();
    Loot.clear();
    Loot.populate();
    Bots.clear();
    Bots.reset(this.totalCombatants - 1);
    Player.reset(0, 0, 0);
    Player.beginDrop();
    Game.spectating = null;
    Game.spectateIdx = -1;
    Game.time = 0;
    PlayerView.setWeapon(null);
    UI.show(true);
    UI.setSpectate(null);
    UI.clearFeed();
    UI.toggleMap(false);
    UI.toggleScoreboard(false);
    Input.firing = false;
    Input.ads = false;
    Input.jumpQueued = false;
    this.showScreen(null);
    this.state = 'DROP';
    Input.requestLock();
    SFX.setMusicMode('calm');
  },
  quitToMenu() {
    this.state = 'MENU';
    this.paused = false;
    Input.releaseLock();
    Input.firing = false;
    Input.ads = false;
    UI.show(false);
    UI.setSpectate(null);
    UI.clearFeed();
    UI.toggleMap(false);
    UI.toggleScoreboard(false);
    PlayerView.hide();
    this.showScreen('startScreen');
  },
  pause() {
    if (this.paused) return;
    if (this.state !== 'PLAYING' && this.state !== 'DROP') return;
    this.paused = true;
    Input.firing = false;
    Input.ads = false;
    UI.toggleScoreboard(false);
    document.getElementById('pauseStats').innerHTML =
      'Kills <b>' + Player.kills + '</b><br>' +
      'Damage <b>' + Math.round(Player.damageDealt) + '</b><br>' +
      'Alive <b>' + this.aliveCount + '</b> / ' + this.totalCombatants + '<br>' +
      'Zone phase <b>' + (Zone.phase + 1) + '</b><br>' +
      'Match time <b>' + fmtTime(this.matchTime) + '</b>';
    this.syncSettings();
    this.showScreen('pauseScreen');
    Input.releaseLock();
  },
  resume() {
    if (!this.paused) return;
    this.paused = false;
    this.showScreen(null);
    Input.requestLock();
  },
  onPointerLockChange(locked) {
    if (!locked && (this.state === 'PLAYING' || this.state === 'DROP') && !this.paused) this.pause();
    else if (locked && this.paused) { this.paused = false; this.showScreen(null); }
  },
  /* zone events */
  onZonePhase(phase) {
    UI.onZonePhase(phase);
    if (phase > 0 && phase % CONFIG.SUPPLY_DROP_EVERY === 0) Game.dropSupplyCrate();
  },
  zoneWarn() { UI.zoneWarn(); },
  /* final screen for either outcome */
  finishMatch(win) {
    if (this.state === 'GAME_OVER') return;
    this.state = 'GAME_OVER';
    this.win = win;
    /* the fatal hit lands mid-frame, so refresh the counters before the final
       screen prints "LEFT ALIVE" and the placement line */
    this.deathsThisTick = 0;
    this.aliveCount = (Player.alive ? 1 : 0) + Bots.aliveCount();
    Input.releaseLock();
    Input.firing = false;
    Input.ads = false;
    UI.toggleMap(false);
    UI.toggleScoreboard(false);
    PlayerView.hide();
    const acc = Player.shotsFired > 0 ? Math.round(Player.shotsHit / Player.shotsFired * 100) : 0;
    if (win) {
      SFX.play('victory');
      document.getElementById('victorySub').textContent =
        '#1 OF ' + this.totalCombatants + ' — LAST ONE STANDING';
      document.getElementById('vKills').textContent = Player.kills;
      document.getElementById('vDamage').textContent = Math.round(Player.damageDealt);
      document.getElementById('vTime').textContent = fmtTime(Player.survived);
      document.getElementById('vAccuracy').textContent = acc + '%';
      this.showScreen('victoryScreen');
    } else {
      SFX.play('death');
      document.getElementById('deathPlacement').textContent =
        '#' + (Player.placement || this.aliveCount) + ' OF ' + this.totalCombatants;
      document.getElementById('deathKiller').innerHTML = Player.killedBy
        ? ('Eliminated by <b>' + Player.killedBy + '</b> with <b>' + Player.killedWith + '</b>' +
           (Player.killedHead ? ' <span class="badge" style="color:#ffc63d">HEADSHOT</span>' : ''))
        : 'The storm took you';
      document.getElementById('dKills').textContent = Player.kills;
      document.getElementById('dDamage').textContent = Math.round(Player.damageDealt);
      document.getElementById('dTime').textContent = fmtTime(Player.survived);
      document.getElementById('dAlive').textContent = this.aliveCount;
      this.showScreen('deathScreen');
    }
  }


};




/* =====================================================================
   GAME LOOP - match state machine, per-frame update and rendering.
   ===================================================================== */
function fmtTime(t) {
  const s = Math.max(0, Math.floor(t));
  return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
}

const Game = {
  time: 0,
  spectating: null, spectateIdx: -1,

  /* ---------- player death ---------- */
  onPlayerDeath(attacker, weapon, head) {
    Player.killedBy = attacker ? (attacker.isPlayer ? 'YOU' : attacker.name) : null;
    Player.killedWith = weapon;
    Player.killedHead = head;
    if (!Player.placement) Player.placement = App.aliveCount;
    Input.firing = false;
    Input.ads = false;
    Input.releaseLock();
    PlayerView.hide();
    App.aliveCount = (Player.alive ? 1 : 0) + Bots.aliveCount();
    App.finishMatch(false);
  },

  /* ---------- spectating the survivors ---------- */
  beginSpectate() {
    App.state = 'SPECTATING';
    App.showScreen(null);
    UI.toggleScoreboard(false);
    PlayerView.hide();
    Input.firing = false;
    Input.ads = false;
    this.spectateIdx = -1;
    this.spectateNext();
    Input.requestLock();
  },
  spectateNext() {
    const total = BOTS.length;
    if (!total) { this.spectating = null; return; }
    for (let i = 1; i <= total; i++) {
      const idx = (this.spectateIdx + i + total) % total;
      const b = BOTS[idx];
      if (b && b.alive) {
        this.spectateIdx = idx;
        this.spectating = b;
        UI.setSpectate(b.name);
        return;
      }
    }
    this.spectating = null;
    UI.setSpectate(null);
  },
  updateSpectate(dt) {
    const b = this.spectating;
    if (!b || !b.alive) {
      if (Bots.aliveCount() > 1) { this.spectateNext(); return; }
      this.spectating = null;
      UI.setSpectate(null);
      App.finishMatch(false);
      return;
    }
    /* glide to a spot just behind and above the followed bot */
    const tx = b.pos.x - Math.sin(b.yaw) * 4.6;
    const tz = b.pos.z + Math.cos(b.yaw) * 4.6;
    const ty = b.pos.y + 2.4;
    const k = 1 - Math.exp(-4 * dt);
    CAM.pos.x += (tx - CAM.pos.x) * k;
    CAM.pos.y += (ty - CAM.pos.y) * k;
    CAM.pos.z += (tz - CAM.pos.z) * k;
    CAM.yaw = angLerp(CAM.yaw, b.yaw, 1 - Math.exp(-3 * dt));
    CAM.pitch = lerp(CAM.pitch, -0.12, 1 - Math.exp(-3 * dt));
    CAM.sync();
  },

  /* a crate falls every other zone phase, contested by the bots */
  dropSupplyCrate() {
    if (!BOTS.length) return;
    const z = Zone.cur;
    const a = RNG.range(0, Math.PI * 2);
    const r = z.r * RNG.range(0.05, 0.75);
    Loot.spawnCrate(z.x + Math.cos(a) * r, z.z + Math.sin(a) * r);
  },

  /* ---------- one simulation frame ---------- */
  update(dt) {
    this.time += dt;
    App.matchTime += dt;
    App.deathsThisTick = 0;

    /* hard safety cap: however the fight goes, a match always ends */
    if (App.matchTime > CONFIG.MATCH_TIME_CAP && App.state !== 'GAME_OVER') {
      if (Player.alive) { Player.placement = 1; App.finishMatch(true); }
      else App.finishMatch(false);
      return;
    }
    App.aliveCount = (Player.alive ? 1 : 0) + Bots.aliveCount();
    SFX.tick(dt);
    Zone.tickUniforms(this.time);
    Zone.update(dt);
    Projectiles.update(dt);

    if (Player.alive) {
      const wasAir = Player.airborne;
      Player.update(dt);
      if (wasAir && !Player.airborne && App.state === 'DROP') {
        App.state = 'PLAYING';
        UI.announce('LANDED — FIND A WEAPON');
      }
      /* safety valve: whatever the terrain does, the drop phase ends */
      if (App.state === 'DROP' && Player.survived > CONFIG.DROP_MAX_TIME) {
        Player.airborne = false;
        Player.gliderOpen = false;
        Player.pos.y = Math.max(World.groundAt(Player.pos.x, Player.pos.z, Player.pos.y + 2),
                                CONFIG.SEA_LEVEL + 0.02);
        Player.grounded = true;
        App.state = 'PLAYING';
        UI.announce('LANDED — FIND A WEAPON');
      }
    }
    Bots.update(dt);
    Loot.update(dt);
    FX.update(dt);
    if (App.state === 'SPECTATING') this.updateSpectate(dt);

    /* the sun rides with the player so the shadow camera stays tight */
    if (World.sun) {
      const px = Player.alive ? Player.pos.x : CAM.pos.x;
      const pz = Player.alive ? Player.pos.z : CAM.pos.z;
      World.sun.position.set(px + 110, 190, pz + 70);
      World.sun.target.position.set(px, 0, pz);
      World.sun.target.updateMatrixWorld();
    }
    if (World.waterUniforms) World.waterUniforms.uTime.value = this.time;
    SFX.setMusicMode((App.aliveCount <= 14 || Zone.state === 'final') ? 'tense' : 'calm');

    UI.update(dt);
    Maps.drawMinimap();
    if (UI.mapOpen()) Maps.drawFull();
    UI.setFps(App.lastFps);
  },
  /* ---------- one rendered frame ---------- */
  render(dt) {
    const cam = App.camera;
    const shake = FX.shake;
    cam.position.set(
      CAM.pos.x + (Math.random() - 0.5) * shake * 0.4,
      CAM.pos.y + (Math.random() - 0.5) * shake * 0.4,
      CAM.pos.z + (Math.random() - 0.5) * shake * 0.4
    );
    cam.rotation.set(CAM.pitch + Player.recoilPitch, -(CAM.yaw + Player.recoilYaw), 0);

    /* field of view: sprint kick, ADS zoom, sniper scope */
    const w = Player.wdef();
    let targetFov = Player.sprinting ? CONFIG.FOV_SPRINT : CONFIG.FOV_BASE;
    if (Player.ads && w) targetFov = w.scope ? 20 : CONFIG.FOV_ADS;
    cam.fov = lerp(cam.fov, targetFov, 1 - Math.exp(-9 * dt));
    cam.updateProjectionMatrix();

    /* third-person character model: shown whenever the player is in the world,
       hidden while scoped (so the scope is unobstructed), spectating, dead or in
       a menu. The camera keeps orbiting the pivot either way. */
    const scoped = !!(Player.ads && w && w.scope);
    const showModel = Player.alive && !scoped &&
                      App.state !== 'SPECTATING' && App.state !== 'MENU';
    if (showModel) {
      if (w) PlayerView.setWeapon(Player.currentWeapon().id);
      else PlayerView.setWeapon(null);
      PlayerView.update(dt, Player);
    } else {
      PlayerView.hide();
    }
    this.drawScope(scoped);
    App.renderer.render(App.scene, cam);
  },

  /* sniper scope overlay drawn on its own canvas */
  drawScope(on) {
    const cv = document.getElementById('scopeOverlay');
    if (!cv) return;
    const scoped = !!on;
    cv.classList.toggle('show', scoped);
    if (!scoped) return;
    if (cv.width !== window.innerWidth || cv.height !== window.innerHeight) {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    }
    const g = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    g.clearRect(0, 0, W, H);
    g.fillStyle = 'rgba(2,5,7,0.95)';
    g.fillRect(0, 0, W, H);
    const r = Math.min(W, H) * 0.33;
    g.save();
    g.globalCompositeOperation = 'destination-out';
    g.beginPath();
    g.arc(W / 2, H / 2, r, 0, Math.PI * 2);
    g.fill();
    g.restore();
    g.strokeStyle = 'rgba(20,30,35,.9)';
    g.lineWidth = 3;
    g.beginPath();
    g.arc(W / 2, H / 2, r, 0, Math.PI * 2);
    g.stroke();
    g.strokeStyle = 'rgba(120,200,220,.5)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(W / 2 - r, H / 2);
    g.lineTo(W / 2 + r, H / 2);
    g.moveTo(W / 2, H / 2 - r);
    g.lineTo(W / 2, H / 2 + r);
    g.stroke();
    g.strokeStyle = 'rgba(120,200,220,.85)';
    g.beginPath();
    for (let i = -4; i <= 4; i++) {
      const y = H / 2 + i * r * 0.11;
      const len = i === 0 ? 14 : 8;
      g.moveTo(W / 2 - len, y);
      g.lineTo(W / 2 + len, y);
    }
    g.stroke();
  }
};

/* win / loss check, called every time a bot dies */
function checkWin() {
  const bots = Bots.aliveCount();
  if (Player.alive) {
    if (bots === 0) {
      Player.placement = 1;
      App.finishMatch(true);
    }
  } else if (App.state === 'SPECTATING' && bots <= 1) {
    Game.spectating = null;
    UI.setSpectate(null);
    App.finishMatch(false);
  }
}

/* =====================================================================
   BOOT - wire everything up, then run the frame loop.
   ===================================================================== */
(function boot() {
  if (!App.init()) return;
  let last = 0, acc = 0, frames = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    const t = now * 0.001;
    let dt = last ? (t - last) : 0.016;
    last = t;
    if (dt > 0.1) dt = 0.1;               // protects against tab-away spikes
    if (dt <= 0) return;
    if (App.paused) {
      /* keep the frozen frame behind the pause overlay */
      if (App.renderer && App.scene && App.camera) App.renderer.render(App.scene, App.camera);
      return;
    }
    if (App.state === 'MENU') {
      /* calm fly-around of the island once a match has been generated */
      if (World.group && App.scene && App.renderer) {
        CAM.pos.set(Math.cos(t * 0.05) * 240, 130, Math.sin(t * 0.05) * 240);
        CAM.yaw = t * 0.05 + Math.PI / 2;
        CAM.pitch = -0.26;
        CAM.sync();
        const cam = App.camera;
        cam.position.copy(CAM.pos);
        cam.rotation.set(CAM.pitch, -CAM.yaw, 0);
        cam.fov = 70;
        cam.updateProjectionMatrix();
        App.renderer.render(App.scene, cam);
      }
    } else {
      Game.update(dt);
      Game.render(dt);
    }
    acc += dt;
    frames++;
    if (acc > 0.5) {
      App.lastFps = Math.round(frames / acc);
      acc = 0;
      frames = 0;
    }
  }
  requestAnimationFrame(frame);
})();


