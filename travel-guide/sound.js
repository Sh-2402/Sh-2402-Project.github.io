
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('page-sound');
    if (!audio) return;

    audio.preload = 'auto';
    audio.playsInline = true;
    audio.volume = 1.0;

    audio.play().then(() => {
      console.log('Audio autoplayed');
    }).catch(err => {
      console.warn('Autoplay blocked or failed:', err);
      showFallbackPlayButton(audio);
    });

    if (!localStorage.getItem('site-sound-played')) {
       attemptPlay();
     }

    function showFallbackPlayButton(audioEl) {
      if (document.getElementById('play-sound-btn')) return;

      const btn = document.createElement('button');
      btn.id = 'play-sound-btn';
      btn.textContent = 'Play sound';
      Object.assign(btn.style, {
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        zIndex: 9999,
        padding: '0.6rem 1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        background: '#222',
        color: '#fff',
        fontSize: '0.95rem',
      });

      btn.addEventListener('click', async () => {
        try {
          await audioEl.play();
          console.log('User-initiated playback succeeded');
          btn.remove();
        } catch (err) {
          console.error('Playback still failed on user gesture:', err);
        }
      });

      document.body.appendChild(btn);
    }
  });
})();
