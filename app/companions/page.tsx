import CompanionCard from '@/components/companionCard';
import SearchFilter from '@/components/SearchFilter';
import SearchInput from '@/components/SearchInput';
import { getAllCompanions } from '@/lib/actions/companion.action';
import React from 'react'

const Companion =async ({searchParams}:SearchParams) => {
  const filters=await searchParams
  const subject=filters.subject?filters.subject:'';
  const topic=filters.topic?filters.topic:'';
  const companions=await getAllCompanions({subject,topic})
  console.log(companions)
  return (
    <main className='mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2'>
      <section className='flex justify-between gap-4 max-sm:flex-col '>
        <h1 className='text-3xl font-bold'>Companions Library</h1>
        <div className='justify-start flex gap-4'>
          <SearchInput/>
          <SearchFilter/>       
        </div>
        
      </section>
    <section className='flex flex-wrap gap-4 w-full max-md:justify-center'>
      {companions.map((compData)=>(
        <CompanionCard key={compData.id} {...compData}/>
      ))}
    </section>
      
    </main>
  )
}

export default Companion
