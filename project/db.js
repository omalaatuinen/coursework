//-----Each function will connect to a db, do something, and close the connection.
module.exports.insert = async (taskList) => {
    let res = "";
    const mongoose = require("mongoose");
    // connecting...

    mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });

    // -----------CREATING A NEW SCHEMA AND MODEL-----------------------------

    // Creating a new schema 

    const userSchema = new mongoose.Schema({
        taskList: Array
    });

    // Creating the mongoose model:

    const User = mongoose.model("users", userSchema);//the "users" will be a name of the db's collection

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

module.exports.update = () => {
    let res = "";
    const mongoose = require("mongoose");


}

module.exports.delete = () => {
    let res = "";
    const mongoose = require("mongoose");


}