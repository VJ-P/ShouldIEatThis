const   bodyParser = require('body-parser'),
        express = require('express'),
        mongoose = require('mongoose'),
        Recipe = require('./models/recipe'),
        seedDB = require("./seeds"),
        app = express();

seedDB();
mongoose.connect("mongodb://localhost:27017/should_i_eat_this", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Recipe.create(
//     {
//         name: "Pizza",
//         image: "https://bit.ly/2weGHgx",
//         description: "This is a fantastic version of an Italian classic. The feta cheese adds a rich flavor that brings this dish to life. Incredibly easy and incredibly delicious!"
//     },
//     (err, recipe) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Newly Created Recipe");
//             console.log(recipe);
//         }
//     }
// );

app.get("/", (req, res) => {
    res.render("landing");
});

// INDEX ROUTE
app.get("/recipes", (req, res) => {
    Recipe.find({}, (err, allRecipes) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {recipes: allRecipes});
        }
    })
});

// CREATE ROUTE - Shows a list of all the recipes
app.post("/recipes", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newRecipe = {name: name, image: image, description: description};

    Recipe.create(newRecipe, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes");
        }
    });
});

// NEW ROUTE - Shwos form to submit new recipe
app.get("/recipes/new", (req, res) => {
    res.render("new");
});

// SHOW ROUTE - Shows more info about a recipe
app.get("/recipes/:id", (req, res) => {
    // find the recipe with the provided ID
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if(err) {
            console.log(err);
        } else {
            // render show template with that recipe
            res.render("show", {recipe: foundRecipe});
        }
    });
});

app.listen(3000, () =>{
    console.log("The ShouldIEatThis server is now running on Port 3000!");
});