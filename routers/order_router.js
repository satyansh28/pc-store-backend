import express from "express";
import 'dotenv/config';
import checklogin from "../middleware/auth-verify.js";
import Order from "../models/order_model.js";

const router=express.Router();
router.post('/order',checklogin,async(req,res)=>{
    const order=new Order({
        details:req.body.details,
        products:req.body.products,
        user_id:req.user._id
    });
    try
    {
        await order.save();
        res.send();
    }
    catch(e){
        console.log(e);
        res.status(400).send();
    }
})
router.get('/myorders',checklogin,async(req,res)=>{
    const userid=req.user._id;
    try
    {
        const orders=await Order.find({user_id:userid});
        res.status(200).json({orders});
    }
    catch(e){
        console.log(e);
        res.status(400).send();
    }
})

export default router;