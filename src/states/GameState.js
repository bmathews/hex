import HexGrid from '../objects/HexGrid';
import { log } from '../utils/debug';

class GameState extends Phaser.State {

  preload() {
    this.load.image('forest', 'assets/sprites/hex-2.png');
    this.load.image('water', 'assets/sprites/water.png');
    this.load.image('mountain', 'assets/sprites/mountain.png');
    this.load.image('road', 'assets/sprites/road.png');
    this.load.image('road-60-240', 'assets/sprites/road-60-240.png');
    this.load.image('road-120-300', 'assets/sprites/road-120-300.png');
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