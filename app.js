
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs') 
//  , lvdb= require('lvdb_client')
  , httpd= require('./routes/httpd.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
//  app.use(express.bodyParser());
  app.use(express.bodyParser({ 
	    keepExtensions: true, 
//	    uploadDir: __dirname + '/tmp',
	    uploadDir: '/tmp',
	    limit: '2048mb'
	  }));

  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.index);
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/upload.html');
});

var mustache = require('mustache'); 
app.get('/analysis', function (req, res) {
	var query=req.query;
	var pId=query.pId;
	var m_template=fs.readFileSync(__dirname + '/public/index_topk.html', "utf8");
	var html = mustache.to_html(m_template, {partitionId:pId}); // replace all of the data
	res.send(html); // send to client
	
});

app.get('/lvdb/httpd/:dbCmd', httpd.dbCmd);

var lvdb_upload=require('./routes/upload.js');
app.post('/upload', lvdb_upload.upload);
app.get('/upload/status', lvdb_upload.status);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

