//Assigning constants, and requiring needed modules

const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
let key = "empty";


//-----------routing and ejs rendering-------------

app.get("/", (req, res)=>{
    res.render("home", {});
});

app.get("/create", (req, res)=>{
    // -------------creating a new item in a db------
    
    res.render("edit", {key:key});
});

app.post("/create", (req, res)=>{
    // -------------redirecting to "create" page------
    res.redirect("/create");
});


app.post("/edit", (req, res)=>{
    // -------------redirecting to "edit" page------
    res.redirect("/edit/" + req.body.key);
});

app.get("/edit/:key", (req, res)=>{
    // -------------creating a new item in a db------
    
    res.render("edit", {key:req.params.key});
});






app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started.");
});