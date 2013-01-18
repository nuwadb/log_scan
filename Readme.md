Web app for log analysis based on Node.js

Installation
Install Node.js and Express.
npm install express
npm install randomstring
npm install redis
npm install mustache
npm install https://github.com/nuwadb/lvdb_node/blob/master/lvdb_node-0.1.0.tgz

References:
File upload with Express:

AJAX polling:

Mustache + Express

Routes:

GET "/"   =>  public/upload.html

POST "/upload"  =>  file upload form submission

GET "/upload/status" =>  scan job polling

GET "/lvdb/httpd/*"   =>   DB query related API. For restful service

GET "/analysis?pId="  =>   Analysis entrance page.  Right now simply display a topK chart.


