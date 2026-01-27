import {z} from 'zod'

export const UserNames = z.string().min(3 , 'Name Must Be At least 3 Characters').max(20 , 'Name Must be less than 20 Character')

export const emails  = z.string().email({message:"Incorrect Email Format"})

export const passwords = z.string().min(6 , "passward must be atleast 6 alphanumeric").regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")


export const SignupSchema = z.object({

    UserName:UserNames ,
    email:emails , 
    password:passwords
})