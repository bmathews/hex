var el;

window.addEventListener('load', function () {
  el = document.getElementById("debug");
  el.innerHTML = new Array(13).join('\n');
});

export default {
  log (msg, line = 2) {
    requestAnimationFrame(function () {
      var split = el.innerHTML.split('\n');
      split[line] = msg;
      el.innerHTML = split.join('\n');
    });
  }
}