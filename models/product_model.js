import mongoose from 'mongoose';

const schema=mongoose.Schema;
const types=["CPU","Motherboard","GPU","Memory","Storage","Thermal_paste","CPU_cooler","PSU","Cabinet"];
const ItemSchema= new schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true,
        validate(data){
            if(!types.includes(data))
                throw new Error("Invalid item type");
        }
    },
    power:{
        type:Number,
        default:0
    },
    left:{
        type:Number,
        default:1
    },
    img:{
        type:String,
        required:true,
    },
    specs:{
        type:Object,
        default:{}
    }
},{timestamps:true});

const Item=mongoose.model('product',ItemSchema);

export default Item;