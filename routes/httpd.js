var lvdb= require('lvdb_client');

//var connection=new(lvdb.Connection)();
var connection=new lvdb.Connection();

var time_state_handle=function(req,res){
	  var query=req.query;
	  var pId=query.pId;
	//var tableName=query.table;
	  if(!pId){
		  res.send(500, { error: "partitionId missing!" });
		  return;
	  }
	  var sql="select * from gbl_time_state where id=1 and ts>0 order by ts ASC limit 100";
		connection.sql(pId,sql,function(err,data){
	    if(err){
	  	    res.send(500, { error: err });
	    } else{ 		
		    res.send(data);
		  }		
		});
	
	
};
//table=referer_state&sort=count&parId=25
var order_state_handle=function(req,res){
	  var query=req.query;
	  var pId=query.pId;
	//var tableName=query.table;
	  if(!pId){
		  res.send(500, { error: "partitionId missing!" });
		  return;
	  }
	  var tableName=query.table;
	  var sortCol=query.sort;
	  var sql_list=["select count(*),sum(count),sum(bytes) from referer_state",
	                "select referer_id.referer.referer,bytes,count from referer_state order by " + sortCol
	                ];
	  
	  connection.sql_list(pId,sql_list,function(err,data){
	    if(err){
	  	    res.send(500, { error: err });
	  	    return;
	    } 
	    var ret_obj={};
	    var res1=data[0]["rows"][0];
	    var res2=data[1];

	    ret_obj["total_entry"] = res1["count(*)"];      
	    ret_obj["total_hits"] =  res1["sum(count)"];
	    ret_obj["total_bytes"] = res1["sum(bytes)"];
	    var rows=res2["rows"];
	    for(var i=0;i<rows.length;i++){
	    	var row=rows[i];
	    	row["referer"]=row["referer_id.referer.referer"];
	    	delete row["referer_id.referer.referer"];
	    }
	    ret_obj["rows"]=rows;	    	
		res.send(JSON.stringify(ret_obj));
	    		
	  });
	
	
};

exports.dbCmd = function(req, res){
  var cmd=req.params.dbCmd;
  //console.log(cmd);
  if(cmd=="time_state") return time_state_handle(req,res);
  if(cmd=="order_state") return order_state_handle(req,res);

  res.send("respond with a resource " + req.params.dbCmd + " " + query.pId);
/*
  var query=req.query;
  var pId=query.pId;
//var tableName=query.table;
  
  if(!pId){
	  res.send(500, { error: "partitionId missing!" });
	  return;
  }
  var sql="select * from gbl_time_state where id=1 and ts>0 order by ts ASC limit 100";
	connection.sql(pId,sql,function(err,data){
    if(err){
  	  res.send(500, { error: err });
    } else{ 		
	      res.send(data);
	  }		
	});
  //res.send("respond with a resource " + req.params.dbCmd + " " + query.pId) ;
  */
};

