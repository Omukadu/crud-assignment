const express = require("express");
const router = express.Router();
const users = require("../models/userschema");

// for register from frontend register.js
router.post("/register", async (req, res) => {
  const { name, email, age, mobile, job } = req.body;
  if (!name || !email || !age || !mobile || !job) {
    res.status(422).send("plz fill data");
  }
  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(422).json("this user is already present in database");
      alert("this user is already present in database");
    } else {
      const adduser = new users({ name, email, age, mobile, job });
      await adduser.save();
      res.status(201).json(adduser); //if not written thunder keeps on loading
      console.log(adduser);
    }
  } catch (err) {
    res.status(422).send(err);
  }
});

//for display user in homepage

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    // console.log(userdata)
  } catch (error) {
    res.status(422).send(error);
  }
});

// for getting users full data in view pade
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params); //params use to read data from url
    const { id } = req.params;
    const userindividual = await users.findById({ _id: id });
    
    res.status(201).json(userindividual);
  } catch (err) {
    res.status(422).json(err); // 422 is invalid input
  }
});

//for updateing data
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id,req.body,{
      new:true
    });
    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (err) {
    
    res.status(422).json(err);
  }
});

//for deleting user
router.delete("/deleteuser/:id",async(req,res)=>{
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({_id:id});
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (err) {
    
    res.status(422).json(err);
  }
})


module.exports = router;
