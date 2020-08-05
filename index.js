const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.listen(PORT, function () {
    console.log("Server is running...");
})

var counter =0;
app.get("/",function (req,res) {
    counter++;
    let title = "Weather Forecast";
    // res.sendFile(__dirname+"/views/home.html");
    res.render("ass13",
        {
            title: title,
            counter: counter
        });
});

const fs = require("fs");
app.get("/categories", function (req,res) {
    let cats = fs.readFileSync("data/data.json","UTF-8"); //gọi file datastring (trả về text JSON).
    cats = JSON.parse(cats); //biến text JSON thành object JSON
    res.render("labs10",
        {
            cats:cats
        });
});

app.get("/detail/:id", function (req,res) {
    let ID = req.params.id;
    // res.send(ID);
    let cats = fs.readFileSync("data/data.json","UTF-8");
    cats = JSON.parse(cats);
    let count = 0;
    cats.map(function (e) {
        count++;
        if(e.id == ID) {
            res.render("detail", {
                cat: e
            });
            count = 0;
        }
    })
    if(count >= cats.length){
        res.send("Not found")
    }
    // app.render("detail");
})