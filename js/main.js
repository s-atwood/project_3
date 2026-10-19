const tank = document.getElementById('tank');
const fishies = document.querySelectorAll('.fish');
const fishImages = ['assets/images/fish1.png', 'assets/images/fish2.png', 'assets/images/fish3.png', 'assets/images/fish4.png', 'assets/images/fish5.png', 'assets/images/bearfish.png'];

// main animation loop
fishies.forEach(function (fish) {
  const randomImg = Math.floor(Math.random() * fishImages.length);
  fish.style.backgroundImage = `url('${fishImages[randomImg]}')`;

  let x = Math.floor(Math.random() * (tank.clientWidth - 150));
  let y = Math.floor(Math.random() * (tank.clientHeight - 130));

  // initial fish spawn points
  fish.style.left = x + 'px';
  fish.style.top = y + 'px';

  let normalSpeed = 2;
  let fastSpeed = 6;
  let currentSpeed = normalSpeed;
  let movingRight = Math.random() > 0.5;
  let movingDown = Math.random() > 0.5;

  // continuous movement loop
  setInterval(function () {
    // x-axis movement
    if (movingRight) {
      x += currentSpeed;
      if (x >= tank.clientWidth - 150) {
        movingRight = false;
      }
    } else {
      x -= currentSpeed;
      if (x <= 0) {
        movingRight = true;
      }
    }

    // y-axis movement
    if (movingDown) {
      y += currentSpeed;
      if (y >= tank.clientHeight - 130) {
        movingDown = false;
      }
    } else {
      y -= currentSpeed;
      if (y <= 0) {
        movingDown = true;
      }
    }

    // flip image when direction changes
    if (movingRight) {
      fish.classList.add('face-left');
    } else {
      fish.classList.remove('face-left');
    }

    // adjust position
    fish.style.left = x + 'px';
    fish.style.top = y + 'px';
  }, 30);


  // randomized timer for direction change
  function directionChangeLoop() {

    let randomDelay = Math.floor(Math.random() * (8000 - 2000)) + 2000;

    setTimeout(function () {

      movingRight = !movingRight;
      directionChangeLoop();
    }, randomDelay);

  }
  directionChangeLoop();

  let resetSpeedTimer = null;

  // increase fish speed on mouse click
  fish.addEventListener('click', function () {
    currentSpeed = fastSpeed;

    if (resetSpeedTimer != null) {
      clearTimeout(resetSpeedTimer);
    }
    resetSpeedTimer = setTimeout(function () {
      currentSpeed = normalSpeed;
    }, 3000);
  });
});
