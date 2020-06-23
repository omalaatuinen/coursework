//Assigning constants, and requiring needed modules

const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const https = require("https");
const db = require(__dirname + "/db.js");
let key = "empty";
let tList = []; //An array with a tasks for a page.


//-----------routing and ejs rendering-------------

app.get("/", (req, res) => {
    res.render("home", {});
});

app.get("/about", (req, res) => {
    res.render("about", {});
});

app.get("/contacts", (req, res) => {
    res.render("contacts", {});
});

app.get("/create", (req, res) => {
    

    res.render("edit", { key: key, taskList: tList, saved:false });
});

app.post("/create", async (req, res) => {
    //---------Creating a new key for user. By this key, user'll be able to edit and run his page.
    // the key will be a db item's _id.
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



        //---Adding "Astronomy Picture of the Day on background" task to db.

        if (str == "Astronomy Picture of the Day on background") {
            let option = list[i + 1].trim();
            taskObj = {
                tName: 'Astronomy Picture of the Day on background',
                option: option
            };
            tList.push(taskObj);

        }


        //---Adding "remove background image" task to db.

        if (str == "remove background image") {

            taskObj = {
                tName: 'remove background image'
            };
            tList.push(taskObj);

        }


        //---Adding "wait for click" task to db.

        if (str == "wait for click") {

            taskObj = {
                tName: 'wait for click'
            };
            tList.push(taskObj);

        }


        //---Adding "clear the page" task to db.

        if (str == "clear the page") {

            taskObj = {
                tName: 'clear the page'
            };
            tList.push(taskObj);

        }




        //Adding "show message" task to db

        if (str == "msg") {
            let msg = list[i + 1].trim();
            taskObj = {
                tName: 'msg',
                msg: msg,
                dur: list[i + 2].trim()
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

        //---Adding "weather in certain city" task to db.

        if (str == "weather in certain city") {
            let city = list[i + 1].trim();
            taskObj = {
                tName: 'weather in certain city',
                city: city
            };
            tList.push(taskObj);

        }

        //---Adding "news in certain country" task to db.

        if (str == "news in certain country") {
            let country = list[i + 1].trim();
            taskObj = {
                tName: 'news in certain country',
                country: country
            };
            tList.push(taskObj);

        }


        //---Adding "show currency rates" task to db.

        if (str == "show currency rates") {
            let fromCur = list[i + 1].trim();
            let toCur = list[i + 2].trim();
            taskObj = {
                tName: 'show currency rates',
                from: fromCur,
                to: toCur
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


//---REST API for a weather in some city----

app.get("/weather/:city", function (req, res) {



    const qCity = req.params.city;
    const apiKey = "8867af5cb0cd4f02a8446d9936442a8c";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + qCity + "&appid=" + apiKey + "&units=metric";

    https.get(url, function (response) {
        response.on("data", function (data) {
            let arr = JSON.parse(data);
            let temp = arr['main']['temp'];
            let feelsLike = arr['main']['feels_like'];
            let tempDesc = arr['weather'][0]['description'];
            let icon = "http://openweathermap.org/img/wn/" + arr['weather'][0]['icon'] + "@2x.png";

            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            let result = {
                result: 'Temperature in ' + arr['name'] + ' is ' + temp + ' °C.' + '<br>It feels like: ' + feelsLike + '<br>description: ' + tempDesc + '.' + `<br><img src="${icon}">`
            }
            res.json(result);

        });
    });
});


//---REST API for a news headlines in some country----

app.get("/news/:country", function (req, res) {



    const country = req.params.country;
    const apiKey = "99801a3e1430432db247981495d6ddab";
    const url = "https://newsapi.org/v2/top-headlines?country=" + country + "&pageSize=10&apiKey=" + apiKey;
    let chunks = [];
    https.get(url, function (response) {
        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {
            let data = Buffer.concat(chunks);

            let arr = JSON.parse(data);
            let articles = []
            arr.articles.forEach(article => {
                if (country == "ru") {
                    articles.push({
                        title: article.title,
                        content: article.description,
                        url: article.url,
                        description: article.description
                    });
                } else {
                    articles.push({
                        title: article.title,
                        content: article.content,
                        url: article.url,
                        description: article.description
                    });
                }
            });

            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');

            res.json(articles);

        });
    });
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started.");
});