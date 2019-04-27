const $deathCount = document.querySelector("#js-death-counter");
const $modal = document.querySelector(".modal-overlay");
const $modalCloseBtn = $modal.querySelector(".button-close");

const closeModal = () => {
  $modal.classList.add("is-hidden");
};

const openModal = ({ deathCount }) => {
  $deathCount.textContent = deathCount;

  $modal.classList.remove("is-hidden");
};

//-- State ------------------------------------------------------------
let allEnemies = [];
let allTreasure = [];
let player = null;
//-- State End ---------------------------------------------------------

const mkRandomInt = limit => Math.floor(Math.random() * limit);
const mkRandomTreasure = () => new Treasure(mkRandomInt(4), mkRandomInt(5));

const mkGameEntities = () => {
  allEnemies = [
    new Enemy(2, 1),
    new Enemy(4, 2),
    new Enemy(1, 2),
    new Enemy(0, 3),
    new Enemy(3, 4)
  ];

  allTreasure = Array.from(
    { length: Math.max(2, mkRandomInt(5)) },
    mkRandomTreasure
  );

  player = new Player({
    totalTreasure: allTreasure.length,
    openModal
  });
};

//-- Event Handlers ---------------------------------------------------

const setup = () => {
  mkGameEntities();

  const restartGame = () => {
    mkGameEntities();
    closeModal();
  };

  $modal.addEventListener("click", e => {
    if (e.srcElement.id === $modal.id) {
      restartGame();
    }
  });

  $modalCloseBtn.addEventListener("click", restartGame);

  document.addEventListener("keyup", e => {
    const allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
};

setup();
