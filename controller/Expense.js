const {Expenses} = require('../models');

exports.postExpense = async (req,res)=>{
    try{
        const userId = req.user.id;
        console.log("userId", userId)
        const expenseData = req.body;
        expenseData.UserId = userId;
        const newData = await Expenses.create(expenseData);
        res.status(200).json({message:'Expense Created',newData});
    }catch(error){
        
        res.status(500).json({error: 'Internal server error'});
    }
};

exports.getExpense = async(req,res)=>{
    try{
        const userId = req.user.id;
        const expenses = await Expenses.findAll({where:{UserId:userId}});
        res.json(expenses);
    }catch(error){
        res.status(500).json({error: 'Internal server error'});
    }
}; 

exports.deleteExpense = async(req,res)=>{
    try{
        const userId = req.user.id;
        const dltExpense = req.params.id;
        const expenseToDelete = await Expenses.findOne({where:{id:dltExpense, UserId:userId}});
        if(!expenseToDelete) return res.status(400).json({error:"Expense not Found to Delete"});
        await expenseToDelete.destroy();
        res.status(200).json({message:'Expense Deleted'});
    }catch(error){
        res.status(500).json({error: 'Internal server error'});
    }
};