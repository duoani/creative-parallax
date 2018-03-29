require('./importCSS');
require('es6-promise').polyfill();

var IframeBridge = require('rmi.js/IframeBridge');
var rmi = require('rmi.js/rmi');
var Parallax = require('parallax/Parallax');

var sourceMap = null;
// {
//  images: {
//    'logo.png': 'logo.png',
//    'bg.jpg': 'bg.jpg',
//    'character_1.png': 'character_1.png',
//    'character_3.png': 'character_3.png',
//    'cookie_10.png': 'cookie_10.png',
//    'cookie_11.png': 'cookie_11.png',
//    'cookie_12.png': 'cookie_12.png',
//    'cookie_4.png': 'cookie_4.png',
//    'cookie_6.png': 'cookie_6.png',
//    'cookie_7.png': 'cookie_7.png',
//    'cookie_8.png': 'cookie_8.png',
//    'cookie_9.png': 'cookie_9.png',
//    'btn-download.png': 'btn-download.png'
//  }
// };

window.onload = function() {
	document.body.classList.remove('preload');
};

window.onresize = function() {
};

document.ontouchmove = function(e) {
	e.preventDefault();
};

var frameId = getQueryString('id');
var client = rmi.create(frameId);
client.addApi({
  // SDK 会调用此方来初始化页面
  render: function () {
    sourceMap && Parallax.init(sourceMap);
    return Promise.resolve();
  }
});

client.pipe(new IframeBridge());

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

if (window.addEventListener) {
  window.addEventListener('error', function (e) {
    client.invoke('mainframe', 'log', e.message + '\n' + e.stack);
  }, false);
}

client.invoke('mainframe', 'getSourceMap').then(function (map) {
  sourceMap = map;
});

document.querySelector('.btn-close').addEventListener('click', onClose, false);
document.querySelector('.cta').addEventListener('click', onDownload, false);

function onClose (e) {
  client.invoke('mainframe', 'close');
}

function onDownload (e) {
  client.invoke('mainframe', 'download');
}
