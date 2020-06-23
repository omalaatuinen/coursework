//-----Each function will connect to a db, do something, and close the connection.
const mongoose = require("mongoose");

// -----------CREATING A NEW SCHEMA AND MODEL-----------------------------

const userSchema = new mongoose.Schema({
    taskList: Array
});

// Creating the mongoose model:

const User = mongoose.model("users", userSchema);//the "users" will be a name of the db's collection


module.exports.insert = async (taskList) => {
    let res = "";

    // connecting...
    // mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connect("mongodb://heroku_pww91f2p:dnqv89gkvj3elft9pdd9agljkg@ds133192.mlab.com:33192/heroku_pww91f2p", { useNewUrlParser: true, useUnifiedTopology: true });

    
    //Creating a new Document
    try {
        const user = new User({
            taskList: taskList
        });

        //-------------------  INSERTING DATA INTO A DB.------------

        res = await user.save(); //saving a "user" document into "users" collection of a db "usersDB".
        await mongoose.connection.close();
        return res;
    } catch (error) {
        console.log(error);
    }


}

module.exports.update = async (taskList, key) => {
    let result = "";

    // connecting...
    // mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connect("mongodb://heroku_pww91f2p:dnqv89gkvj3elft9pdd9agljkg@ds133192.mlab.com:33192/heroku_pww91f2p", { useNewUrlParser: true, useUnifiedTopology: true });

    
    //Updating a Document
    try{
        // creating a document, which will be updated
        const user = new User({
            taskList: taskList
        });

        //-------------------  UPDATING DATA IN A DB.------------
       result = await User.updateOne({"_id":key}, {taskList:taskList},(err)=>{
            if (err){
                console.log(err);
            } else {
                
            }
        });
        await mongoose.connection.close();
        //updating a "user" document into "users" collection of a db "usersDB".
        return await result;
    } catch (err){
        console.log(err);
    }

    


}

module.exports.delete = () => {
    let res = "";


}

module.exports.find = async (key) => {
    let res = "";

    // connecting...

    // mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connect("mongodb://heroku_pww91f2p:dnqv89gkvj3elft9pdd9agljkg@ds133192.mlab.com:33192/heroku_pww91f2p", { useNewUrlParser: true, useUnifiedTopology: true });


    try {
        res = await User.findById(key, 'taskList').exec();
        //--------------------CLOSING THE CONNECTION-------------------------
        await mongoose.connection.close(); //Now, the connection is closed.
        return res.taskList;
    } catch (err) {
        console.log(err);
        mongoose.connection.close(); //Now, the connection is closed.  
    }

};


