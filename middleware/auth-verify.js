const checklogin=(req,res,next)=>{
    if(req.user)
        next();
    else
    {
        console.log(401);
        res.status(401).send();
    }
        

}
export default checklogin;