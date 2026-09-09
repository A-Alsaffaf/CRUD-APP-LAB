const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    make: {
        type: String, 
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        max:  2027
    },
    plateNumber: {
        type: String,
        required: true, 
        maxLength: 8
    },
    isRegistered: {
        type: Boolean,
        required: true
    },
    engineType: {
        type: String,
        enum: ['V4','V6','V8','V10','V12','I4','I6','I8']
    }
},{timestamps: true})

const Car = mongoose.model('Car', carSchema)

module.exports = Car

