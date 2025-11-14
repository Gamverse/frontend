// Gamverse SDK v1.0
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gamverse-api-production.up.railway.app';

window.Gamverse = {
  start: (email) => {
    if (!email) return console.error('Email required');
    fetch(`${API_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(r => r.json())
    .then(data => {
      if (data.ok) console.log('Session started');
    })
    .catch(err => console.error('Start failed:', err));
  }
};
