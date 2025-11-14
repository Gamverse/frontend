
// Gamverse SDK — 1-line integration
// Live API URL (working now)
const API_URL = 'https://gamverse-api-production.up.railway.app';

// Public API for game publishers
window.Gamverse = {
  // Initialize SDK (optional config)
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

  // Start earning session
  start: (email) => {
    if (!email) {
      console.error('Gamverse: Email required for start()');
      return;
    }
    fetch(`${API_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        console.log('Gamverse: Session started');
        // Trigger in-game earning UI
        document.dispatchEvent(new CustomEvent('gamverse:session-start', { detail: data }));
      }
    })
    .catch(err => console.error('Gamverse start failed:', err));
  },

  // Verify play time & trigger payout
  verify: (sessionId, playTimeMinutes) => {
    if (!sessionId || !playTimeMinutes) {
      console.error('Gamverse: sessionId and playTimeMinutes required');
      return;
    }
    fetch(`${API_URL}/pop/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        playTime: playTimeMinutes
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.ok) {
        console.log('Gamverse: £25 payout sent!');
        document.dispatchEvent(new CustomEvent('gamverse:payout-success', { detail: data }));
      } else {
        console.error('Gamverse payout failed:', data.error);
      }
    })
    .catch(err => console.error('Gamverse verify failed:', err));
  }
};

// Auto-init for demo
if (window.location.hostname.includes('vercel.app')) {
  window.Gamverse.init({ gameId: 'demo-001', publisher: 'Gamverse' });
}
