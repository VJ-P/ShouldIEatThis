const mongoose = require("mongoose");

// SCHEMA SETUP
let recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    step1: String,
    step2: String,
    step3: String,
    step4: String,
    step5: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Recipe", recipeSchema);