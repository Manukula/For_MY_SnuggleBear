function startMusic() {
  const bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;

  bgMusic.volume = 0.45;
  bgMusic.muted = false;
  bgMusic.play().catch(function (error) {
    console.log('Autoplay was blocked until user interaction:', error);
  });
}

window.addEventListener('load', function () {
  setTimeout(function () {
    startMusic();
  }, 5000);

  document.body.addEventListener('pointerdown', startMusic, { once: true });
  document.body.addEventListener('keydown', startMusic, { once: true });
  document.body.addEventListener('touchstart', startMusic, { once: true });
});

function moveRandomEl(elm) {
  const maxX = window.innerWidth - elm.offsetWidth - 16;
  const maxY = window.innerHeight - elm.offsetHeight - 16;

  const randomX = Math.max(10, Math.random() * maxX);
  const randomY = Math.max(10, Math.random() * maxY);

  elm.style.left = `${randomX}px`;
  elm.style.top = `${randomY}px`;
  elm.style.transform = "translate(0, 0)";
}

const moveRandom = document.querySelector('#move-random');

if (moveRandom) {
  moveRandom.style.position = 'relative';
  moveRandom.style.left = '0';
  moveRandom.style.top = '0';

  moveRandom.addEventListener('mouseenter', function (event) {
    moveRandomEl(event.target);
  });

  moveRandom.addEventListener('pointerenter', function (event) {
    moveRandomEl(event.target);
  });

  moveRandom.addEventListener('touchstart', function (event) {
    event.preventDefault();
    moveRandomEl(event.target);
  }, { passive: false });

  moveRandom.addEventListener('click', function (event) {
    event.preventDefault();
    moveRandomEl(event.target);
  });

  window.addEventListener('resize', function () {
    const rect = moveRandom.getBoundingClientRect();
    const maxRight = window.innerWidth - rect.width;
    const maxBottom = window.innerHeight - rect.height;

    if (rect.left > maxRight || rect.top > maxBottom) {
      moveRandomEl(moveRandom);
    }
  });
}
