require('dotenv').config();

const mongoose = require('mongoose')

const db = process.env.DB_DATABASE

mongoose.connect(db).then(()=>{
    console.log('Successfully connected to database')
}).catch(()=>{
    console.log('Failed to connect to database')
})