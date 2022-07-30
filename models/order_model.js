import mongoose from "mongoose";
const schema=mongoose.Schema;

const order_schema=new schema({
    user_id:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    details:{
        type:Object,
        required:true
    }
},{timestamps:true});
const order= mongoose.model('order',order_schema);
export default order;