const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    age: {
        type:String,
        required: true
    },
    mobile: {
        type:Number,
        required: true
    },
    job: {
        type:String,
        required: true
    },
})
const users = new mongoose.model("users",userschema)

module.exports = users