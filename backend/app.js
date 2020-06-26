const fs = require('fs')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const cors = require('cors')

// Start express app
const app = express()
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const apiRouter = require('./routes/apiRoutes')
const service = process.env.APP_SERVICE
const version = process.env.APP_VERSION

// Development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    // console.log(req.cookies);
    next()
})

// Set as Json
app.use(bodyParser.json({ limit: '10kb' }))

app.use('/uploads/images', express.static(path.join('uploads', 'images')))
app.use(express.static(path.join('public')))

// app.use('/uploads/images', express.static(path.join('uploads', 'images')))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     next()
// })

app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())



// 2) ROUTES
app.use(`${service}${version}`, apiRouter)

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.use((error, req, res, next) => {
    if (req.file) fs.unlink(req.file.path, (err) => console.log(err))
    // if (res.headerSent) {
    //     return next(error)
    // }
    // res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred'})
})




// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
// })
  
app.use(globalErrorHandler)

module.exports = app