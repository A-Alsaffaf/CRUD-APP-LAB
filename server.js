// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const Car = require('./models/Car')
const morgan = require("morgan")
const methodOverride = require('method-override')






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(morgan('dev'))
app.use(methodOverride('_method'))





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

app.get('/cars/new', (req,res) => {
    res.render('create-car.ejs')
})

// route to create new car
app.post('/cars/new', async (req,res) => {
    req.body.isRegistered = Boolean(req.body.isRegistered)
    console.log(req.body);
    const createdCar = await Car.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        plateNumber: req.body.plateNumber,
        engineType: req.body.engineType,
        isRegistered: req.body.isRegistered,
    })
    res.redirect('/cars')
})

// route to read cars from DB
app.get('/cars', async (req,res) => {
    const getAllCars = await Car.find()
    console.log(getAllCars);
    
    res.render('all-cars.ejs', {cars: getAllCars})
})

// route to the page for Updating the car details 
app.get('/cars/:carId/update', async (req,res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('update-car.ejs', {car: foundCar})
})

// route to update car details form
app.put()


app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000
