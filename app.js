const   bodyParser = require('body-parser'),
        express = require('express'),
        mongoose = require('mongoose'),
        Recipe = require('./models/recipe'),
        Comment = require('./models/comment'),
        seedDB = require("./seeds"),
        app = express();

seedDB();
mongoose.connect("mongodb://localhost:27017/should_i_eat_this", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

// INDEX ROUTE
app.get("/recipes", (req, res) => {
    Recipe.find({}, (err, allRecipes) => {
        if(err) {
            console.log(err);
        } else {
            res.render("recipes/index", {recipes: allRecipes});
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
    res.render("recipes/new");
});

// SHOW ROUTE - Shows more info about a recipe
app.get("/recipes/:id", (req, res) => {
    // find the recipe with the provided ID
    Recipe.findById(req.params.id).populate("comments").exec((err, foundRecipe) => {
        if(err) {
            console.log(err);
        } else {
            // render show template with that recipe
            res.render("recipes/show", {recipe: foundRecipe});
        }
    });
});

//============================================================
// COMMENTS ROUTES
//============================================================
app.get("/recipes/:id/comments/new", (req, res) => {
    // find recipe by id
    Recipe.findById(req.params.id, (err, recipe) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {recipe: recipe});
        }
    });
});

app.post("/recipes/:id/comments", (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err){
            console.log(err);
            res.redirect("/recipes");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err){
                    console.log(err);
                } else {
                    recipe.comments.push(comment);
                    recipe.save();
                    res.redirect("/recipes/"+recipe._id);
                }
            });
        };
    });
});


app.listen(3000, () =>{
    console.log("The ShouldIEatThis server is now running on Port 3000!");
});