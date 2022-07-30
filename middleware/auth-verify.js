const checklogin=(req,res,next)=>{
    if(req.user)
        next();
    else
    {
        console.log(403);
        res.status(403).send();
    }
        

}
export default checklogin;