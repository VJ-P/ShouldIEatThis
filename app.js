const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let recipes = [
    {name: "Pizza", image: "https://bit.ly/2weGHgx"},
    {name: "Pecan Pie", image: "https://bit.ly/2X7DDhm"},
    {name: "Bacon and Eggs", image: "https://bit.ly/39Jmopg"},
    {name: "Pizza", image: "https://bit.ly/2weGHgx"},
    {name: "Pecan Pie", image: "https://bit.ly/2X7DDhm"},
    {name: "Bacon and Eggs", image: "https://bit.ly/39Jmopg"},
    {name: "Pizza", image: "https://bit.ly/2weGHgx"},
    {name: "Pecan Pie", image: "https://bit.ly/2X7DDhm"},
    {name: "Bacon and Eggs", image: "https://bit.ly/39Jmopg"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/recipes", (req, res) => {
    res.render("recipes", {recipes: recipes});
});

app.post("/recipes", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newRecipe = {name: name, image: image};
    recipes.push(newRecipe);
    res.redirect("/recipes");
});

app.get("/recipes/new", (req, res) => {
    res.render("new");
});

app.listen(3000, () =>{
    console.log("The ShouldIEatThis server is now running on Port 3000!");
});