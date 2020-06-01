

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
let items = ['Buy Food', 'Cook Food', 'Eat Food'];


app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);


    res.render('index', {lDay: day, items: items });


});

app.post("/", (req, res) => {
    if (req.body.newItem.length > 0) {
        items.push(req.body.newItem);
    };

    res.redirect("/");

});






app.listen(3000, () => {
    console.log("Server running on port 3000.");
});