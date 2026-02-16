import {z} from 'zod'
import { emails } from './SignupSchema'
  export const Otp =z.string().length(6  , 'Verify Code Must Be 6 Digits').trim()
  
export const VerifySchema = z.object({

    Otp:z.string().length(6  , 'Verify Code Must Be 6 Digits').trim() ,

}) 