import mongoose from "mongoose";

if(!mongoose.connection.readyState){
    mongoose.connect("mongodb://localhost:27017/mernauth").then(()=>{
        console.log("database connected..");
    }).catch((err)=>{
        console.log("database connection failed...");
    });
}

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    isAccountVerified:{type:Boolean,default:false},
    verifyEmailOtp:{type:String,default:""},
    verifyEmailOtpExpireAt:{type:Number,default:0},
    verifyOtp:{type:String,default:""},
    otpExpiredAt:{type:Number,default:0},
},{timestamps:true});

const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;