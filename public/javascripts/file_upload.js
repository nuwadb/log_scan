$(function() {
	  
	  $('div.scan_div').hide();
	  $('div.nav_div').hide();
	  
	 var status_polling= function(jobName,cb){
		 var textElement = $("#statusPanel");
 	    // this function will run each 1000 ms until stopped with clearInterval()
 	     var poll_count=0; 
 	     var statusText="";
		 var timer_i = setInterval(function (){
	     $.ajax({
	    	url: "/upload/status?name="+jobName,dataType: 'json',
			success: function (json) {
			         var rows=json.rows;
			         if (rows.length==0) return;
			         for(var j=0;j<rows.length;j++){
			           var row=JSON.parse(rows[j]);
			                	  
				       console.log(row);
  	                   if (row.status == "done") {
	                	  statusText=statusText+"\done:" + rows[j] + "\n";
	                	  textElement.text(statusText);  
	                	  clearInterval(timer_i);
	                	  cb(null,row);
	                   } else if (row.status == "active"){
				          statusText=statusText+"info:" +rows[j] + "\n";
				          textElement.text(statusText);
				       } else if (row.status == "failed"){
				       	  statusText=statusText+"failed:" +rows[j] + "\n";
				       	  textElement.text(statusText);
				       	  clearInterval(timer_i);
				       	  cb(row.error,null);
				       }			                	  
			          } // end of for loop
			          if(poll_count++ > 120){
	                	  clearInterval(timer_i);
	                	  cb("status poll time out",null);
	                  } 
			      },
			     error: function (){
			                  // on error, stop execution
			                  console.log("ajax error")
			                  clearInterval(timer_i);
			                  cb("ajax error",null)
			     }
			     });
	     }, 1000);
	  };
	  
	  
	  $('input[type="submit"]').on('click', function(evt) {
	    evt.preventDefault();
	    $('div.progress').show();
	    var formData = new FormData();
	    var file = document.getElementById('myFile').files[0];
	    formData.append('myFile', file);
	    
	    var xhr = new XMLHttpRequest();
	    
	    xhr.open('post', '/upload', true);
	    
	    xhr.upload.onprogress = function(e) {
	      if (e.lengthComputable) {
	        var percentage = (e.loaded / e.total) * 100;
	        $('div.progress div.bar').css('width', percentage + '%');
	      }
	    };
	    
	    xhr.onload = function() {
	      console.log(xhr.responseText);
		  //$('div.scan_div').show();		  
	      //$(".scan_div").find(":button").click(scan_btn_create_cb(xhr.responseText));	      
	      $('div.progress').hide();
	      $('strong.message').text(this.statusText)
	      $('div.alert').show();
	      $('div.scan_div').show();
		  status_polling(JSON.parse(xhr.responseText)["jobName"],function(err,data){
			  console.log("status return");
			  // jump to analysis page
			  $("a[href='analysis#']").attr('href', '/analysis?pid='+data['partition_id'])
			  $('div.nav_div').show();
		  });
	    }
	    
	    xhr.send(formData);	    
	  })
	  
	});
