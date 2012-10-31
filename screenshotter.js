var page = require('webpage').create(),
    url;

if (phantom.args.length < 1) {
  console.log('Usage: screenshotter.js URL');
  phantom.exit();
}
else{
  url = address = phantom.args[0];
  page.injectJs('./jquery.js');
  page.viewportSize = { width: 1280, height: 720 };

  page.onConsoleMessage = function(msg) {
    try {
      JSON.parse(msg);
    } catch (e) {
      return false;
    }
    json = JSON.parse(msg);
    console.log(json.base64);
  };

  page.onLoadFinished = function(status) {
    if (status !== 'success') {
      console.log('Unable to access the network!');
      phantom.exit();
    }
    var pageClipRect = page.evaluate(function(){return document.getElementById("skin_preview").getBoundingClientRect();});
    page.clipRect = {
      top:    pageClipRect.top,
      left:   pageClipRect.left,
      width:  pageClipRect.width,
      height: pageClipRect.height
    }
    console.log(JSON.stringify({base64:page.renderBase64("png")}));
    phantom.exit();
  };

  page.open(url);
}
