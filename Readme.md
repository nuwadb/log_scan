# Web app for log analysis based on Node.js

## Installation

* Install Node.js and Express.
* npm install express
* npm install randomstring
* npm install redis
* npm install mustache
* npm install https://github.com/nuwadb/lvdb_node/blob/master/lvdb_node-0.1.0.tgz

## References:

* [File upload with Express](https://github.com/zeMirco/express-upload-progress)

* [AJAX polling](http://stackoverflow.com/questions/1406580/jquery-ajax-polling-for-json-response-handling-based-on-ajax-result-or-json-con)

* [Mustache + Express](http://devcrapshoot.com/javascript/nodejs-expressjs-and-mustachejs-template-engine)

## Routes:

GET "/"   =>  public/upload.html

POST "/upload"  =>  file upload form submission

GET "/upload/status" =>  scan job polling

GET "/lvdb/httpd/*"   =>   DB query related API. For restful service

GET "/analysis?pId="  =>   Analysis entrance page.  Right now simply display a topK chart.


## [Demo](http://demo2.aws.nuwadb.com:3000/upload.html)
