import CompanionForm from '@/components/companionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NewCompanion = async () => {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  const canCreateCompanion = await newCompanionPermissions()
  return (
    <main className='flex w-full items-center justify-center mx-auto px-14 flex-col gap-8 h-full max-w-[100vw] pt-4 pb-16 max-sm:px-2 bg-[#0D1117]'>
      {canCreateCompanion ? (

        <article className='w-full flex items-center flex-col gap-5 justify-center'>
          <h1 className='text-2xl font-bold'>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className=" items-center justify-center flex flex-col gap-4 w-full h-full mt-14 min-2xl:w-1/2 pt-10 text-center rounded-lg border-[#21262D] border-2 text-black bg-[#C9D1D9] ">
          <Image src="/images/cta.svg" className='bg-[#C9D1D9] rounded-lg' alt="Companion limit reached" width={200} height={100} />
          <div className="bg-[#161B22] rounded-4xl px-3 py-1.5 text-2xl font-bold text-[#C9D1D9]">
            Upgrade your plan
          </div>
          <h1>You’ve Reached Your Limit</h1>
          <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
          <button className='transition-all text-[#C9D1D9] duration-300 ease-in-out bg-[#0D1117] hover:shadow-md border-slate-400 border-2 shadow-gray-700 p-4 rounded-lg w-2/3 mb-4'>

          <Link href="/subscription" className=" w-full justify-center text-xl font-bold  " >
            Upgrade My Plan
          </Link>
          </button>
        </article>

      )}
    </main>
  )
}

export default NewCompanion
