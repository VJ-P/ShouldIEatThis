const   bodyParser = require('body-parser'),
        express = require('express'),
        mongoose = require('mongoose'),
        app = express();

mongoose.connect("mongodb://localhost/should_i_eat_this");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
let recipeSchema = new mongoose.Schema({
    name: String,
    image: String
});

let Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create(
//     {
//         name: "Pecan Pie", 
//         image: "https://bit.ly/2X7DDhm"
//     },
//     (err, recipe) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("New Recipe");
//             console.log(recipe);
//         }
//     }
// );


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/recipes", (req, res) => {
    Recipe.find({}, (err, allRecipes) => {
        if(err) {
            console.log(err);
        } else {
            res.render("recipes", {recipes: allRecipes});
        }
    })
});

app.post("/recipes", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newRecipe = {name: name, image: image};

    Recipe.create(newRecipe, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes");
        }
    });
});

app.get("/recipes/new", (req, res) => {
    res.render("new");
});

app.listen(3000, () =>{
    console.log("The ShouldIEatThis server is now running on Port 3000!");
});