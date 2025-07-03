import { recentSessions } from '@/assets/constants'
import CompanionCard from '@/components/companionCard'
import CompanionList from '@/components/companionList'
import CTA from '@/components/Cta'
import {Button} from '@/components/ui/button'
import { getAllCompanions, getRecentSession } from '@/lib/actions/companion.action'
const Page = async () => {
  const companions= await getAllCompanions({limit:3});
  const recentSessionsCompanion = await getRecentSession(10);

  return (
    <main className='mx-auto px-14 font-poppins flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2'>
      <h1 className='text-3xl font-bold p-6'>Popular Companions</h1>
      <section className=' flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
        {companions.map((companion)=>(
          <CompanionCard
          key={companion.id}
          {...companion}  

            color='bg-[#6AF6FF]'
        />
      
        ))}
      </section>
      <section className=' flex gap-4 mt-8 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center '>
        <CompanionList
          title='Recent Sessions'
          companion={recentSessionsCompanion}
          classNames="w-2/3 max-lg:w-full ml-0 no-scrollbar"
        />
        <CTA/>
      </section>
    
    </main>    
  )
}

export default Page