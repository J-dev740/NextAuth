import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

//creating new prisma client with allows us to use cli for prisma
const prisma= new PrismaClient()

export const authOptions={
    //create a new prisma client for the prisma Adapter
    adapter:PrismaAdapter(prisma),
    //here we are only providing the credentials provider but you can also give other providers such as github provider google providers etc..
    providers:[
        CredentialsProvider({
            //we will be using this name later on to sign in
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name:"credentials",
            credentials:{
                //nextauth does provide a build in unbranded signin page at a particular url GET/api/auth/signin
                //but we are going to build a custom tailwind interface 
                username: { label: "Username", type: "text", placeholder: "John Doe" },
                password: {  label: "Password", type: "password" },
                email:{label:'Email',type:'email'}
            },
            //callback that initiates when you are trying to login to check the authenticity of the user if  the user exists or not if exists then does the password match
            async authorize(credentials){
                //this is where all the login functionality is going to go
                //check to see if email and password is valid
                if(!credentials.email || !credentials.password){
                    console.log('no email or password found ')
                    return null
                    
                }
                //check to see if the user exists
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email,

                    }
                })

                if(!user){
                    console.log('no user found')
                    return null 
                    
                }
                //if the user is found
                //check to see if the user typed in the correct password 
                const passwordMatch= await bcrypt.compare(credentials.password,user.hashedPassword)
                if(!passwordMatch)
                {
                    console.log('no password match')
                    return null 
                }
                //return user object if everything is valid
                console.log('returning user found...')
                return user;

            } 
        })

    ],
    session:{
        strategy:"jwt",
    },
    //this secret allows us to use the jwt token 
    secret:process.env.NEXTAUTH_SECRET||"secret",
    //debug is going to debug any errors that will happen on your next-auth side while in development ie if no errors found on developemnt -> no errors in production:)
    debug: process.env.NODE_ENV==="development",


}

//now we have to provide a handler for next auth with the authOptions that we provide above
//this is bascially a handler for any route you take 
const handler= NextAuth(authOptions)
//export it using http request as the video says? doubt
//this is going to allow this handler to take an get and post req that the next-auth provides 
//which allows for signin functionality login functionality etc...
//and this is actually a catch all route 
export {handler as GET, handler as POST }
//now we have to define the logic inside the authorize callback function which is basciallly going to authrize the user 

