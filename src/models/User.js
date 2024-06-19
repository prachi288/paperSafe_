const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    schemaVersion:{
        type: Number,
        default: 1
    },
    firstName:{
        type: String,
        default: 1,
    },
    lastName:{
        type: String,
        required: true,
    },
    mobileNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    emailID : {
        type: String,
        unique: true
    },
    dob : {
        type: Date,
        require: true
    },
    gender : {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Others'],
            message: '{VALUE} is not supported'
          }
    },
    uniqueID : {
        type: String,
        required: true,
        unique: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;