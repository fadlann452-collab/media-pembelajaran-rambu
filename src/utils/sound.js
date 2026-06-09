let _ctx = null;
function ctx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}
function tone(freqs) {
  try {
    const c = ctx();
    freqs.forEach(({ f, t = 0, d = 0.25 }) => {
      const o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.frequency.value = f;
      g.gain.setValueAtTime(0.25, c.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + d);
      o.start(c.currentTime + t);
      o.stop(c.currentTime + t + d);
    });
  } catch (_) {}
}
export const playCorrect = () => tone([{ f: 523 }, { f: 659, t: 0.1 }, { f: 784, t: 0.2, d: 0.3 }]);
export const playWrong   = () => tone([{ f: 350 }, { f: 250, t: 0.15, d: 0.3 }]);
export const playClick   = () => tone([{ f: 900, d: 0.07 }]);
export const playWin     = () => tone([{ f: 523 }, { f: 659, t: 0.1 }, { f: 784, t: 0.2 }, { f: 1047, t: 0.3, d: 0.5 }]);