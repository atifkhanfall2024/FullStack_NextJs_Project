import mongoose from "mongoose";

const ConnectDb:()=>Promise<void> = async()=>{

    const url = process.env.Connection_String
    if(!url){
        throw new Error('Url is not Present')
    }

    if(mongoose.connection.readyState === 1){
        console.log('Database Already COnnected');
        return
    }

    try {
        await mongoose.connect(url)

        console.log('Database Connect Success');

    } catch (error) {
        console.log('Database Connection is Not eastablished '  , error);
        process.exit(1)

    }


}

export default ConnectDb