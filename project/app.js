//Assigning constants, and requiring needed modules

const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const db = require(__dirname + "/db.js");
let key = "empty";
let tList = []; //An array with a tasks for a page.


//-----------routing and ejs rendering-------------

app.get("/", (req, res) => {
    res.render("home", {});
});

app.get("/create", (req, res) => {

    res.render("edit", { key: key, taskList: tList });
});

app.post("/create", async (req, res) => {
    //---------Creating a new key for user. By this key, user'll be able to edit and run his page.
    // the key will be an db item's _id.
    //inserting a new empty item into db:
    tList.length = 0;
    try {
        key = await db.insert(tList);
        key = key._id; //Now we've got an id of a new inserted item.
        // -------------redirecting to "create" page------
        res.redirect("/create");

    } catch (err) {
        console.log(err);
    }


});


app.post("/edit", (req, res) => {
    key = req.body.key;
    
        // -------------redirecting to "edit/:key" page------
        res.redirect("/edit/" + key);
    

});

app.get("/edit/:key", async (req, res) => {
    key = req.params.key;
    //---requesting tasklist from db by it's id, which is variable "key". 
    try {
        tList = await db.find(key);
        // -------------rendering the "edit" page------
        res.render("edit", { key: key, taskList: tList, saved: false });
    } catch (err) {
        console.log(err);
    }

    
});

app.post("/save", async (req, res) => {
    //updating data(tasks) from front-end into db.
    //creating object.
    key = req.body.key;

    let list = req.body.taskList;
    list = list.split("\n");//now we have an array with rows of text
    tList = [];
    for (let i = 0; i < list.length; i++) {
        const str = list[i].trim();

        //---Adding "redirect" task to db.

        if (str == "redirect") {
            let url = list[i + 1].trim();
            taskObj = {
                tName: 'redirect',
                url: url
            };
            tList.push(taskObj);
        }


        //---Adding "set background image" task to db.
        if (str == "set background image") {
            let url = list[i + 1].trim();
            taskObj = {
                tName: 'set background image',
                url: url
            };
            tList.push(taskObj);

        }

        //Adding "show message" task to db

        if (str == "msg") {
            let msg = list[i + 1].trim();
            taskObj = {
                tName: 'msg',
                msg: msg
            };
            tList.push(taskObj);
        }

        //Adding "delay" task to db

        if (str == "delay") {
            let delay = list[i + 1].trim();
            taskObj = {
                tName: 'delay',
                delay: delay
            };
            tList.push(taskObj);
        }





    }

    //tList array is ready to update db.
    try {
        let result = "";
        result = await db.update(tList, key);
        if (result.n < 1) {
            console.log('Was not saved.');

        }
        // tList = await db.find(key);

        res.redirect("/saved/" + key);
    } catch (err) {
        console.log(err);
    }

});


app.get("/saved/:key", (req, res) => {
    // -------------item has been updated------

    res.render("edit", { key: req.params.key, taskList: tList, saved: true });
});

app.post("/run", (req, res) => {
    key = req.body.key;
    res.redirect("/run/" + key);
});

app.get("/run/:key", async (req, res) => {
    key = req.params.key;

//---requesting tasklist from db by it's id, which is variable "key". 
try {
    tList = await db.find(key);
    // -------------rendering the "run" page------
    res.render("run", { key: key, taskList: tList });
} catch (err) {
    console.log(err);
}


    
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started.");
});