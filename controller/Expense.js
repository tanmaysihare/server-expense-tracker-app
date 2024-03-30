const {Expenses} = require('../models');

exports.postExpense = async (req,res)=>{
    try{
        const expenseData = req.body;
        console.log();
        const newData = await Expenses.create(expenseData);
        console.log("newData");
        res.status(200).json({message:'Expense Created',newData});
    }catch(error){
        
        res.status(500).json({error: 'Internal server error'});
    }
};

exports.getExpense = async(req,res)=>{
    try{
        const expenses = await Expenses.findAll();
        res.json(expenses);
    }catch(error){
        res.status(500).json({error: 'Internal server error'});
    }
}; 

exports.deleteExpense = async(req,res)=>{
    try{
        const dltExpense = req.params.id;
        console.log("delete id",req.params.id);
        const dltData = await Expenses.destroy({where:{id:dltExpense}});
        res.status(200).json({message:'Expense Deleted',dltData});
    }catch(error){
        res.status(500).json({error: 'Internal server error'});
    }
};