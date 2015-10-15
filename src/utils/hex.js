
/* Round out potentially float coordinates to int coordinates */

function hexRound (h) {
  var x = h.q;
  var z = h.r;
  var y = -x-z;

  var rx = Math.round(x);
  var ry = Math.round(y);
  var rz = Math.round(z);

  var x_diff = Math.abs(rx - x);
  var y_diff = Math.abs(ry - y);
  var z_diff = Math.abs(rz - z);

  if (x_diff > y_diff && x_diff > z_diff) {
    rx = -ry-rz;
  } else if (y_diff > z_diff) {
    ry = -rx-rz;
  } else {
    rz = -rx-ry;
  }

  return { q: rx, r: ry };
}


/* Pixel to hex */

function pixelToHex (x, y, size) {
  let q = x * 2/3 / size;
  let r = (-x / 3 + Math.sqrt(3)/3 * y) / size
  return hexRound({q, r});
}


/* Hex to pixel */

function hexToPixel (h, size) {
  let x = size * 3/2 * h.q;
  let y = size * Math.sqrt(3) * (h.r + h.q/2);
  return { x , y };
}

export default {
  hexRound,
  pixelToHex,
  hexToPixel
};