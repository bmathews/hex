class HexTile extends Phaser.Group {
  constructor (game, hex, x, y, name) {
    x = Math.round(x);
    y = Math.round(y);
    super(game, x, y, name);
    this.hex = hex;
    
    this.image = new Phaser.Image(game, x, y, name);
    this.image.anchor.set(0.5);
    this.add(this.image);
  }

  set tint(tint) {
    this.image.tint = tint;
  }
}

export default HexTile;