const { User } = require('../models');

exports.postSignup = async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.postLogin = async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await User.findOne({ where: { email: userData.email , password: userData.password } });
        if (existingUser) {
            return res.status(200).json({ message: 'User Login Successfully'});
        }else{
            return res.status(400).json({message: "user not found"});
        }
    } catch(error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};