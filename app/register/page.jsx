
'use client'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
// import {form} from "@tailwindcss/forms"

export default function RegisterPage() {
    const router =useRouter()
    const [data,setData]=useState({
        name:'',
        email:'',
        password:'',

    })

    const registerUser=async (e)=>{
       e.preventDefault()
        console.log('sending post req..')
        // const response=

        try {
            
       const response=await fetch('/api/register',{
               method:'POST',
               headers:{
                   'Content-Type':'application/json',
               },
               //passing in the data object to the body as expecting req.body.data to be returned
               body:JSON.stringify({data})
           })
           if(!response.ok){
            console.log('something went wrong')
            console.log(response)
        }else{
            console.log('displaying user info...')
            // console.log(response)
            console.log('pushing to login page ...')
            router.push('/login')

            //afterward we can push the user to go the login page after registration
        // const userInfo= await response.json()
        // console.log(userInfo)
        }
        } catch (error) {
            console.log(error)
        }

    }
    //now we need the user to direct to an end-point which will be authenticated by the next-auth and will send the data about the user to the database

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  //update the state of the name field of the data while keeping the remaining fields of data object same or unchanged for each new object
                  value={data.email}
                  onChange={(e)=>{setData({...data,email:e.target.value})}}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="userName"
                  type="text"
                  required
                  value={data.name}
                  onChange={(e)=>{setData({...data,name:e.target.value})}}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e)=>{setData({...data,password:e.target.value})}}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
    
  )
}
