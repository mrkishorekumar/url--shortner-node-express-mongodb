const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        require : true
    },
    password:{
        type : String,
        require : true,
    },
    username:{
        type : String,
        require : true,
    },
}, {timestamps:true})


module.exports = mongoose.model('UserSchema',userSchema)