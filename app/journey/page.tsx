import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserCompanion, getUserSession } from '@/lib/actions/companion.action'
import Image from 'next/image'
import CompanionList from '@/components/companionList'

const Profile = async () => {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const companions = await getUserCompanion(user.id)
  const sessionHistory = await getUserSession(user.id, 10)

  return (
    <main className='mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 min-lg:w-2/3 text-[#C9D1D9]'>
      <section className='flex justify-between gap-4 max-sm:flex-col items-center'>
        <div className='flex items-center gap-4'>

          <Image
          className='rounded-lg hover:shadow-md shadow-gray-500 transition-all duration-300 ease-in-out'
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          ></Image>
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl'>
              {user.firstName} {user.lastName}
            </h1>
            <p className='text-sm text-muted-foreground'>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='bg-[#161B22] border border-[#C9D1D9] rounded-lg p-3 gap-2 flex flex-col hover:shadow-md shadow-gray-500 transition-all duration-300 ease-in-out'>
            <div className='flex gap-2 items-center'>
              <Image
                src={'/icons/check.svg'}
                alt='check icon'
                width={22}
                height={22}
              >

              </Image>
              <p className='text-2xl font-bold'>{sessionHistory?.length}</p>
            </div>
            <div>Lesson Completed</div>
          </div>
          <div className='bg-[#161B22] border border-[#C9D1D9] rounded-lg p-3 gap-2 flex flex-col hover:shadow-md shadow-gray-500 transition-all duration-300 ease-in-out'>
            <div className='flex gap-2 items-center'>
              <Image
                src={'/icons/cap.svg'}
                alt='check icon'
                width={22}
                height={22}
              >

              </Image>
              <p className='text-2xl font-bold'>{companions?.length}</p>
            </div>
            <div>Companions Created</div>
          </div>
        </div>
      </section>
      <Accordion type="single" collapsible  className=' text-[#C9D1D9]'>
        <AccordionItem value="recent">
          <AccordionTrigger className='text-2xl font-bold'>Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <CompanionList title='Recent Sessions'
              companion={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='companions'> 
          <AccordionTrigger className='text-2xl font-bold'>My Companions</AccordionTrigger>
          <AccordionContent>
            <CompanionList title='My companions' companion={companions}></CompanionList>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </main>
  )
}

export default Profile
