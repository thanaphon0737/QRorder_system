const express = require('express')

const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config()
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATBASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect( (err) => {
    if(err) {
        console.log(err)
    }else {
        console.log('Mysql connecte')
    }
})


const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


app.use(express.json());
//middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3001, () => console.log('Server Up ...'))