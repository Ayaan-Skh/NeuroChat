import CompanionForm from '@/components/companionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const NewCompanion = async () => {
  const {userId}= await auth()
  if(!userId) redirect('/sign-in')
  return (
    <main className='flex w-full items-center justify-center mx-auto px-14 flex-col gap-8 h-full max-w-[100vw] pt-4 pb-16 max-sm:px-2 bg-[#0D1117]'>
      <article className='w-full flex items-center flex-col gap-5 justify-center'>
        <h1 className='text-2xl font-bold'>Companion Builder</h1>
      <CompanionForm/>
      </article>
    </main>
  )
}

export default NewCompanion
