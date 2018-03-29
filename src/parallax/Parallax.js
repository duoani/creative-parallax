require('vender/parallax');

exports.init = function (sourceMap) {
  var images = sourceMap.images || {};
  // Load assets
  var imgs = document.getElementsByTagName('img');
  if (imgs && imgs.length) {
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var src = img.getAttribute('data-src');
      img.src = images[src];
    }
  }

  // Pretty simple huh?
  var scene = document.getElementById('scene');
  scene.style.backgroundImage = 'url(' + images['bg.jpg'] + ')';
  var parallax = new Parallax(scene);
};
