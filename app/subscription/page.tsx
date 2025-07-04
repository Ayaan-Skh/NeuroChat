import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Subscriptions = () => {
  return (
    <main className='mx-auto px-14 flex flex-col gap-8 bg-background h-full bg-[#0D1117] max-w-[1400px] pt-10 max-sm:px-2'>
     <PricingTable/>
    </main>
  )
}

export default Subscriptions
