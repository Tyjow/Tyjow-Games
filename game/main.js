var game = new Phaser.Game(800, 600, Phaser.CANVAS,''),
Main = function () {},
gameOptions = {
    playSound: true,
    playMusic: true
  },
music;


Main.prototype = {

  preload: function () {
    game.load.image('tileset', 'assets/tilesets/tileset.png');
    game.load.image('bg', 'assets/sprites/BG.png');
    game.load.image('nuit',    'assets/images/Nuit.png');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');
    game.load.script('polyfill', 'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');
    game.load.script('HealthBar.standalone',  'states/HealthBar.standalone.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');