
'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

//once the user is logged in we can make use of the session in the credentials provider 
//so we need the create the session by wrapping up the whole application using the session provider 


export default function DashboardPage() {
    const {data:session, status}=useSession()
    console.log(session)


  return (
    <div>DashboardPage</div>
  )
}
