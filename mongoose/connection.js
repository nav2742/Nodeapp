const mongoose = require('mongoose')
const env = require('dotenv')
let uri
if(process.env.Env === "Prod"){
 uri= 'mongodb+srv://nk11935:Naveen%40123@cluster0.k2ngr.mongodb.net/Users?retryWrites=true&w=majority'
}else{
uri = "mongodb://localhost:27017/Users"
}

function connection(){    
    mongoose.connect(uri).then(console.log("dbconnect successfully",uri))
}
module.exports = connection
