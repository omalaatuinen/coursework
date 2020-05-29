// Require the mongoose, that has been already installed through npm .

const mongoose = require("mongoose");

// connecting...

mongoose.connect("mongodb://localhost:27017/testDB", {useNewUrlParser:true, useUnifiedTopology: true});

// Creating a new chema 

const visitorSchema = new mongoose.Schema({
    taskList: Array
});

// Creating the mongoose model:

const Visitor = mongoose.model("visitors", visitorSchema);//the "Visitors" will be a name of the db's collection

//Creating a new Document

const visitor = new Visitor({
    taskList: [{ //the document will consists of some tasks, that the webpage will produce for a visitor.
        tName: "msgbox",
        msg: "Text of a message on a page"
    },{
        tName:"delay",
        delay: 1 //setting timeOut in seconds
    },{
        tName:"redirect",
        url: "https://google.com"
    }]
});

visitor.save(); //saving a "visitor" document in the "visitors" collection of a db "testDB".