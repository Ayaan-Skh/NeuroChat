'use client'
import  Link  from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems=[
    {label:"Home",href:"/"},
    {label:"Companions",href:"/companions"},
    {label:"Profile",href:"/journey"}
]

const NavItems = () => {
    const pathname=usePathname()
    function cn(...classes: (string | boolean | undefined)[]): string {
        return classes.filter(Boolean).join(' ');
    }

  return (
    <div className='flex items-center sm:gap-8 gap-4 font-sm '>
      {navItems.map(({label,href})=>(
        <Link href={href} key={label} className={cn(pathname===href && 'text-[#58A6FF] font-semibold transition-all ]')}>{label}</Link>
          
      ))}
    </div>
  )
}

export default NavItems
