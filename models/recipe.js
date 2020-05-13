const mongoose = require("mongoose");

// SCHEMA SETUP
let recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Recipe", recipeSchema);