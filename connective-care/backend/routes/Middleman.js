const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');

dotenv.config()

// Database Name
const dbName = 'test'; // Change this to your database name

// a connection is going to be needed everytime we make a http request with mongodb
async function connection() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    }
  });  
  try {
      await client.connect();

      //connect to database name
      const db = client.db(dbName);
      return db;
  } catch (error) {
      console.error(error);
  }
}

// For user side of database

//create user
router.post("/createUser", async(req,res)=>{
    const {name,username,password} = req.body
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hash = await bcrypt.hash(password, 10);

    const db = await connection()
    try{
      const Collection = db.collection('users');

      const user = await Collection.findOne({username:username})

      if (user){
        return res.status(400).json("user already exists")
      }

      // Create the user document

      const result = await Collection.insertOne( 
        {
          name: name,
          username: username,
          password: hash
        }
      );    
      res.json(result);
    }
    catch(error){
      res.status(500).json({ error: "Internal server error" });
    }
    finally{
      // closing connection once done
      await db.client.close()
    }
    
    
})

//login
router.post("/userLogin",async(req,res)=>{
  const { username, password } = req.body;
  const db = await connection()
  const Collection = db.collection('users')


  const user = await Collection.findOne({username:username})

  if (user) {
      bcrypt.compare(password, user.password).then((same) => {
          if (!same) {
              return res.json({ error: "Incorrect password" });
          }
          const Token = sign({username:username,password:password},"importantToken")
          return res.json(Token);
      });
  } else {
      return res.json({ error: "Username Does Not Exist" });
  }

  
})

// For Company side of db
//TODO: change logic to match what the user db is doing for mongodb instead of mongoose

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