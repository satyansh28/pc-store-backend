import passport from "passport";
import 'dotenv/config';
import oauth from 'passport-google-oauth20';
import User from './models/user_model.js'
const google_strat=oauth.Strategy;
const backend=process.env.BACKEND_HOST;
passport.use(new google_strat({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: backend+"/auth/google/callback",
    pkce:true,
    state:true
  },
  async(accessToken, refreshToken, profile, done)=>{
    
    try{
      const new_user=new User({
      email:profile.emails[0].value,
      name: profile.displayName,
      activated:true
      });
      let user=await User.findOne({email:profile.emails[0].value});
      //console.log(user);
      if(user){
        done(null,user);
      }
      else
      {
        await new_user.save();
        done(null,new_user);
      }
    }
    catch(err){
      console.log(err);
    } 
  }
));

passport.serializeUser((user,done)=>{ 
  done(null,user._id);
})
passport.deserializeUser((id,done)=>{
  User.findById(id, (err, user) => {
    done(err, user);
  });
});