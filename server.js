var express = require('express');
var request = require('request');
var spawn = require('child_process').spawn;
var app = express();
var command = "phantomjs";
var args = ["screenshotter.js"];
app.use(express.bodyParser());

app.get('/screenshot', function(req, res){
  res.send('Hello World');
});

app.post('/screenshot', function(req, res){
  var url = req.body.url;
  var skinId = req.body.skin_id;
  var callback = req.body.callback;
  args.push(url);
  var phantom = spawn(command, args);
  var base64 = phantom.stdout;
  console.log(base64);
  request.post('http://default.breezi.local:3000/api/v1/community/skins/screenshot',{method: 'POST', json:true, body:JSON.stringify({skinId: skinId, base64:base64})});
});

app.listen(8080);
console.log('Listening on port 8080');
