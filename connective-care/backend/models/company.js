const mongoose = require('mongoose')
// drivers schema for company db
const driverSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    license: {
      type: String,
      required: true
    }
  });

// company db schemas
const companySchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  registrationInfo: {
      insurance: {
          type: String,
          required: true
      },
      businessEIN: {
          type: String,
          required: true
      },
      address: {
          type: String,
          required: true
      }
  },
  account: {
      username: {
          type: String,
          required: true,
          unique: true
      },
      password: {
          type: String,
          required: true
      }
  },
  drivers: [driverSchema]
  // Add other company-specific fields as needed
});
  
 
  
  // creating the comanpy model for the company info
const Company = mongoose.model('Company', companySchema);

module.exports = Company
