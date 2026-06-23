const GameState = {
  START: 0,
  PLAYING: 1,
  SHOW_BOARD: 2,
};
const GameApp = {
  MAX_SECONDS: 1 * 60,
  GAME_LEVEL: 1,
  PRODUCT_CENTER_X: 0,
  PRODUCT_CENTER_Y: 128,
  BRANDING_LINK: "https://bit.ly/4b3qiKf",
};

///////////
var currentSec = 0;
var gameState = GameState.START;
var score = 0;
var __maxScore = 0;
var gameAreaDiv,
  gameControls,
  scoreDiv,
  timerDiv,
  gameObj,
  gameBoard,
  productImg;

window.addEventListener("resize", onResize);

function getImageScale() {
  return gameObj.offsetWidth / gameObj.naturalWidth;
}

function onResize() {
  const scale = getImageScale();
  document.querySelectorAll(".pimple").forEach((img) => {
    const dleft = parseInt(img.getAttribute("dleft"));
    const dtop = parseInt(img.getAttribute("dtop"));
    const owidth = parseInt(img.getAttribute("owidth"));
    const x = (gameObj.offsetWidth - owidth) / 2 + dleft * scale;
    const y = (gameObj.offsetHeight - owidth) / 2 + dtop * scale;

    var scaledImgWidth = owidth * scale;
    var scaledImgHeight = owidth * scale;

    // Set new position and size
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.width = scaledImgWidth + "px";
    img.style.height = scaledImgHeight + "px";
  });
}

function animateAddScore(startX, startY, endX, endY) {
  // Create a div element
  var div = document.createElement("div");
  div.textContent = "+1";
  div.style.position = "absolute";
  div.style.left = `${startX - 25}px`;
  div.style.top = `${startY - 25}px`;
  div.style.pointerEvents = "none";
  div.style.width = "50px"; // initial width
  div.style.height = "50px"; // initial height
  div.classList.add("label");
  div.classList.add("score-pop");

  gameAreaDiv.appendChild(div);
  setTimeout(() => {
    div.style.left = `${endX}px`;
    div.style.top = `${endY}px`;
    div.style.opacity = 0;
    //div.style.width = "250px";  // Chrome lag, Safari OK
    //div.style.height = "250px";  // Chrome lag, Safari OK
    //div.style.scale = 5;  // Chrome lag, Safari OK
  }, 100);

  setTimeout(() => {
    div.remove(); 
    updateScoreView();
  }, 1100);
}

function toggleAnimationRemovePimple(p) {
  p.style.pointerEvents = "none"; // disable first
  var removalInterval = setInterval(() => {
    var opacity = p.style.opacity;
    if (opacity > 0) {
      opacity -= 0.1;
      p.style.opacity = opacity;
    } else {
      clearInterval(removalInterval);
      p.remove();
    }
  }, 50);
  animateAddScore(p.offsetLeft, p.offsetTop, scoreDiv.offsetLeft, 0);
}

function generateRandomPointInsideCircle(x, y, radius) {
  const theta = Math.random() * 2 * Math.PI;
  const r = Math.sqrt(Math.random()) * radius;
  const randomX = x + r * Math.cos(theta);
  const randomY = y + r * Math.sin(theta);
  return { x: randomX, y: randomY };
}

function setTimerDisplay() {
  const remainingSeconds = GameApp.MAX_SECONDS - currentSec;
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  const formattedMin = min < 10 ? "0" + min : min;
  const formattedSec = sec < 10 ? "0" + sec : sec;
  timerDiv.textContent = `${formattedMin}:${formattedSec}`;
}

function counting() {
  if (gameState == GameState.PLAYING) {
    currentSec++;
    setTimerDisplay();
    if (currentSec < GameApp.MAX_SECONDS || score >= __maxScore)
      setTimeout(counting, 1000);
    else endGame();
  }
}

function onPimpleClicked(e) {
  if (gameState != GameState.PLAYING) return;
  // Wait a little for the animation
  const p = e.currentTarget;
  setTimeout(() => {
    score++;
    toggleAnimationRemovePimple(p);
    playSound(`squelching0${Math.floor(Math.random() * 4) + 1}`);
  }, 300);
}

function createPimples(numberOfPimples, radius, x = 0, y = 0, maxSize = 42) {
  __maxScore += numberOfPimples;
  const gameAreaFragment = document.createDocumentFragment();
  for (let i = 0; i < numberOfPimples; i++) {
    const p = generateRandomPointInsideCircle(x, y, radius);
    const img = document.createElement("img");
    const ptype = Math.random() < 0.8 ? 1 : 2;
    img.setAttribute("dleft", p.x + x);
    img.setAttribute("dtop", p.y + y);
    img.setAttribute("class", "pimple");
    img.setAttribute("loading", "lazy");
    img.setAttribute("src", `./img/pimple-0${ptype}.webp`);
    const randomOpacity = 0.1 + Math.random() * 0.3;
    img.style.opacity = randomOpacity;
    const randomWidth =
      5 + Math.random() * (maxSize * (GameApp.GAME_LEVEL <= 2 ? 2 : 1) - 5);
    img.width = randomWidth;
    img.setAttribute("owidth", randomWidth);
    img.addEventListener("click", onPimpleClicked);
    gameAreaFragment.appendChild(img);
  }
  gameAreaDiv.appendChild(gameAreaFragment);
}

function cleanPimples() {
  var pimpleElements = gameAreaDiv.getElementsByClassName("pimple");
  while (pimpleElements.length > 0) {
    gameAreaDiv.removeChild(pimpleElements[0]);
  }
}

function updateScoreView() {
  scoreDiv.textContent = `${score}/${__maxScore}`;
}

function toggleAnimationVisibility(div, display) {
  div.style.display = display ? "block" : "none";
  if (display === "block") div.classList.add("game-on");
  else div.classList.remove("game-on");
}

function setProductLocation(x, y) {
  if (productImg) {
    productImg.style.left = `${x - GameApp.PRODUCT_CENTER_X}px`;
    productImg.style.top = `${y - GameApp.PRODUCT_CENTER_Y}px`;
  }
}

var __tmpDisableGameBoard = true;

function setGameState(newState) {
  __tmpDisableGameBoard = true;
  gameState = newState;
  toggleAnimationVisibility(
    document.querySelector("#home"),
    gameState == GameState.START
  );
  document.querySelector(".bgimg").style.backgroundImage = [
    GameState.PLAYING,
    GameState.SHOW_BOARD,
  ].includes(gameState)
    ? "url('./img/bg-01.webp')"
    : "url('./img/girl-01.webp')";
  toggleAnimationVisibility(
    gameAreaDiv,
    [GameState.PLAYING, GameState.SHOW_BOARD].includes(gameState)
  );
  toggleAnimationVisibility(gameControls, gameState == GameState.PLAYING);
  toggleAnimationVisibility(gameBoard, gameState == GameState.SHOW_BOARD);
  // Play music
  playSound(`bg-music-0${newState}`, true);
  if (gameState == GameState.SHOW_BOARD) {
    setTimeout(() => {
      __tmpDisableGameBoard = false;
    }, 2000);
  }
}

function newGame() {
  __maxScore = 0;
  currentSec = 0;
  score = 0;
  setGameState(1);
  cleanPimples();
  setTimerDisplay();

  // nose
  createPimples(2 * GameApp.GAME_LEVEL, 40, 2, -115, 26);
  createPimples(2 * GameApp.GAME_LEVEL, 55, 4, -70, 22);
  createPimples(3 * GameApp.GAME_LEVEL, 76, 8, -16, 32);
  //left
  createPimples(3 * GameApp.GAME_LEVEL, 88, -83, 10);
  //right
  createPimples(3 * GameApp.GAME_LEVEL, 88, 112, 0);
  //forhead
  createPimples(2 * GameApp.GAME_LEVEL, 30, 0, -220);
  createPimples(4 * GameApp.GAME_LEVEL, 90, 0, -170);
  createPimples(2 * GameApp.GAME_LEVEL, 30, -40, -190); //
  createPimples(2 * GameApp.GAME_LEVEL, 35, -50, -150); //
  createPimples(2 * GameApp.GAME_LEVEL, 30, 40, -190); //\\
  createPimples(2 * GameApp.GAME_LEVEL, 35, 50, -150); //\\
  // chin
  createPimples(2 * GameApp.GAME_LEVEL, 56, 18, 160);
  createPimples(2 * GameApp.GAME_LEVEL, 36, -40, 132, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 36, 55, 142, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 30, -90, 94, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 30, 90, 90, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 35, -120, 60, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 35, 115, 60, 32);
  // upper lip
  createPimples(2 * GameApp.GAME_LEVEL, 12, 10, 53, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 14, -25, 50, 32);
  createPimples(2 * GameApp.GAME_LEVEL, 14, 50, 50), 32;
  // Test only
  //createPimples(200, 200, 0, 0);
  // Generating done
  onResize();
  counting();
  updateScoreView();
}

function share(event) {
  event.preventDefault(); // Prevents the default action
  event.stopPropagation(); // Stops the event from propagating further
  html2canvas(document.body).then((canvas) => {
    console.log(canvas);
    // Convert canvas content to data URL
    var dataURL = canvas.toDataURL("image/jpeg", 1.0);
    // Create a shareable link with the image data URL
    var shareLink =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(dataURL);
    // Open share dialog using Facebook Share Dialog API
    window.open(shareLink, "_blank", "width=600,height=400");
  });
}

function endGame() {
  const heartCount = parseInt((score / __maxScore) * 6);
  let message = "?";

  const min = parseInt(currentSec / 60, 10);
  const sec = currentSec - min * 60;
  const formattedMin = min <= 9 ? "0" + min : min;
  const formattedSec = sec <= 9 ? "0" + sec : sec;

  if (score <= 0) message = "Hmm! No pimple has been cleaned!";
  else if (heartCount <= 0)
    message = `Only ${score} pimple${score > 1 ? "s have been" : " has been"
      } cleared within ${formattedMin}:${formattedSec} !`;
  else if (heartCount < 2) message = "Good job! But you need to work harder!";
  else if (heartCount < 4) message = "Wow! You're a pimple annihilator!";
  else
    message =
      currentSec < GameApp.MAX_SECONDS
        ? "Awesome! You are the best acne treatment specialist!"
        : "Awesome! You are the pro in acne treatment!";

  const stars = "💞".repeat(heartCount);

  gameBoard.innerHTML = `${stars}<br><br>${message}<br><br><span onclick="share(event)">📤</span>`;
  setGameState(2);
}

function resetGame() {
  if (__tmpDisableGameBoard) return;
  score = 0;
  currentSec = 0;
  setGameState(0);
  updateScoreView();
}

var __bgSoundOn = false;

function initGame() {
  gameAreaDiv = document.getElementById("game-area");
  gameControls = document.getElementById("game-controls");
  scoreDiv = document.getElementById("score");
  gameObj = document.getElementById("game-obj");
  timerDiv = document.getElementById("timer");
  gameBoard = document.getElementById("game-board");
  productImg = document.getElementById("product");

  document.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  document.body.addEventListener("click", () => {
    if (!__bgSoundOn) {
      playSound("bg-music-00", true);
      __bgSoundOn = true;
    }
  });
}

var backgroundMusic = null;

function playSound(id, isBackground = false) {
  var audio = document.getElementById(id);
  if (audio) {
    if (isBackground) {
      audio.volume = 0.2;
      if (backgroundMusic) {
        backgroundMusic.pause(); // Pauses the playback
        backgroundMusic.currentTime = 0;
      }
      backgroundMusic = audio;
    }
    audio.play();
  }
}

function startGame() {
  playSound("soundPop");
  newGame();
}

function openBrandingLink() {
  window.open(GameApp.BRANDING_LINK, "_blank");
}

function onTouchStart(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
  if (e.clientX && e.clientY) setProductLocation(e.clientX, e.clientY);
}

function onMouseMove(e) {
  if (e.clientX && e.clientY) setProductLocation(e.clientX, e.clientY);
}
