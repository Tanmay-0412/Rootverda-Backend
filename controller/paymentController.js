const { createRazorpayInstance } = require("../config/razorpayConfig")
require('dotenv').config()
const crypto = require('crypto')

const razorpayInstance = createRazorpayInstance()

exports.createOrder = async(req,res) =>{
    const { productId, amount } = req.body 

    // Amount fetched from productId 

    // create an order 
    const options = {
        amount : amount * 100,
        currency : "INR",
        receipt : 'receipt_order1'
    }

    try{
        razorpayInstance.orders.create(options, (err,order)=>{
            if(err){
                console.error("Razorpay Error:", err);
                return res.status(500).json({
                    success : false,
                    message: "Something went wrong1"
                })}
            return res.status(200).json(order)
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message: "Something went wrong2"
        })
    }
} 

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");

    console.log("Generated Signature:", generatedSignature);
    console.log("Signature Match:", generatedSignature === signature);

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};
