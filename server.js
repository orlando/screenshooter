var express = require('express');
var request = require('request');
var childProcess = require('child_process');
var binPath = "phantomjs"
var app = express();
app.use(express.bodyParser());

app.get('/screenshot', function(req, res){
  res.send('Hello World');
});

app.post('/screenshot', function(req, res){
  var url = req.body.url;
  var skinId = req.body.skin_id;
  var callback = req.body.callback;
  if(!(url && skinId && callback)){
    res.header("Content-Type", "application/json");
    res.send({status:"error",message:"Params Missing"});
    return false
  }
  else{
    res.header("Content-Type", "application/json");
    res.send({status:"success",message:"Kosher"});
  };
  var childArgs = ['screenshotter.js', url];
  childProcess.execFile(binPath, childArgs, {maxBuffer: 5 * 1024 *1024}, function(err, stdout, stderr) {
    var base64 = stdout;
    request.post({headers:{api_key:"eefc91178354e0360ceef68ece69b215"}, url:'http://default.breezi.local:3000/api/v1/community/skins/screenshot', method: 'POST', json:true, body:{skinId: skinId, base64:base64}});
  });
});

app.listen(8080);
console.log('Listening on port 8080');
