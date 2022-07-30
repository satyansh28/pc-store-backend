import express from "express";
import 'dotenv/config';
import Item from "../models/product_model.js";
import checklogin from "../middleware/auth-verify.js";
import Order from "../models/order_model.js";

const router=express.Router();
router.get('/products',checklogin,async(req,res)=>{
    try{
        
        const sort_query={};

        const find_query={};
        const page=(req.query.page?req.query.page:1);
        console.log(req.query.search);
        if(req.query.search && req.query.search.replace('+',' ').trim()!="")
            find_query.$text={$search:req.query.search.trim().replace('+',' ')};
        if(req.query.type)
            find_query.type=req.query.type;
        if(req.query.min_price || req.query.max_price)
            find_query.price={ $lte: parseInt(req.query.max_price) || 1000000000, $gte: parseInt(req.query.min_price) || 0 };
        if(req.query.eoos && req.query.eoos==="1")
            find_query.left={$gte:1};
        if(req.query.sort)
        {
            if(req.query.sort==="newest")
                sort_query.createdAt=(-1);
            if(req.query.sort==='price-high')
                sort_query.price=(-1);
            if(req.query.sort==="price-low")
                sort_query.price=(1);
        }
        const products=await Item.find(find_query).sort(sort_query).skip((page-1)*10).limit(10);
        res.status(200).json({products});
    }
    catch(e)
    {
        res.status(400).send();
        console.log(e);
    }
});

export default router;