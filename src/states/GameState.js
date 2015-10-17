import HexGrid from '../objects/HexGrid';

class GameState extends Phaser.State {

  preload() {
    this.load.image('hex', 'assets/sprites/hex-2.png');
  }

  create() {
    let grid = new HexGrid(this.game);
    this.game.stage.backgroundColor = 0xd0eafa;
  }
}

export default GameState;