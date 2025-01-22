const mongoose = require('mongoose')
const Schema = mongoose.model('users', new mongoose.Schema({
    userName:{
            type: String,
            minlength: 5,
            maxlength: 50,           
            unique: true               
    },
    email:{
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true 
    },
    password:{
        type: String,
            minlength: 5,
            maxlength: 1024
    }
}))


async function createUser(data){
    try{
    let users = await new Schema({
        userName:data.userName,
        email:data.email,
        password:data.password
    })
    let response = await users.save()
    return response
    
}catch(err){
    throw new Error(err)
}   

}
    



module.exports = createUser