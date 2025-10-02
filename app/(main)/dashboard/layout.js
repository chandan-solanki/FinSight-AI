import React, { Suspense } from 'react'
import {BarLoader} from 'react-spinners'


const DashboardLayout = ({ children }) => {
  return (
    <div className='px-5 space-y-2'>
        <h1 className="text-6xl font-bold text-center gradient">Dashboard</h1>

        <Suspense fallback={
           <BarLoader  className="mt-4" width={"100%"} color='#9333ea'/>
        }> 
            {children}
        </Suspense>
    </div>
  )
}

export default DashboardLayout