var http = require("http");
var path = require("path");
var express = require("express");
var axios = require("axios");

var app = express();
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set("views", path.resolve(__dirname, "public" ,  "views"));
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3080);





/*app.get("/", function(req,res){
    console.log("homepage request");
    res.render("homepage", {name: "Ashim"}); 
});*/


app.listen(app.get("port"), function() {
	console.log("Server started on port " + app.get("port"));
});