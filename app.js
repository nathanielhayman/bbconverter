const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./website/config/db')

dotenv.config({ path: './website/config/config.env' }) // Configure

connectDB() // Connect to database

// Initiate App
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Rendering setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/website/views');

// Access static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run
app.use('/', require('./website/routes/index'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
