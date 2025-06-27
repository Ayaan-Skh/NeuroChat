"use client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from '@/assets/constants'
import { createCompanion } from '@/lib/actions/companion.action'
import { redirect } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(2, { message: "Username must be at least 2 characters." }),
    subject: z.string().min(2, { message: "Subject is required" }),
    topic: z.string().min(2, { message: "Topic is required" }),
    voice: z.string().min(2, { message: "Voice is required" }),
    style: z.string().min(2, { message: "Style is required" }),
    duration: z.coerce.number().min(1, { message: "Duration is required" }),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 20
        },
    })

    const onSubmit =async (values: z.infer<typeof formSchema>) => {
        const companion=await createCompanion(values)

        if(companion){
            redirect(`/companions/${companion.id}`)
        }else{
            console.log("Failed to create companion")
            redirect('/')
        }
    }
    return (
        <main className=''>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                    <FormField

                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Companion Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Companian Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem
                                className='md:w-[30vw]'>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="border-white bg-[#0D1117] text-white w-full visible capitalize">
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent className='text-md bg-white text-black'>
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    value={subject}
                                                    key={subject}
                                                    className="capitalize"
                                                >
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl>
                                    <textarea className='text-left  border-1 border-white rounded-lg text-sm text-white placeholder:text-white ' placeholder="Ex. Derevatives & Integrals" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Voice</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="border-white bg-[#0D1117] text-white w-full visible capitalize">
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white text-md text-black'>
                                            <SelectItem value='male'>Male</SelectItem>
                                            <SelectItem value='female'>Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Style</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="border-white bg-[#0D1117] text-white w-full visible capitalize">
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white text-md text-black'>
                                            <SelectItem value='formal'> Formal</SelectItem>
                                            <SelectItem value='casual'> Casual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Ex: 20" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='w-full bg-[#58A6FF] hover:bg-[#1F6FEB] cursor-pointer' type="submit">Build Your Companion</Button>
                </form>
            </Form>
        </main>
    )
}

export default CompanionForm
