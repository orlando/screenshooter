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
    console.log(msg);
  };

  page.onLoadFinished = function(status) {
    if (status !== 'success') {
      console.log('Unable to access the network!');
      phantom.exit();
    }
    console.log('page.onLoadFinished');
    console.log(url);
    var pageClipRect = page.evaluate(function(){return document.getElementById("skin_preview").getBoundingClientRect();});
    page.clipRect = {
      top:    pageClipRect.top,
      left:   pageClipRect.left,
      width:  pageClipRect.width,
      height: pageClipRect.height
    }
    //page.render("test.png");
    console.log(page.renderBase64("png"));
    phantom.exit();
  };

  page.open(url);
}
