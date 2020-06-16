// Import .env configurations
const {loadConfig} = require('./config/config')
const mongoose = require('mongoose')

// process.on('uncaughtException', err => {
//   console.log(`▶️ ${err} ◀️`)
//   console.log(`UNCAUGHT REJECTION! 💥 Shutting down...`)
//   process.exit(1) // 0 success, 1 failure
// })

// Initialize configurations
loadConfig()
const port = process.env.PORT || 3000

// Import app
const app = require('./app')

// DB is to connect to atlas.
const DB = process.env.MONGO_URI_DATABASE.replace(
    '<PASSWORD>',
    process.env.MONGO_PASSWORD
)
// port
app.set('port', port)

const DB2 = process.env.MONGO_URI_PLACES
// DB || process.env.DATABASE_LOCAL

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(con => {
        console.log(`DB Connection Successfully! 😁`)
        // console.log(process.env)
    }).catch(err => {
    console.log('Error while creating connection.', err)
})


// Run server on ${port}
const server = app.listen(app.get('port'), () => {
    console.log(`App running on port ${app.get('port')}... 😊`)
})

// process.on('unhandledRejection', err => {
//   console.log(`▶️ ${err.name}: ${err.message} ◀️`)
//   console.log(`UNHANDLED REJECTION! 💥 Shutting down...`)
//   server.close(() => {
//     process.exit(1) // 0 success, 1 failure
//   })
// })

// process.on('SIGTERM', () => {
//   console.log(`✋ SIGTERM RECEIVED. Shutting down gracefully`)
//   server.close(() => {
//     console.log(`💥 Process terminated`)
//   })
// })
