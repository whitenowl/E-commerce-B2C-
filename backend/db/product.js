const mongoose=require("mongoose");
const {Schema} = mongoose;
const productSchema=new mongoose.Schema({
    name: String,
    shortdescription: String,
    description: String,
    price: Number,
    discount: Number,
    images: Array(String),
    categoryId:[{ type: Schema.Types.ObjectId, ref: 'categories' }],
    brandId:[{ type: Schema.Types.ObjectId, ref: 'brands' }],
    isFeatured:Boolean,
    isNewed:Boolean
});
const Product=mongoose.model("product",productSchema);
module.exports= Product;