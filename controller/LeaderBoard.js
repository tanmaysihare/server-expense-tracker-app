const {User} = require("../models");
const {Expenses} = require("../models");

exports.getLeaderBoard = async(req,res)=>{
    try{
        const users = await User.findAll({where:{isPremium:true}});
        let allExpenses = [];
        for (const user of users) {
        const userExpenses = await Expenses.findAll({where:{UserId:user.id}});
        allExpenses = allExpenses.concat(userExpenses);
    }
         const expenses = allExpenses.sort((a, b) => b.money - a.money);
        let leader= [];
        for(const expense of expenses){
            const leader_board = await User.findOne({where:{id:expense.UserId}});
            leader = leader.concat(leader_board);
        }

        res.json({userData:leader,expenses});
    }catch(error){
        res.status(500).json({error: 'Internal server error'});
    }
}

