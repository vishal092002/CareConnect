const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');

dotenv.config()

//=============================================================================================================================================================
//================= connection and establishing names of db and collections====================================================================================
//=============================================================================================================================================================

// Database Names, change the names to what the appropriate db names should be
const userDb= 'test'; 
const companyDb = 'test2' 
const driverDb = 'test3'
const AideDb = 'test4'

// collections, change the names to what the appropriate collection names should be
const userCollection = 'users' 
const companyCollection = 'companies' 
const driverCollection = 'drivers'
const AideCollection = 'aides'

// a connection is going to be needed everytime we make a http request with mongodb
async function connection(dbName) {
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

//=============================================================================================================================================================
//================= For user side of database==================================================================================================================
//=============================================================================================================================================================

//create user
router.post("/createUser", async(req,res)=>{
    const {name,username,password} = req.body
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const hash = await bcrypt.hash(password, 10);

    const db = await connection(userDb)
    try{
      const Collection = db.collection(userCollection);

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
      res.status(500).json({ error: "Internal server error" })
    }
    finally{
      // closing connection once done
      await db.client.close()
    }
    
    
})

// user login
router.post("/userLogin",async(req,res)=>{
  const { username, password } = req.body;
  const db = await connection(userDb)
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

//=============================================================================================================================================================
//================= For company side of database===============================================================================================================
//=============================================================================================================================================================

// create company 
router.post("/createCompany",async(req,res)=>{
  const company = req.body
  const {name,username,password,registrationInfo} = req.body
  bcrypt.hash(password,10).then(async (hash)=>{
    const db = await connection(companyDb)
    try{
      const Collection = db.collection(companyCollection)
      const result = await Collection.insertOne({
        name:name,
        registrationInfo:registrationInfo,
        account:{
          username:username,
          password:hash
        }
      })
      res.json(result)


    }
    catch(error){
      res.status(500).json({ error: "Internal server error" })
    }
    finally{
      await db.client.close()
    }
    
    
  })
 
})

// Company login
router.post("/companyLogin", async (req, res) => {
  const { username, password } = req.body;
  const db = await collection(companyDb)

  try{
    const Collection = db.collection(companyCollection)

    const company = await Collection.findOne({'account.username':username})


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

  }
  catch(error){
    res.status(500).json({ error: "Internal server error" })
  }
  finally{
    await db.client.close()
  }
  
});

//=============================================================================================================================================================
//================= For Driver side of database================================================================================================================
//=============================================================================================================================================================

//create driver
router.post("/createDriver", async(req,res)=>{
  const {firstName,lastName,company,driverID,picture} = req.body
  const db = await(connection(driverDb))

  try{
    const Collection = db.collection(driverCollection)
    const driver = await Collection.findOne({driverID:driverID})
    if(driver){
      return res.status(400).json("Driver already exists")
    }
    const result = await Collection.insertOne({
      firstName:firstName,
      lastName:lastName,
      company:company,
      driverID:driverID,
      picture:picture
    })
    res.json(result)
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" })
  }
  finally{
    await db.client.close()
  }
})

// gets the drivers info
router.get("/getDriver/:driverId", async(req, res) => {
  const driverId = req.params.driverId;
  const db = await connection(driverDb);

  try {
      const Collection = db.collection(driverCollection);
      const driver = await Collection.findOne({ driverId: driverId });

      if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
      }

      res.json(driver);
  } 
  catch(error) {
      res.status(500).json({ error: "Internal server error" });
  } 
  finally {
      await db.client.close();
  }
});


//=============================================================================================================================================================
//================= For Driver Aide side of database================================================================================================================
//=============================================================================================================================================================

//create driver Aide
router.post("/createDriverAide", async(req,res)=>{
  const {firstName,lastName,company,driverID,picture} = req.body
  const db = await(connection(AideDb))

  try{
    const Collection = db.collection(AideCollection)
    const driver = await Collection.findOne({driverID:driverID})
    if(driver){
      return res.status(400).json("Driver already exists")
    }
    const result = await Collection.insertOne({
      firstName:firstName,
      lastName:lastName,
      company:company,
      driverID:driverID,
      picture:picture
    })
    res.json(result)
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" })
  }
  finally{
    await db.client.close()
  }
})

// gets the Driver Aides info
router.get("/getDriverAide/:driverId", async(req, res) => {
  const driverId = req.params.driverId;
  const db = await connection(AideDb);

  try {
      const Collection = db.collection(AideCollection);
      const driver = await Collection.findOne({ driverId: driverId });

      if (!driver) {
          return res.status(404).json({ error: "Driver not found" });
      }

      res.json(driver);
  } 
  catch(error) {
      res.status(500).json({ error: "Internal server error" });
  } 
  finally {
      await db.client.close();
  }
});
module.exports = router