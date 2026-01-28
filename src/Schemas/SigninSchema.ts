import {z} from "zod"
import { emails, passwords } from "./SignupSchema"


export const SigninSchema = z.object({
    email:emails ,
    password:passwords ,
  
})