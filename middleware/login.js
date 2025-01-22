const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { date } = require('joi');
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
module.exports = async (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Authorization header is missing');

    const base64Credentials = authHeader.split(' ')[1];
    if (!base64Credentials) return res.status(400).send('Invalid authorization format');

    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = decodedCredentials.split(':');

    if (!username || !password) return res.status(400).send('Invalid credentials format');

    try {
        const user = await users.findOne({ userName: username });
         let SECRET_KEY = "naveenTest"

        if (!user) {
            return res.status(401).send('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate JWT token after successful login
            const token = jwt.sign(
                { userId: user._id, userName: user.userName }, // Payload (user info)
                SECRET_KEY, // Secret key
                { expiresIn: '15m' } // Expiration time (1 hour)
            );

            // Send the token in the response
            res.status(200).send({
                message: 'Login successful',
                token: token,
                expiresIn: new Date().getTime()+14
            });
        } else {
            return res.status(403).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};