

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const day = require(__dirname + "/date.js");
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.render('index', { listTitle: day, items: items });

});

app.get("/work", (req, res) => {
    res.render("index", { listTitle: "Work", items: workItems });
});

app.get("/about", (req, res) => {
    res.render("about", { listTitle: "About" });
});

app.post("/", (req, res) => {
    if (req.body.list == "Work") {
        if (req.body.newItem.length > 0) {
            workItems.push(req.body.newItem);
        };
        res.redirect("/work");
    } else {
        if (req.body.newItem.length > 0) {
            items.push(req.body.newItem);
        };
        res.redirect("/");
    }
});







app.listen(3000, () => {
    console.log("Server running on port 3000.");
});