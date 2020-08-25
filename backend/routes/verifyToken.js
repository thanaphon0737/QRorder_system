const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(req.user)
        req.user = verified
        next();
    }catch {
        return res.status(400).send('error')
    }
    

    
}