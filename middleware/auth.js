const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema =new mongoose.Schema({
    userName:{
            type: String,
            minlength: 5,
            maxlength: 5,
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
})

const users =  mongoose.models.users ||mongoose.model('users',userSchema)


module.exports = async (req,res,next)=>{
    const authHeader=req.header('Authorization')
    if(!authHeader) return res.status(401).send('invaild token')
    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) return res.status(401).send('Token missing');
    try {
        // Verify the token using the secret key
        let SECRET_KEY = "naveenTest"
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach decoded user data to the request object for use in further processing
        req.user = decoded;

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error);
        return res.status(401).send('Invalid or expired token');
    }
}