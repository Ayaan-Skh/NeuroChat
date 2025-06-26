import { recentSessions } from '@/assets/constants'
import CompanionCard from '@/components/companionCard'
import CompanionList from '@/components/companionList'
import CTA from '@/components/Cta'
import {Button} from '@/components/ui/button'
const Page = () => {
  return (
    <main className='mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2'>
      <h1 className='text-3xl font-bold p6'>Popular Companions</h1>
      <section className=' flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
        <CompanionCard
            id='1'
            name='Companion 1'
            topic='This is a description of Companion 1.'
            duration='45 mins'
            subject='Science'
            color='bg-[#6AF6FF]'
        />
        <CompanionCard
            id='2'
            name='Companion 1'
            topic='This is a description of Companion 1.'
            duration='45 mins'
            subject='Maths'
            color='bg-[#586755]'
        />
        <CompanionCard
            id='3'
            name='Companion 1'
            topic='This is a description of Companion 1.'
            duration='45 mins'
            subject='Biology'
            color='bg-[#58A686]'
        />
        
      </section>
      <section className=' flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center '>
        <CompanionList
          title='Recent Sessions'
          companion={recentSessions}
          classNames="w-2/3 max-lg:w-full ml-0"
        />
        <CTA/>
      </section>
    
    </main>    
  )
}

export default Page