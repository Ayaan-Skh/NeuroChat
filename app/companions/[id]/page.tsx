import CompanionComponent from '@/components/CompanionComponent'
import { getCompanion } from '@/lib/actions/companion.action'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>
}

//params == /url/{id}
//searchParams ==/url?key=value&key1=value1

const CompanionSessions = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params
  const companion = await getCompanion(id)
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  if (!companion) {
    redirect('/companions')
  }
  return (
    <main className='mx-auto px-14 flex flex-col gap-8  h-full max-w-[1400px] pt-10 max-sm:px-2 '>
      <article className='flex justify-between rounded-border shadow-sm hover:shadow-slate-400  rounded-lg bg-[#161B22] hover:shadow-sm min-h-26 max-h-96 gap-6 max-md:flex-col transition-all ease-in-out duration-300'>
        <div className='flex items-center rounded-lg gap-8 cursor-pointer  bg-[#161B22] border-white '>
          <div className='size-[72px] flex ml-5 items-center justify-center max-md:hidden rounded-lg bg-[#58A6FF] hover:bg-[#1F6FEB] transition-all ease-in-out duration-300 '>
            <Image
              src={`/icons/${companion.subject}.svg`}
              alt='subject'
              width={35}
              height={35}
            />
          </div>
          <div className='flex flex-col gap-2 max-md:p-5 '>
            <div className='flex items-center gap-2 '>
              <p className='font-bold text-2xl text-[#C9D1D9]'>{companion.name}</p>
              <div className='bg-[#58A6FF] text-black rounded-4xl text-sm px-2 py-1 capitalize max-sm:hidden'>
                {companion.subject}
              </div>
            </div>
            <p className='text-lg text-[#8B949E] '>{companion.topic}</p>
          </div>
        </div>
        <div className='items-center mt-8 mr-6 max-md:hidden text-xl justify-center'>

          <div className=' cursor-pointer'>
            {companion.duration} minutes
          </div>
        </div>
      </article>
      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSessions
