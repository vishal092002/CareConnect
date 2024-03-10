import axios from "axios"

const baseURL = 'http://localhost:5000'

export const userSignup = async (data) =>{
    try{
        const response = await axios.post(`${baseURL}/routes/createUser`,data)
        return response.data
    }
    catch(error){
        console.log("Error creating user")
        throw error
    }
}
export const companySignup = async (data) =>{
    try{
        const response = await axios.post(`${baseURL}/routes/createCompany`,data)
        return response.data
    }
    catch(error){
        console.log("Error creating company user")
        throw error
    }
}