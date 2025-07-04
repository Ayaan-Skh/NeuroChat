"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const CompanionCard = ({
    id,
    name,
    topic,
    subject,
    duration,
    color,
  
}: CompanionCardProps) => {
    return (
        <article className='hover:shadow-md shadow-gray-500 flex flex-col rounded-2xl border px-4 py-4 gap-3 w-full min-lg:max-w-[400px] justify-between border-[#21262D] bg-[#161B22] transition-all duration-300 ease-in-out' style={{ backgroundColor: color }}>
            <div className='flex justify-between items-center'>
                <div className='bg-[#58A6FF] hover:bg-[#1F6FEB] transition-all ease-in-out duration-200 text-white rounded-4xl text-sm px-2 py-1 capitalize'>{subject}</div>
               
            </div>
            <h2 className='text-lg font-semibold text-[#C9D1D9]'>{name}</h2>
            <p className='text-sm text-[#8B949E]
'>{topic}</p>
            <div className='flex items-center gap-2 text-sm text-[#8B949E]
'>

                <Image src="/icons/clock.svg"
                    alt='duration'
                    width={15}
                    height={15}
                />
                <p className='text-sm'>{duration} minutes </p>
            </div>
            <Link href={`/companions/${id}`} className='text-black font-bold text-md '>
                <Button className='bg-[#58A6FF] hover:bg-[#1F6FEB] transition-all ease-in-out duration-200 w-full h-10 rounded-lg '>Launch lesson</Button>
            </Link>
        </article>
    );
};

export default CompanionCard;