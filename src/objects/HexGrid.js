import utils from '../utils/hex';

const GRID_SIZE_X = 20;
const GRID_SIZE_Y = 20;
const HEX_WIDTH = 20;
const HEX_HEIGHT = 14;
const MAP_RADIUS = 6;

class HexGrid extends Phaser.Group {

  constructor(game) {
    super(game);
    this._createBoard();
    this.game.stage.addChild(this);
  }


  /* Create a sprite from a tile */

  _createSprite(hex) {
    let { x, y } = utils.hexToPixel(hex, HEX_WIDTH);
    let sprite = this.create(x - HEX_WIDTH + this.game.world.centerX, y  - HEX_WIDTH + this.game.world.centerY, 'hex');
    sprite.tint = hex.color;
    return sprite;
  }


  /* Get a hex tile at row, column */

  getHex (r, q) {
    if (this.map[r] && this.map[r][q]) {
      return this.map[r][q];
    }
  }


  /* Set a hex tile at row, column*/

  setHex (r, q, hex) {
    this.map[r][q] = hex;
  }


  /* Create a hexagon map */

  _createHexagonMap () {
    var map = {};

    let radius = MAP_RADIUS;
    for (let q = -radius; q <= radius; q++) {
      map[q] = {};
      let r1 = Math.max(-radius, -q - radius);
      let r2 = Math.min(radius, -q + radius);
      for (let r = r1; r <= r2; r++) {
        map[q][r] = { q, r, color: Math.random() * 0xffffff };
      }
    }

    return map;
  }


  /* Create a board and add the sprites */

  _createBoard() {
    let map = this.map = this._createHexagonMap();

    for (let r in map) {
      for (let q in map[r]) {
        this._createSprite(map[r][q]);
      }
    }
  }
}

export default HexGrid;