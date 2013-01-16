
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
//  , lvdb= require('lvdb_client')
  , httpd= require('./routes/httpd.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/lvdb/httpd/:dbCmd', httpd.dbCmd);

/*
var connection=new(lvdb.Connection)();
app.get('/lvdb',function(req,res){
	var sql="select * from gbl_time_state where id=1 and ts>0 order by ts ASC limit 100";
	connection.sql(25,sql,function(err,data){
      if(err){
    	  res.send(500, { error: err });
      } else{ 		
	      res.send(data);
	  }		
	});
});
*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
