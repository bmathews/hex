import HexGrid from '../objects/HexGrid';

class GameState extends Phaser.State {

  preload() {
    this.load.image('hex', 'assets/sprites/hex.png');
  }

  create() {
    let grid = new HexGrid(this.game);
  }

}

export default GameState;