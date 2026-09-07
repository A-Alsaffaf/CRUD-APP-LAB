// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const Car = require('./models/Car')






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT




async function connectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


connectToDB()



// pages routes
app.get('/', (req,res) => {
    res.render('homepage.ejs')
})

app.get('/cars', (req,res) => {
    res.render('all-cars.ejs')
})

app.get('/cars/new', (req,res) => {
    res.render('create-car.ejs')
})


app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
