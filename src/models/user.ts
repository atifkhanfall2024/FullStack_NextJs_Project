import mongoose  , {Schema , Document} from "mongoose";

// here we use document for type validation in type script
 export interface Messages extends Document{

    Context:string,
    CreatedAt:Date
}


// also for user type validations

export interface User extends Document{
    UserName:string,
    email:string,
    password:string,
    Otp:string,
    otpExpiry:Date,
    isVerified:boolean,
    AcceptMessages:boolean,
    messages:Messages[]
}


const MessageSchema:Schema<Messages> = new Schema({

    Context:{
        type:String
    },
    CreatedAt:{
        type:Date
    }
})

const UserSchema:Schema<User> = new Schema({

    UserName:{
        type:String,
        required:[true , 'UserName Required'],
        trim:true,
        toLowerCase:true ,
        minlength:3
    } ,

    email:{
         type:String,
        required:[true , 'Email Required'],
        toLowerCase:true ,
        unique:true ,
        match:[/.+\@.+\..+/ , 'Enter Email With Proper Format'] 
    } ,

password: {
  type: String,
  required: [true, "Password Required"],
  match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password should be strong"
  ],
},


    Otp:{
        type:String ,
        required:[true , "OTp is Required"]
    },
    otpExpiry:{
        type:Date ,
        required:[true , "Expiry required"]
    } ,
    isVerified:{
        type:Boolean,
        default:false
    } ,
    AcceptMessages:{
         type:Boolean,
        default:true
    } ,
    messages:[MessageSchema]
    
})


// now making model for user

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('UserSchema' , UserSchema)

export default UserModel
