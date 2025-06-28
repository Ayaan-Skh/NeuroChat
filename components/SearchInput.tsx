'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'


const SearchInput = () => {
    const pathName = usePathname() // To get the path of the url
    const router = useRouter() //To do the navigation
    const searchParams = useSearchParams()
    const query = searchParams.get('topic') || ''; //The query we are searching for



    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathName === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
    }, [searchQuery, router, searchParams, pathName]);


    return (
        <div className='relative border-1 border-[#8B949E] rounded-lg items-center py-1.5 px-2 gap-2 flex h-fit'>
            <Image
                src='/icons/search.svg'
                alt='search'
                height={15}
                width={15}
            />
            <input type="text" placeholder='Search companions... ' className='placeholder-[#C9D1D9] outline-none text-[#C9D1D9]' value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput
