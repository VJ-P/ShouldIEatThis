const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const Comment = require("./models/comment");
 
let seeds = [
    {
        name: "Pizza", 
        image: "https://bit.ly/2weGHgx",
        description: "This is a fantastic version of an Italian classic. The feta cheese adds a rich flavor that brings this dish to life. Incredibly easy and incredibly delicious!",
        step1: "Make the dough",
        step2: "Add Tomato sauce",
        step3: "Add cheese",
        step4: "Add Toppings",
        step5: "Bake"
    },
    {
        name: "Pecan Pie", 
        image: "https://bit.ly/2X7DDhm",
        description: "Buttery, nutty, and a touch of caramel, this is a very yummy pie! Full of flavor! Serve hot or cold, with a good size dollop of whipped topping or vanilla ice cream.",
        step1: "Make the pie dough",
        step2: "Add Pecans",
        step3: "Add top layer",
        step4: "Bake",
        step5: "Eat"
    },
    {
        name: "Bacon and Eggs", 
        image: "https://bit.ly/39Jmopg",
        description: "This easy low-carb breakfast is SUPER satisfying. No bread? No problem.",
        step1: "Heat Pan",
        step2: "Add oil",
        step3: "Add Eggs",
        step4: "Add Bacon",
        step5: "Cook"
    },
    {
        name: "Chocolate Chip Cookies",
        image: "https://bit.ly/2yS5Rmn",
        description: "Crispy around the edges, chewy and chocolaty in the middle, and thin, oh so thin.",
        step1: "Preheat Oven",
        step2: "Make the dough",
        step3: "Add Chocolate ships",
        step4: "Bake",
        step5: "Cool for 20 mins"
    }
];
 
async function seedDB(){
    try {
        await Recipe.deleteMany({});
        await Comment.deleteMany({});
        for(const seed of seeds){
            let recipe = await Recipe.create(seed);
            let comment = await Comment.create(
                {
                    text: 'This recipe is great, but it was a bit salty',
                    author: 'Homer'
                }
            )
            recipe.comments.push(comment);
            recipe.save();
        }
    } catch (error) {
        console.log(error);
    }
}
 
module.exports = seedDB;