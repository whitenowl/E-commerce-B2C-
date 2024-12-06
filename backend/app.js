
const expores = require("express")
const mongoose=require("mongoose");
const app= expores();
// const port = process.env.PORT || 0;  // Port 0 tells the system to assign an available port

const port = 3000; 
const cors=require("cors");
const categoryRoutes= require("./routes/category");
const brandRoutes= require("./routes/brand");
const orderRoutes=require("./routes/order")
const productRoutes=require("./routes/product")
const customerRoutes=require("./routes/customer")
const authRoutes=require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");


app.use(cors());
app.use(expores.json());
app.get("/",(req,res)=>{
    res.send("Server running");
});

app.use("/category",verifyToken,isAdmin,categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes)
app.use("/orders",verifyToken,isAdmin,orderRoutes)

app.use("/product",verifyToken,isAdmin,productRoutes)
app.use("/customer",customerRoutes)//verifyToken
app.use("/auth",authRoutes)


async function connectDb(){
   await mongoose.connect("mongodb+srv://whitenowlmagar:9omSIX1F7uWnoY4K@testing.nazs6sq.mongodb.net/",{
    dbName: "ecommerce-store-db",
   });
   console.log("mangoose dbconnected")
   
}
connectDb().catch((err)=>{
    console.error(err);
})

app.listen(port,()=>{
    console.log("Server running on port",port);
});