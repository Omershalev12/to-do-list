// Jshint esversion:6

const express = require("express");
const https = require("https");
const mongoose = require('mongoose'); // requires the mongoose module to start working with a database
const date = require(__dirname + "/date.js"); //requires the module date.js that was created in our project.

const app = express();
app.set('view engine', 'ejs'); //let us use the ejs module in order to make templates in our project

app.use(express.urlencoded({extended: true}));//must be written in order to use the data that was sent in the post request.
app.use(express.static("public")); // used to specify a folder as the one that contains all the local files that are used in my html (styles.css / images ETC) this folder is considered as the root folder for these files. 

//MongoDB setup//
let Item;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/toDoListDB');
    const itemSchema = new mongoose.Schema({ //creating a new schema that defines how the documents should be written
        name: {
            type:String,
            required:true
        }
      });
        Item = mongoose.model('item', itemSchema);
}

//main aplication setup//
var items = [];

app.get("/", function(req, res){
    Item.find({},function(err,foundItems){
        if(err){
            console.log(err);
        } else {
            res.render('list', {day: day, items: foundItems}); // this function looks for a ejs file called "list" inside the views folder.
        }
    });
    let day = date.getDate(); // calling the getDate function from the date.js module we created.
});

app.post("/", function(req, res){
    console.log(req.body);
    if(req.body.button === "add"){
        var newItem = new Item({name:req.body.addItemToList});
        newItem.save();
        res.redirect("/");
    }
    else{
        let index = req.body.button;
        Item.find({},function(err,foundItems){
            if(err){
                console.log(err);
            } else {
                console.log(foundItems[index]);
                let id = foundItems[index].id;
                Item.deleteOne({_id:id},function(err){
                    if (err){
                        console.log(err);
                    } else {
                        console.log("The item with ID " + id + " was deleted successfully.")
                    }
                });
            }});
        // console.log(index);
        res.redirect("/");
    }
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});