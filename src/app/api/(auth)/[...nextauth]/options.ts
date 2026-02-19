import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectDb from "@/lib/db";
import UserModel from "@/models/user";
import { Compare } from "@/helpers/hashpass";

// here we define custom credantials for signup api by entering passward and emails

export const NextAuthFunction : NextAuthOptions={

    // here we would define provider that which one we use credantials or google or github etc
    providers:[

        // inside here we need to provide a platform
        CredentialsProvider({

             id: "credentials",
           name: "Credentials",

           credentials:{

            // here we need that on which thing we need to signup so i need to signup with email and passward
            UserName: { label: "name", type: "text"},
              email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }

           },

         async authorize(credentials, any) :Promise<any>{
               await ConnectDb()
               try {
                 if (!credentials?.email && !credentials?.UserName) {
                 throw new Error("Email or Username is required");
          }
          if (!credentials?.password) {
            throw new Error("Password is required");
          }
                // first we will find user by username or email
                const user = await UserModel.findOne({
                    $or:[
                        {email:credentials.email},
                        {UserName:credentials.UserName}
                    ],
                })
                  if(!user){
                        throw new Error('User Not found')
                    }

                    if(!user.isVerified){
                         throw new Error('Please Verify Account first')
                    }

                    const passwordcheck = await Compare(credentials.password , user.password)
                    if(!passwordcheck){
                        throw new Error('Password is incorrect')
                    }
                    return user

               } catch (err:any) {
                 throw new Error(err)
               }
           },

        })



    ],
    callbacks:{

    async jwt({ token, user }) {
        if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.AcceptMessages = user.AcceptMessages;
        token.UserName = user.UserName
    }
      return token
    },
  async session({ session,token }) {

      if (session.user) {
    session.user._id = token._id as string;
    session.user.isVerified = token.isVerified as boolean;
    session.user.AcceptMessages = token.AcceptMessages as boolean;
    session.user.UserName = token.UserName as string;
  }
      return session
    },
   
    },
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET


}