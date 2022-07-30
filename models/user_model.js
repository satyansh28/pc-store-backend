import mongoose from 'mongoose';

const schema=mongoose.Schema;

const UserSchema= new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:false,
        validate(data){
            if(data.length<8)
                throw new Error('password too short');
        }
    },
    orders:{
        type:Array,
        default:[]
    },
    activated:{
        type:Boolean,
        default:false
    },
    google_tokens:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const User=mongoose.model('user',UserSchema);

export default User;