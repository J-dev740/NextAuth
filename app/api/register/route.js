import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
//next response is only req when you are using typescript 
//but we can use it anyways even if not needed for js

import { NextResponse } from 'next/server'
//before running or giving post req to server side we need to run prisma client in the cli using npx prima generate
//to produce the prisma client

const prisma = new PrismaClient()

export async   function POST (request,response){

            //if we were using nodeJs we would use 
    //const body = await request.body
    console.log('post request received...')
    const body = await request.json()

    //this is actually a server side file
    try {
    const {name, email,password}=body.data
    console.log(body.data)
    if(!name || !email || !password){
        // NextResponse.redirect('/register')
    //    return new NextResponse(400,{error:'missing email, password, or name '})
       return new NextResponse('missing email, password, or name ',{status:400})
    
    }
    const exist= await prisma.user.findUnique({
        where:{
            email:email
        }

    })

    if(exist){
            return new NextResponse('user already exists',{status:400})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const hashedString=hashedPassword.toString()
    const user= await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })
    console.log('added user...')

    console.log('sending valid response ')
    return NextResponse.json(user)
// return NextResponse.json(body)



    } catch (error) {
        console.log(error)
    }
    

}
