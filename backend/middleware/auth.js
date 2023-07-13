const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({msg: 'unauth req'});

    try{
        jwt.verify(token, 'pastaman', (err, decoded) => {
            if(err){
                res.status(401).json({msg: 'Uauth req'})
            }else{
                req.user = decoded.user;
                next()
            }
        })
    }catch(err){
        console.log('Internal auth error - error in token validation middle');
        res.status(500).json({msg: 'Internal auth error'});
    }
}

module.exports = validateToken;