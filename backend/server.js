const path = require('path')
const colors = require('colors')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

//connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Ticket Status App'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend

if(process.env.NODE_ENV === 'production'){

    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.json({message: 'Welcome to Ticket Status App'})
    })
}
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on ${PORT}`))
//app.listen(process.env.PORT || 3000, () => console.log(`Server started on ${PORT}`))