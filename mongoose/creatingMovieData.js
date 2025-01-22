const { string } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.model("MovieData",new mongoose.Schema({
    movieName:{
        type: String,
        minlength: 3,
        maxlength: 50              
},
    rate:{
        type: Number,
        minlength: 2,
        maxlength: 50              
},
    releaseDate:{
        type: String,
        minlength: 5,
        maxlength: 50               
},
}))
async function creatingData(data){
    try{

        const res = await new Schema({
            movieName:data.movieName,
            rate:data.rate,
            releaseDate:data.releaseDate
        })
        let result = await res.save()
        return result
    }catch(err){
        throw new Error(err)
    }
    

}
module.exports = creatingData
