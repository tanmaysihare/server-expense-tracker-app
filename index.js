const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(cors());

const db = require('./models');

const userRouter = require('./routes/User');
app.use('/user',userRouter);
const expenseRouter = require('./routes/Expense');
app.use('/expense',expenseRouter);
const purchaseRouter = require('./routes/Purchase');
app.use('/orders',purchaseRouter);
const LeaderBoardRouter = require('./routes/LeaderBoard');
app.use('/leader_board',LeaderBoardRouter);
const ForgetPasswordRouter = require('./routes/ForgetPassword');
app.use('/password',ForgetPasswordRouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
    console.log('server is running on port 3001');
});
});  