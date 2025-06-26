import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companion?: Companion[];
    classNames?: string;
}

const CompanionList = ({ title, companion, classNames }: CompanionsListProps) => {
    function cn(...classes: (string | undefined | false | null)[]): string {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <article className={cn('rounded-4xl border border-black px-7 pt-7 pb-10 max-lg:w-full  bg-[#161B22]', classNames)} >
            <h2 className='text-3xl text-bold text-[#C9D1D9] '>Recent sessions</h2>
            <Table className='text-[#8B949E]'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/3 text-lg">Lesson</TableHead>
                        <TableHead className='text-lg'>Subject</TableHead>
                        <TableHead className='text-lg text-right'>Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companion?.map(({ id, subject, duration, name, topic }) => (
                        <TableRow>
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                    <div className='flex items-center gap-2'>
                                        <div className='size-[72px flex items-center justify-center rounded-lg max-md:hidden' >

                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={name}
                                                width={35}
                                                height={35}
                                                className='rounded-full'
                                            />

                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-xl font-bold'>
                                                {topic}
                                            </p>
                                            <p className='text-sm text-[#8B949E]'>
                                                {name}
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className='subject-badge bg-cyan-500 rounded-lg p-2 text-gray-800 text-sm text-semibold w-fit max-md:hidden'>
                                    {subject}
                                </div>
                                <div className='flex items-center justify-center bg-cyan-500 md:hidden rounded-lg w-fit p-2'>
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='flex justify-end text-xl items-center gap-2 w-full'>
                                    <p>{duration}{' '}
                                        <span className='max-md:hidden'>mins</span>
                                    </p>

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionList
