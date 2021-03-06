import utils from '../utils/hex';
import { log } from '../utils/debug';
import HexTile from './HexTile';

const GRID_SIZE_X = 20;
const GRID_SIZE_Y = 20;
const HEX_WIDTH = 50;
const HEX_HEIGHT = 86;
const MAP_RADIUS = 6;

class HexGrid extends Phaser.Group {

  constructor(game) {
    super(game);
    this.position.x = this.game.world.centerX;
    this.position.y = this.game.world.centerY;
    this.game.stage.addChild(this);
    this.game.input.addMoveCallback(this._mouseMove.bind(this));
    this.layout = utils.Layout(utils.layout_flat, utils.Point(HEX_WIDTH, HEX_WIDTH), utils.Point(0, 0));
    this._createBoard();
  }

  _mouseMove (pointer, x, y) {
    x -= this.position.x;
    y -= this.position.y;
    let { r, q } = utils.hex_round(utils.pixel_to_hex(this.layout, utils.Point(x, y)));
    let tile = this.getTile(q, r);
    log(`Mouse: x: ${x}, y: ${y}`, 18);
    if (tile) {
      if (tile === this.focusedTile) {
        return;
      }
      if (this.focusedTile) {
        this.focusedTile.sprite.tint = this.focusedTile.color;
      }
      if (this.path) {
        this.path.forEach((p) => {
          let i = this.getTile(p.q, p.r);
          i.sprite.tint = 0xffffff; 
          i.sprite.image.loadTexture(i.name, 0, false);
        });
      }
      let lineStart = this.getTile(0, 0);
      let lineEnd = tile;
      let path = utils.hex_linedraw(utils.Hex(lineStart.q, lineStart.r, -lineStart.q-lineStart.r), utils.Hex(lineEnd.q, lineEnd.r,-lineEnd.q-lineEnd.r));
      path.forEach((p, i) => {
        let t = this.getTile(p.q, p.r);
        if (i !== path.length - 1) {
          var prev = path[i+1];
          var directionHex = utils.hex_subtract(p, prev);
          var directionIndex;
          utils.hex_directions.some((d, idx) => {
            if (utils.hex_equals(d, directionHex)) {
              switch (idx) {
                case 1:
                case 4:
                  t.sprite.image.loadTexture('road-60-240', 0, false);
                  break;
                case 0:
                case 3: 
                  t.sprite.image.loadTexture('road-120-300', 0, false);
                  break;
                default:
                  t.sprite.image.loadTexture('road', 0, false);
                  break;
              }
              return true;
            }
          });
        } else {
          t.sprite.image.loadTexture('road', 0, false);
        }
        t.sprite.tint = 0xeeeeee; 
      });
      this.focusedTile = tile;
      log(`Focused: r: ${this.focusedTile.r}, q: ${this.focusedTile.q}`, 19);
      this.path = path;
    }
  }


  /* Create a sprite from a tile */

  _createSprite(hex) {
    var sprites = ['forest', 'water', 'mountain'];
    var name = sprites[Math.floor(Math.random() * sprites.length)];
    let { x, y } = utils.hex_to_pixel(this.layout, hex);
    let sprite = new HexTile(this.game, hex, x, y, name);
    this.add(sprite);
    hex.sprite = sprite;
    hex.name = name;
    return sprite;
  }


  /* Get a tile at column, row */

  getTile (q, r) {
    return this.map[q] && this.map[q][r];
  }


  /* Set a tile at column, row */

  setTile (q, r, hex) {
    this.map[q][r] = hex;
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

  _createRectangleMap () {
    var map = {};
    var map_height = 10;
    var map_width = 5;

    for (var r = 0; r < map_height; r++) {
      var r_offset = Math.floor(r/2); // or r>>1
      for (var q = -r_offset; q < map_width - r_offset; q++) {
        if (!map[q]) { map[q] = {}; }
        map[q][r] = { q, r, color: Math.random() * 0xffffff };
      }
    }

    return map;
  }


  /* Create a board and add the sprites */

  _createBoard() {
    let map = this.map = this._createHexagonMap();

    for (let q in map) {
      for (let r in map[q]) {
        this._createSprite(map[q][r]);
      }
    }
  }
}

export default HexGrid;