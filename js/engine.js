var Engine = (function(global) {
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  function main() {
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;

    win.requestAnimationFrame(main);
  }

  function init() {
    reset();
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    updateEntities(dt);
    checkCollisions();
  }

  function checkCollisions() {
    allEnemies.forEach(enemy => {
      if (enemy.checkCollisions(player)) {
        player.killAndResetPosition();
      }
    });
    allTreasure.forEach(treasure => {
      if (treasure.checkCollisions(player)) {
        player.collectTreasure();
        allTreasure = allTreasure.filter(x => x !== treasure);
      }
    });
  }

  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    allTreasure.forEach(function(treasure) {
      treasure.update(dt);
    });
    player.update();
  }

  function render() {
    var rowImages = [
        "images/monsterinc.png",
        "images/grass-block.png",
        "images/stone-block.png",
        "images/water-block.png",
        "images/stone-block.png",
        "images/grass-block.png"
      ],
      numRows = 6,
      numCols = 5,
      row,
      col;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }

  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
    allTreasure.forEach(function(treasure) {
      treasure.render();
    });
  }

  function reset() {
    player.win = false;
    player.x = 0;
    player.y = 5;
  }

  Resources.load([
    "images/stone-block.png",
    "images/water-block.png",
    "images/grass-block.png",
    "images/mike.png",
    "images/sully.png",
    "images/boo.png",
    "images/monsterinc.png"
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
