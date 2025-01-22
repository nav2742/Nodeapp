const express = require('express')
const app = express()
const signup = require('./routes/signUp')
// const expenses = require('./routes/expenses')
const auth = require('./middleware/auth')
const login = require('./middleware/login')
const cors = require('cors');
const movieData = require('./routes/creating_movie')

const dbconnect = require('./mongoose/connection')

app.use(express.json());
app.use(cors({
    origin: '*',  // Allow all origins (for testing)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());
app.use(express.urlencoded({ extended: true }))

app.use('/',signup)
app.use('/login',login)
app.use(auth)
// app.use('/',expenses)
app.use('/',movieData)
dbconnect()

app.listen(8000,()=>console.log("listening port 8000"))