import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './navItems'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between mx-auto w-full px-14 py-4 bg-[#0D1117] max-sm:px-4 border-b border-[#21262D] shadow-md'>
      <Link href='/' className='text-2xl font-bold text-gray-800'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <Image
                src='/images/logo.svg'
                alt='Logo'
                height={30}
                width={30}                    
                
                />
        </div>
      </Link>
      <div className='flex items-center gap-7 text-[#C9D1D9] text-sm font-medium '>
        <NavItems/>
        <p className='hover:text-[#58A6FF] transition'>Sign-In</p>
      </div>
        
    </div>
  )
}

export default NavBar
