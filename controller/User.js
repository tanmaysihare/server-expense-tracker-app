const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.postSignup = async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(userData.password,10);
        const newUser = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.postLogin = async (req, res) => {
    try {
        const {email , password} = req.body;
        await User.findAll({ where: { email} }).then(user => {
           if(user.length >0){
              if(user[0].password === password){
                return res.status(200).json({success:true, message: 'User Logged in Successfully'});
            }else{
                return res.status(400).json({success:false, message: 'incorrect password'});
            }
           } else{
            return res.status(500).json({success:false, message: 'User does not exist'});
           }
          
        })
        
    } catch(error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.postLogin2 = async (req, res) => {
    try {
        const {email , password} = req.body;
        const user = await User.findOne({ where: { email} });

        if(!user){
            res.status(401).json({success:false, message: 'User does not exist'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false, message: 'incorrect password'});
        }
        return res.status(200).json({success:true, message: 'User logged in successfully'});
        }catch(error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
};