// Require the mongoose, that has been already installed through npm .

const mongoose = require("mongoose");

// connecting...

mongoose.connect("mongodb://localhost:27017/testDB", {useNewUrlParser:true, useUnifiedTopology: true});

// -----------INSERTING SOME DATA INTO DB-----------------------------

// Creating a new chema 

const visitorSchema = new mongoose.Schema({
    taskList: Array
});

// Creating the mongoose model:

const Visitor = mongoose.model("visitors", visitorSchema);//the "Visitors" will be a name of the db's collection

//Creating a new Document

const visitor = new Visitor({
    taskList: [{ //the document will consist of some tasks, that the webpage will produce for a visitor.
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

//-------------------  INSERTING DATA INTO A DB.------------

//visitor.save(); //saving a "visitor" document in the "visitors" collection of a db "testDB".

//-----------------UPDATING DATA----------------------

Visitor.updateOne({"_id":'5ed111de9e4efe3bb4cdeef6'},{taskList:[
    { //updating a taskList array of a specific _id.
        tName: "msgbox",
        msg: "Text for a message"
    },{
        tName:"redirect",
        url: "https//google.com" //setting timeOut in seconds
    }
]},(err)=>{
    if (err){
        console.log(err);
    } else {
        console.log("updated");
    }
});

//------------------DELETING DOCUMENT FROM THE DB'S COLLECTION

Visitor.deleteOne({'_id':'5ed114fa5513253c2dfece37'},(err)=>{ //Deleting the specific object by it's _id.
if (err){
    console.log(err);
} else {
    console.log("Deleted one.");
}
}); //



//******************************-------READING THE DATA USING MODELNAME.FIND()-----------****************************************** */
// "data" variable represents a document with a specific "_id" value.

Visitor.find({"_id":'5ed111de9e4efe3bb4cdeef6'}, (err, data)=>{ //by the model name, mongoose recognises a db's collection we are going to work with.

if (err){
    console.log(err);
} else {
    //--------------------CLOSING THE CONNECTION-------------------------
    mongoose.connection.close(); //Now, the connection is closed.
    
    data[0].taskList.forEach((obj)=>{
console.log(obj.tName); //showing value of a tName field for each of a taskList array.
    }); 
}
});