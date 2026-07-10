require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 2000
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const razorpay = require('razorpay')

app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://rootverda.netlify.app"
    ],
    credentials : true
}))

app.use('/api/auth', authRoutes)
app.use('/api/payment', paymentRoutes)
mongoose.connect(process.env.DB_URI)
.then(()=> console.log('Database connected successfully...'))
.catch((err)=> console.error(err))

app.listen(PORT , ()=> {
    console.log(`Server running on port ${PORT}`)
})

