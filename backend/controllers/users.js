const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator')

// @route   POST api/users
// @desc    Register User
// @access  Public
exports.register = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log("here we go")
        return res.status(400).json({errors: errors.array()})
    }

    const {name, password} = req.body;

    console.log(req.body)
    console.log(name)

    let user;

    try{
        
        user = 
        ( await User.findOne({name}))
        console.log(user)
        if(user){
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Creds'
                }]
            })
        }

        user = new User({ name, password})


    
    
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);


    
       

        await user.save();

     
        const payload = {
            user: {
                id: user.id
            }
        }
  

        jwt.sign(
            payload,
            "pastaman",
            {expiresIn: '364d'},
            (err, token)=>{
                if(err) throw err;
                return res.json({token})
            }
        )
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
      }

     
   
}

