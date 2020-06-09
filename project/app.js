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


app.post("/edit", async (req, res) => {
    key = req.body.key;
    //---requesting tasklist from db by it's id, which is variable "key". 
    try {
        tList = await db.find(key);
        // -------------redirecting to "edit" page------
        res.redirect("/edit/" + req.body.key);
    } catch (err) {
        console.log(err);
    }

});

app.get("/edit/:key", (req, res) => {
    // -------------creating a new item in a db------

    res.render("edit", { key: req.params.key, taskList: tList, saved: false });
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

    //---Adding redirect

        if (str == "redirect") {
            let url = list[i + 1].trim();
            taskObj = {
                tName: 'redirect',
                url: url
            };
            tList.push(taskObj);
        }

        //Adding "show message"

        if (str == "msg") {
            let msg = list[i + 1].trim();
            taskObj = {
                tName: 'msg',
                msg: msg
            };
            tList.push(taskObj);
        }

        //Adding delay

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


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started.");
});