var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var mongoose = require('mongoose');
var app = express();
var bodyParser = require("body-parser");
var quotingSchema = new mongoose.Schema({
	name: String,
	quote: String
})
var Quote = mongoose.model("quotes", quotingSchema);
app.use(bodyParser.urlencoded({extended: true}));
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {

 	// User.find({}, function(err, users)
 	// {
 	// 	if(err)
 	// 	{
 	// 		console.log("Show users' infos FAIL!")
 	// 	}
 	// 	else
 	// 	{
 	// 	}
 	// })
	res.render("index");
})
app.get("/show", function(req, res)
{
	Quote.find({}, function(err, quotes)
	{
		if(err)
		{
			console.log("Show page has a error");
		}
		else
		{
			res.render("show", {infos: quotes})
		}
	})
})
app.post('/quotes', function(req, res)
{
	// console.log("Post data" + req.body);
	if(req.body.name == "" || req.body.quote == "")
	{
		res.render("index", {err_msg: "You can't add with empty quote or name!!"});
	}
	else
	{
		var user = new Quote({name: req.body.name, quote: req.body.quote});
		user.save(function(err)
		{
			if(err)
			{
				console.log("Something went wrong");
			}
			else
			{
				console.log("Successful!");
				res.redirect("show");
			}
		})
	}

})

// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

mongoose.connect('mongodb://localhost/my_first_db');
