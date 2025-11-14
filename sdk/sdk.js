// Gamverse SDK v1.0 — Live API
const API_URL = 'https://gamverse-api-production.up.railway.app';

// Public API
window.Gamverse = {
  init: (config = {}) => {
    fetch(`${API_URL}/sdk/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: config.gameId,
        publisher: config.publisher,
        version: '1.0.0'
      })
    }).catch(err => console.error('Gamverse init failed:', err));
  },
  start: (email) => {
    if (!email) return console.error('Gamverse: Email required');
    fetch(`${API_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(r => r.json())
    .then(data => {
      if (data.ok) console.log('Gamverse: Session started');
    })
    .catch(err => console.error('Gamverse start failed:', err));
  },
  verify: (sessionId, playTimeMinutes) => {
    if (!sessionId || !playTimeMinutes) return console.error('Gamverse: Data required');
    fetch(`${API_URL}/pop/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, playTime: playTimeMinutes })
    })
    .then(r => r.json())
    .then(data => {
      if (data.ok) console.log('Gamverse: £25 payout sent!');
    })
    .catch(err => console.error('Gamverse verify failed:', err));
  }
};

// Auto-init on Vercel
if (window.location.hostname.includes('vercel.app')) {
  window.Gamverse.init({ gameId: 'demo-001', publisher: 'Gamverse' });
}
