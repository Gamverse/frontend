window.Gamverse = {
  init: (config) => {
    console.log('Gamverse SDK initialized', config);
    fetch('https://api.gamverse.io/sdk/init', {
      method: 'POST',
      body: JSON.stringify(config)
    });
  },
  onPlay: (callback) => {
    window.addEventListener('gamverse-play', (e) => callback(e.detail));
  }
};
