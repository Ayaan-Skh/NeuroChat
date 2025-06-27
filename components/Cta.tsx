import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
    return (
        <section className='text-[#8B949E] rounded-4xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full border-[#21262D] bg-[#161B22] hover:shadow-md shadow-gray-500 transition-all duration-300 ease-in-out'>
            <div className='bg-[#58A6FF] hover:bg-[#1F6FEB] rounded-xl px-3 py-1.5 text-black text-lg font-bold'>Learn Your Way</div>
            <h2 className='text-3xl font-bold text-[#C9D1D9]'>Build a Personalized Learning Companion</h2>
            <p className='text-semibold'>Pick a name, subject, voice and personality - and start learning through voice conversations that feel natural and fun</p>
            <Image
                src='images/cta.svg'
                alt='CTA Image'
                width={300}
                height={200}
                className='rounded-4xl'
            >

            </Image>
            <button className='flex gap-3 bg-[#58A6FF] hover:bg-[#1F6FEB] text-black w-full h-10 rounded-xl items-center justify-center hover transition-all duration-300 font-bold'>
                <Image
                    src='/icons/plus.svg'
                    alt="plus"
                    height={12}
                    width={12}
                />
                <Link href={"/companions/new"}
                >
                    <p>Build a New Companion</p>
                </Link>
            </button>
        </section>
    )
}

export default CTA
