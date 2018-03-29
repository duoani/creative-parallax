var sourceMap = require('resource.json');
var MainframeBridge = require('rmi.js/MainframeBridge');
var rmi = require('rmi.js/rmi');
require('es6-promise').polyfill();

// 开放调用的 api 方法列表
var server = rmi.create('mainframe');

server.addApi({
  'getSourceMap': function () {
    return Promise.resolve(sourceMap);
  },
  'close': function () {
    console.log('close');
    return Promise.resolve();
  },
  'download': function () {
    console.log('download');
    return Promise.resolve();
  },
  'log': function (msg) {
    console.log(msg);
    return Promise.resolve();
  }
});

server.pipe(new MainframeBridge());

var iframeId = 'test-iframe-gen';
var $ = function (id) {
  return document.getElementById(id);
};

var loaded = false;

$('btnLoadIFrame').addEventListener('click', function () {
  if (loaded) {
    return false;
  }

  loaded = loadFrame(iframeId, './index.html?id=' + iframeId);

  setTimeout(function () {
    server.invoke(iframeId, 'render');
  }, 1000);
}, false);

function loadFrame(id, url) {
  var iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.src = url;
  iframe.className = 'iframe';
  iframe.style.width = '480px';
  iframe.style.height = '640px';
  document.body.appendChild(iframe);
  return true;
}

