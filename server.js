var express = require("express");
var fs = require('fs');
var path = require('path');
var app = express();
 var blog = require('./blog-service.js')

var HTTP_PORT = process.env.PORT || 8080;


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });
  app.get('/blog', function(req, res) {
    blog.getPublishedPosts().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
  });
  app.get('/posts', function(req, res) {
    res.sendFile(path.join(__dirname, '/data/posts.json'));
  
  });
  app.get('/categories', function(req, res) {
    res.sendFile(path.join(__dirname, '/data/categories.json'));
  });
  app.get('*', function(req, res){
    res.send("404 Page not found");
  });
  blog.initialize().then(() => 
{
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log("ERROR : From starting the server");
});