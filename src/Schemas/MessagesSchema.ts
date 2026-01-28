import {z} from "zod"

export const Contexts  = z.string().trim().min(10 , "Context of Message at least 10 characters").max(300 , 'Message will no longer than 300 character')

export const MessageSchema = z.object({
    Context:Contexts,
    CreatedAt:z.date()
})

