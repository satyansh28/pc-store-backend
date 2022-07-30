import express from 'express';
import 'dotenv/config';
import './passport.js';
import passport from "passport";
import session from 'cookie-session';
import auth_router from './routers/auth_router.js';
import item_router from './routers/item_router.js';
import order_router from './routers/order_router.js';
import mongoose from 'mongoose';

const port=process.env.PORT;
const frontend=process.env.FRONTEND_HOST.replace("/pc-store-frontend","");
const cors=(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", frontend);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Expose-Headers","set-cookie");
    next();
}


const app=express();
const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const dburl=process.env.DB_URL.replace('username',username).replace('password',password);
mongoose.connect(dburl);
app.use(express.json());
app.use(cors);
app.use(session({
    name:"ses",
    maxAge: 24*60*60*1000,
    keys:["supersecurekey1"],
    httpOnly:true,
    secure:false,
    sameSite:"none"
  }))
app.patch("*",(req,res)=>res.send())
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",auth_router);
app.use(item_router);
app.use(order_router);
app.use(function(err, req, res, next) {
    console.log(err);
});


app.listen(port);