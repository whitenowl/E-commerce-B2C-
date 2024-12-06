const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    date: Date,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    items: Array(mongoose.Schema.Types.Mixed),
    paymentType:String,
    status: String,
    address:mongoose.Schema.Types.Mixed,
});
const Order=mongoose.model("orders",orderSchema);
module.exports= Order;