const express = require("express");
const { UserModel } = require("../Models/register");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userRouter = express.Router();


//register router
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password })
  try {
    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) res.status(400).send("User already exist, please login");
    else {
      bcrypt.hash(
        password,
        Number(process.env.saltRounds),
        async (err, hash) => {
          if (hash) {
            
            const user = new UserModel({
              name,
              email,
             
              password: hash,
              
            });
            await user.save();
            res.status(200).send("Registered");
          } else {
            res.status(500).send(err);
          }
        }
      );
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//login router
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if email and password are present in the request body
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const user = await UserModel.findOne({ email });
    
    // check if user exists in the database
    if (!user) {
      return res.status(404).send("User not found");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, process.env.secretKey);
        
        res.send({ msg: "Login Successfull", token: token });
        console.log(user);
      } else {
        res.status(401).send("Incorrect password");
      }
    });

  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = {
  userRouter,
};