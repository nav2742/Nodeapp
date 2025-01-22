const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
router.get('/view/debts',(req,res)=>{
    res.status(200).send("successful")
    
})

module.exports = router