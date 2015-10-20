import HexGrid from '../objects/HexGrid';
import { log } from '../utils/debug';

class GameState extends Phaser.State {

  preload() {
    this.load.image('hex', 'assets/sprites/hex-2.png');
    this.game.time.advancedTiming = true;
  }

  create() {
    let grid = new HexGrid(this.game);
    this.game.stage.backgroundColor = 0xd0eafa;
  }

  update () {
    log("FPS: " + this.game.time.fps, 0);
  }
}

export default GameState;