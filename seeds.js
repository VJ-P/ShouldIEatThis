const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const Comment = require("./models/comment");
 
let seeds = [
    {
        name: "Pizza", 
        image: "https://bit.ly/2weGHgx",
        description: "This is a fantastic version of an Italian classic. The feta cheese adds a rich flavor that brings this dish to life. Incredibly easy and incredibly delicious!"
    },
    {
        name: "Pecan Pie", 
        image: "https://bit.ly/2X7DDhm",
        description: "Buttery, nutty, and a touch of caramel, this is a very yummy pie! Full of flavor! Serve hot or cold, with a good size dollop of whipped topping or vanilla ice cream."
    },
    {
        name: "Bacon and Eggs", 
        image: "https://bit.ly/39Jmopg",
        description: "This easy low-carb breakfast is SUPER satisfying. No bread? No problem."
    },
    {
        name: "Chocolate Chip Cookies",
        image: "https://bit.ly/2yS5Rmn",
        description: "Crispy around the edges, chewy and chocolaty in the middle, and thin, oh so thin. My 'secret' formula has been adapted from Alton Brown's famous, 'The Thin' recipe, and is fairly foolproof. The only real variable is the baking time, since we all scoop slightly different amounts. And yes, of course you can add nuts to yours!"
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