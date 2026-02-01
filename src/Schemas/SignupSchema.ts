import {z} from 'zod'

export const UserNames = z.string().min(3 , 'Name Must Be At least 3 Characters').max(20 , 'Name Must be less than 20 Character').trim().toLowerCase()

export const emails  = z.string().email({message:"Incorrect Email Format"})

export const passwords = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .regex(/[0-9]/, "Password must contain at least 1 number")
  .regex(/[\W_]/, "Password must contain at least 1 special character");


export const SignupSchema = z.object({

    UserName:UserNames ,
    email:emails , 
    password:passwords
})