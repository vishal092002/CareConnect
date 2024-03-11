const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const companyModel = require('../models/company')
const {sign} = require('jsonwebtoken')
// For user side of database

//create user
router.post("/createUser", async(req,res)=>{
    const {name,username,password} = req.body
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
  }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name,
      username: username,
      password: hash
  });
    

    res.json(user)
})

//get user to check if it exists
router.get("/getUsers", async (req,res)=>{
    const { username } = req.query;

  try {
    const user = await userModel.findOne({
        username: { $regex: new RegExp(`^${username}$`, 'i') },
      });
    if (user) {
      return res.json({ error: 'Username Exists' });
    } else {
      return res.json({ message: 'Username Available' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

    

})

//login
router.post("/userLogin",async(req,res)=>{
  const { username, password } = req.body;
  const user = await userModel.findOne( {username:username} );

  if (user) {
      bcrypt.compare(password, user.password).then((same) => {
          if (!same) {
              return res.json({ error: "Incorrect password" });
          }
          const Token = sign({username:username,specs:user.specs},"importantToken")
          return res.json(Token);
      });
  } else {
      return res.json({ error: "Username Does Not Exist" });
  }

  
})

// For Company side of db

// create company 
router.post("/createCompany",async(req,res)=>{
  const company = req.body
  const {name,username,password,registrationInfo} = req.body
  bcrypt.hash(password,10).then((hash)=>{
    companyModel.create({
      name: name,
      registrationInfo: registrationInfo,
      account: {
          username: username,
          password: hash
      }


    })
    
  })
  res.json(company)
})

// Company login
router.post("/companyLogin", async (req, res) => {
  const { username, password } = req.body;
  const company = await companyModel.findOne({ 'account.username': username });

  if (company) {
      bcrypt.compare(password, company.account.password).then((same) => {
          if (!same) {
              return res.json({ error: "Incorrect password" });
          }

          const Token = sign({username:username,password:password},"importantToken")
          return res.json(Token);
      });
  } else {
      return res.json({ error: "Company Username Does Not Exist" });
  }
});

module.exports = router