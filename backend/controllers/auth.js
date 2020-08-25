

const {registerValidation} = require('../validation')
const {loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qr_order'
})



exports.register =  (req, res) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    db.query('SELECT email FROM users WHERE email = ?', [user.email], async(error, results) =>{
        if(results.length >0){
            return res.send('that email is already in use')
        }
        let hashedPassword = await bcrypt.hash(user.password, 8);
        

        db.query('INSERT INTO users SET ?', {name:user.name, email: user.email, password:hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.send('User registered');
            }
        })
    })

}

exports.login =  (req, res) => {
    const {error} = loginValidation(req.body);
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    if(error) return res.status(400).send(error.details[0].message);
    db.query('SELECT * FROM users WHERE email = ?', [user.email], async(error, results) =>{
        try{
            if(error) {
                console.log(error); 
                return res.status(400).send('no data')}
            if( !results || !await (bcrypt.compare(user.password, results[0].password) )){
                res.status(401).send('Email or Password is incorrect')
            }else {
                const id = results[0].id;
                console.log('.env',process.env.JWT_SECRET)
                    const token = jwt.sign({id:id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
    
                    console.log('The token is: ' + token);
                    res.header('auth-token', token).send(token)
            }
        }catch (err){
            console.log(err)
        }
        
        
        

        
    })
    


}
