/**
 * Created with JetBrains WebStorm.
 * User: kun
 * Date: 1/22/13
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
//https://github.com/felixge/node-mysql

var mysql= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  password : 'test',
  database : 'nuwadb_v2'
});

connection.connect();

handleDisconnect(connection);

function handleDisconnect(connection) {
    connection.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        console.log('Re-connecting lost connection: ' + err.stack);

        connection = mysql.createConnection(connection.config);
        handleDisconnect(connection);
        connection.connect();
    });
};


function partition_list_handle(req,res){
  connection.query('SELECT id,start_time,end_time,create_time,close_time from partitions order by create_time DESC', function(err, rows, fields) {
  if (err) {
    res.send(500, { error: "mysql error:" + err });
	return;
  }
  res.send(JSON.stringify(rows));
});

};

exports.mgmCmd = function(req, res){
  var cmd=req.params.mgmCmd;
  console.log(cmd);
  if(cmd=="partition_list") return partition_list_handle(req,res);

  res.send("Mgm command not supported: " + req.params.mgmCmd );

};