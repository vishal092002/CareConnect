import axios from "axios"

const baseURL = 'http://localhost:5000'

// For users
export const userSignup = async (data) =>{
    try{
        const response = await axios.post(`${baseURL}/routes/createUser`,data)
        return response.data
    }
    catch(error){
        alert(error.response.data)
        console.log(error.response)
        throw error
    }
}

export const userLogin = async(data) =>{
    const { username, password } = data;
    axios.post(`${baseURL}/routes/userLogin`,{username,password}).then((res)=>{
        if(res.data.error){
            console.log(res.data.error)
        }
        else{
            // ideally this part will have some functionality once logged in so we know who is logged in, but for now its used to test if the userlogin works
            alert("successful login")
        }
    })
}

// For Driver
