const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    name: String,
});
const Category=mongoose.model("categorgies",categorySchema);
module.exports= Category;