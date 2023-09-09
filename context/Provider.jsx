
'use client '
//this provider is being introduced inside a different file than layout.js else you have to mark the layout side as
//client which is not feasible
import { SessionProvider } from 'next-auth/react'
export default function Provider({children ,session}) {
  return (
   <SessionProvider session={session}>
    {children}
   </SessionProvider>
  )
}

