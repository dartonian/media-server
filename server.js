const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      path = require('path'),
      fs = require('fs'),
      logger = require('morgan'),
      methodOverride = require('method-override'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      errorHandler = require('errorhandler'),
      favicon = require('serve-favicon');

let vList;

app.set('port', process.env.TEST_PORT || 8000);
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

const videos = (__dirname + '/public/videos');

fs.readdir(videos, (err, files) => {
  if(err) {
    console.log(err);
    return;
  }

  vList = files;
});

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/api/list', (req, res)=>{
    res.send(vList);
    res.end();
});

server.listen(app.get('port'), ()=>{
  console.log('Boss TV is running on port ' + app.get('port'));
});