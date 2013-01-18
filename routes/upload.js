  var randomstring = require("randomstring")
  , redis = require("redis")
  , redisClient=redis.createClient()
  , subClient=redis.createClient()
  , redis_mb={};

  
//Start redis subscriber
  subClient.on("message", function (channel, message) {
      console.log("subClient: " + channel + ": " + message);
      //if (msg_count === 3) {
      //    client1.unsubscribe();
      //    client1.end();
      //}
      var json_msg=JSON.parse(message);
      var job_name=json_msg["jobName"];
      var job_mb=redis_mb[job_name] || [];
      job_mb.push(message);
      redis_mb[job_name]=job_mb;
  });

  subClient.subscribe("jobs.result");
  
exports.upload = function(req, res){
	// the uploaded file can be found as `req.files.image` and the
	  // title field as `req.body.title`
  console.log(req.files);
  console.log(req.body);
  var randomName=randomstring.generate(8);
  var uploadFilePath=req.files.myFile.path;
  var uploadFileName=req.files.myFile.name;
  var uploadFileType=req.files.myFile.type;
  console.log(uploadFilePath);
  console.log(uploadFileName);
  console.log(uploadFileType);
 // {"jobId":1, "logType":"httpd", "upload_files":["file1","file2" ]}
  redisClient.publish("jobs.node",JSON.stringify({name:randomName,
	                               path:uploadFilePath,
	                               original_name:uploadFileName,
	                               file_type:uploadFileType}));
  
  deleteAfterUpload(req.files.myFile.path);
  var msg={jobName:randomName};
  res.end(JSON.stringify(msg));
};
//{"status":"active","info":"job submitted."}
//{"status":"done","partition_id":10}
//{"status":"failed","error":"json syntax error"}
exports.status = function(req, res) {
  var query=req.query;
  var jobName=query.name;
  console.log(jobName);
  
  var msg={ rows:redis_mb[jobName] || []};
  redis_mb[jobName]=[];
  res.end(JSON.stringify(msg));
};

//Private functions

var fs = require('fs');
var deleteAfterUpload = function(path) {
  setTimeout( function(){
    fs.unlink(path, function(err) {
      if (err) console.log(err);
      console.log('file successfully deleted');
    });
  }, 60 * 1000);
};