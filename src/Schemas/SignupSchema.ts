import {z} from 'zod'

export const UserName = z.string().min(3 , 'Name Must Be At least 3 Characters').max(20 , 'Name Must be less than 20 Character')

export const emails  = z.string().email({message:"Incorrect Email Format"})

export const passwords = z.string().min(6 , "passward must be atleast 6 alphanumeric")


export const SignupSchema = z.object({

    UserName:UserName ,
    email:emails , 
    password:passwords
})