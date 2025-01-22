const express = require('express')
const router = express.Router()
const joi = require('joi')
const password = require('../middleware/password')
const createUser = require('../mongoose/creatingUsers')
router.post('/signUp',async (req,res)=>{
    const schema = joi.object(
        {userName: joi.string().required().min(3).max(15),
        email:joi.string().required().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        password:joi.string().min(5).max(15).required()
        }
    )
    try{
        let {error} = schema.validate(req.body)
        if(error) return res.status(400).send(error.message)
        let pass = await password(req.body.password)
        await createUser({userName:req.body.userName,email:req.body.email,password: pass})
        res.status(201).send('User Created')
        
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router