import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return(
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 items-center justify-center">
        <SignIn/>
    </main>
  ) 
}
