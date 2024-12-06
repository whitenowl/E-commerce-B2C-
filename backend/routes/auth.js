const express =require("express");
const { registerUser,loginUser } = require("../handlers/auth-handler");
const router=express.Router();


// router.post("/register",async (req,res)=>{
//     let model= req.body;
//     if(model.name && model.email && model.password){
//         //todo register
//         await registerUser(model);
//         res.send({
//             message:"User registered",
//         });
//     }
//     else{
//         res.status(400).json({
//             error:"Please Provide name,email and password"
//         });
//     }
// });

//new
router.post('/register', async (req, res) => {
    try {
      const userData = req.body;
      await registerUser(userData); // This will check for duplicate emails
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration: ", error);
      if (error.message === "Email already exists") {
        res.status(400).send({ error: "Email already exists" });
      } else {
        res.status(500).send({ error: "Internal Server Error" });
      }
    }
  });
  
  

router.post("/login",async (req,res)=>{
    let model= req.body;
    if(model.email && model.password){
        //todo login
        const result= await loginUser(model);
        if(result){
            res.send(result)
        }else{
            res.status(400).json({
                error:"Email or Password is Incorrect"
            });
        }
    }
    else{
        res.status(400).json({
            error:"Please Provide email and password"
        });
    }
});


module.exports= router;