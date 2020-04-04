const express = require('express');
const app = express();


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/recipes", (req, res) => {
    let recipes = [
        {name: "Pizza", image: "https://bit.ly/3dRrhjv"},
        {name: "Pecan Pie", image: "https://bit.ly/2X7DDhm"},
        {name: "Bacon and Eggs", image: "https://bit.ly/39Jmopg"}
    ];
    res.render("recipes", {recipes: recipes});
});


app.listen(3000, () =>{
    console.log("The ShouldIEatThis server is now running on Port 3000!");
});