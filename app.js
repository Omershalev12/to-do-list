// Jshint esversion:6

const express = require("express");
const https = require("https");

const app = express();
app.set('view engine', 'ejs'); //let us use the ejs module in order to 

app.use(express.urlencoded({extended: true}));//must be written in order to use the data that was sent in the post request.
app.use(express.static("public")); // used to specify a folder as the one that contains all the local files that are used in my html (styles.css / images ETC) this folder is considered as the root folder for these files. 

var items = [];

app.get("/", function(req, res){
    var today = new Date();
    var day = "";
    var weekDays = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
    var day = weekDays[today.getDay()] + ", " + months[today.getMonth()] + " " + today.getDate();
    res.render('list', {day: day, items: items}); // this function looks for a ejs file called "list" inside the views folder.
});

app.post("/", function(req, res){
    console.log(req.body);
    if(req.body.button === "add"){
        var newItem = req.body.addItemToList;
        items.push(newItem);
        res.redirect("/");
    }
    else{
        let index = req.body.button;
        console.log(index);
        items.splice(index,1);
        res.redirect("/");
    }
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});