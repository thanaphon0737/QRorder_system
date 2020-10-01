const router = require('express').Router();
const verify = require('./verifyToken');
router.get('/',verify, (req,res) =>{
    console.log(req.user)
    user = req.user
    res.json({
        user: {
            id:user.id,
            email:user.email,
            role:user.role
        }
    })
})

module.exports = router;