import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/assets/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceId = voices[voice as keyof typeof voices][
    style as keyof (typeof voices)[keyof typeof voices]
  ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hi, welcome to your mock interview session. Today we'll be focusing on {{ topic }} under {{ subject }}. I’ll be asking you a series of questions just like in a real interview. Answer them as you normally would, and I’ll give you honest feedback after each. Ready to begin?",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Stick strictly to the topic: {{ topic }} under the subject: {{ subject }}.
                    Start by asking one relevant interview question at a time.
                    After each answer, pause, listen fully, and provide honest, constructive feedback—dont avoid pointing out mistakes or weaknesses.
                    If the answer is wrong, explain why and guide the candidate to the correct approach.
                    If the answer is partially correct, acknowledge whats right, but push for deeper understanding or optimization.
                    Maintain a confident, calm, and evaluative tone—just like an actual interviewer.
                    Adjust your questions dynamically based on how the candidate is performing (increase or decrease difficulty).
                    Keep your language simple, professional, and voice-friendly—no special characters.
                    Keep responses short and crisp, just like in a real interview.
              `,
        },
      ],
    },
    clientMessages: undefined,
    serverMessages: undefined,
  };
  return vapiAssistant;
};