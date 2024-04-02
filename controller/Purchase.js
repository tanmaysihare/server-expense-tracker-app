const {Orders} = require("../models");
const {User} = require("../models");
const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.purchasePremium =  async (req,res)=>{
  const userId = req.user.id;
  const userName = req.user.name;
  const userEmail = req.user.email;
    var razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      var options = {
        amount: 900,  // amount in the smallest currency unit
        currency: "INR",
      };
      razorpay.orders.create(options, function (err, order) {
        if(err){
            res.status(400).json({error:"in order creation",err});
        }else{
             Orders.create({orderId: order.id, status:"pending",UserId:userId});
             res.status(200).json({key:process.env.RAZORPAY_KEY_ID,amount:order.amount,order_id:order.id,userName,userEmail});
        }
     
        console.log(order); 
      });
}

exports.update_transaction_status = async(req, res) =>{
  const verification = req.body;
  const body_data = verification.razorpay_order_id + "|" + verification.razorpay_payment_id;
 const newBody_data = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body_data).digest('hex')
  const isValid = newBody_data === verification.razorpay_signature;
  if(isValid){
    res.redirect('http://localhost:3000/homepage');
    Orders.update({status:"paid",paymentId:verification.razorpay_payment_id},{where:{orderId:verification.razorpay_order_id}});
    User.update({isPremium:true},{where:{id:req.user.id}});
    return
  }else{
    res.status(400).json({error:"Invalid Signature"});
    return
  }
}                                            