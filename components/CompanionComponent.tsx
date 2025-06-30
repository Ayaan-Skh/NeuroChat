'use client'

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'
import { vapi } from '@/lib/actions/vapi.sdk';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/assets/constants/soundwaves.json'
import { configureAssistant } from '@/assets/lib/utils';


enum CallStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    CONNECTING = "CONNECTING",
    FINISHED = "FINISHED"
}

const CompanionComponent = ({ userImage, userName, topic, name, subject, style, voice, companionId }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false)
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    const [messages, setMessages] = useState<SavedMessage[]>([])
    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }
        const onSpeachStart = () => { }
        const onSpeachEnd = () => { }
        const onError = (error: Error) => { console.log('ERROR', error) }

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('speech-start', onSpeachStart)
        vapi.on('speech-end', onSpeachEnd)
        vapi.on('error', onError)

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('speech-start', onSpeachStart)
            vapi.off('speech-end', onSpeachEnd)
            vapi.off('error', onError)
        }

    }, [])

    const [isMuted, setIsMuted] = useState(false)
    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }
    const handleCall = () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides =
        {
            variableValues: { subject, topic, style },
            clientMessages: ['transcript'],
            serverMessages: []
        }
        //@ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }
    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className='flex flex-col h-[70vh]'>
            <section className='flex gap-8 max-sm:flex-col '>
                <div className='border-2 shadow-sm hover:shadow-slate-400 border-[#21262D] w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center rounded-lg transition-all ease-in-out duration-300'>
                    <div className='size-[300px] flex items-center justify-center rounded-lg max-sm:size-[100px] mt-4 bg-[#58A6FF] hover:bg-[#1F6FEB] transition-all ease-in-out duration-200'>
                        <div
                            className={
                                cn('absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}
                        >
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt='subject'
                                height={150}
                                width={150}
                                className='max-sm:w-fit'
                            ></Image>

                        </div>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className='size-[300px] max-sm:size-[100px]'
                            ></Lottie>

                        </div>
                    </div>
                    <p className='font-bold text-2xl'>{name}</p>

                </div>
                <div className='flex flex-col gap-4 w-1/3 max-sm:w-full max-sm:flex-row'>
                    <div className='border-2 border-[#21262D] shadow-sm hover:shadow-slate-400 transition-all ease-in-out duration-300 flex flex-col gap-4 items-center rounded-lg py-8 max-sm:hidden'>
                        <Image
                            src={userImage}
                            alt={'user'}
                            width={130}
                            height={130}
                            className='rounded-lg'
                        />
                        <p className='font-bold text-2xl'>{userName}</p>
                    </div>
                    <button className='border-2 border-[#21262D] shadow-sm hover:shadow-slate-400 rounded-lg flex flex-col gap-2 items-center py-8 max-sm:py-2 cursor-pointer w-full' onClick={toggleMicrophone} disabled={callStatus!==CallStatus.ACTIVE}>
                        <Image
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt='mic'
                            width={30}
                            height={30}
                            className=''
                        />
                        <p className='max-sm:hidden font-semibold text-[#C9D1D9]'>{isMuted ? "Turn off microphone" : 'Turn on microphone'}</p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer w-full text-black font-medium text-md hover:bg-[#1F6FEB] transition-all ease-in-out duration-200', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-[#58A6FF]', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? "Connecting" : "Start Session"}
                    </button>
                </div>

            </section>
            <section className='relative flex flex-col gap-4 w-full items-center pt-8 flex-grow overflow-hidden'>
                <div className='overflow-y-auto text-[#C9D1D9] w-full flex flex-col gap-4 max-sm:gap-2 pr-2 h-full text-xl'>
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        name
                                            .split(' ')[0]
                                            .replace('/[.,]/g, ', '')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>
                <div className='pointer-events-none absolute bottom-42 left-0 right-0 h-40 max-sm:h-20 bg-gradient-to-t from-background via-background/90 to-transparent z-10 scrollbar-black       '/>
            </section>
        </section>

    )
}

export default CompanionComponent
