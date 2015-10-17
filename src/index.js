import GameState from './states/GameState';

class Game extends Phaser.Game {

  constructor() {
    super(document.body.offsetWidth, document.body.offsetHeight, Phaser.AUTO, 'content', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

}

new Game();