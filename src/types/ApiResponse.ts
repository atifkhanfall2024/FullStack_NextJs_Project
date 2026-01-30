import { Messages } from "../models/User"
export interface ApiResponse{

    success:boolean ,
    message:string,
    AcceptMessages?:boolean
    messages?:Array<Messages>

}


// the main aim of this file that those field which i want to show in api response NestResponse