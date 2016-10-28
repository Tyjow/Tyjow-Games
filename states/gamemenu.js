var GameMenu = function(game) {};

GameMenu.prototype = {
  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#fff', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(30, (this.optionCount * 80) + 200, text, optionStyle);
    txt.stroke = "rgb(1,1,1)";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#000";
      target.stroke = "rgb(255,255,255)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#fff";
      target.stroke = "rgb(1,1,1)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function () {
    console.log(music);
    if (music.name !== "music-menu" && playMusic) {
      music.stop();
      music = game.add.audio('music-menu');
      music.loop = true;
      music.play();
    }
    this.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    var titleStyle = { font: 'bold 60pt TheMinion', fill: '#ccccb3', align: 'center'};
    var text = game.add.text(game.world.centerX, 100, "Heroes Side", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);
    this.addMenuOption('Commencer', function (e) {
      this.game.state.start("Game");
    });
    this.addMenuOption('Options', function (e) {
      this.game.state.start("Options");
    });
    this.addMenuOption('Credits', function (e) {
      this.game.state.start("Credits");
    });

  }
};