import express from "express";
import passport from 'passport';
import 'dotenv/config';
const urouter=new express.Router();
urouter.get("/logout", (req, res) => {

    req.logout();
    res.send();
  });
urouter.get("/check",(req,res)=>{
    if(req.user)
    {
        res.status(200).send();
    }
    else
        res.status(401).send();
})
urouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}));
urouter.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/auth/google',
        successRedirect: process.env.FRONTEND_HOST+'/#/welcome', 
    }),
); 
export default urouter;