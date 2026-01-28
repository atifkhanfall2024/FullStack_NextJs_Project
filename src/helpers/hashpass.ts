import * as bcrypt from 'bcryptjs'


export const HashOtp = async(password:string):Promise<string> =>{

     const hashpassword =  await bcrypt.hash(password , 10)
     return hashpassword
}

export const Compare = async(password:string , comparepassward:string):Promise<boolean>=>{

    const comparepass = await bcrypt.compare(password , comparepassward);
    return comparepass

}