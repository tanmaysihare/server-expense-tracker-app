const{User} = require('../models');

exports.postSignup = async(req,res)=>{
    try{
        const post = req.body;
        await User.create(post);
        res.json(post);
    }catch (error) {
        console.error('Error searching User:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}