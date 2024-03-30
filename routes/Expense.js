const express = require('express');
const router = express.Router();
const expenseController = require('../controller/Expense');

router.post("/",expenseController.postExpense);
router.get("/",expenseController.getExpense);
router.delete("/:id",expenseController.deleteExpense);

module.exports = router;