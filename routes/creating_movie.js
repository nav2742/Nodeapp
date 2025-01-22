const Joi = require("joi");
const express = require('express')
const router = express.Router()
const dataCreation = require('../mongoose/creatingMovieData')

router.post('/movierates', async (req, res) => {

    const schema = Joi.object({
        movieName: Joi.string().min(3).max(20).required(),
        rate: Joi.number().min(2).max(1000).required(),
        releaseDate: Joi.string().min(10).max(20).required()
    }
    )
    try {
        let { error } = schema.validate(req.body)
        if (error)return res.status(403).send(error.message)
        let data = await dataCreation(req.body)
        return res.status(201).send(data)

    } catch (err) {
        return res.status(400).send(err.message)
    }
})

module.exports = router