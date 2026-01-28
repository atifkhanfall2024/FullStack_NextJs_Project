import {z} from 'zod'

export const VerifySchema = z.object({

    Otp:z.string().length(6  , 'Verify Code Must Be 6 Digits')

}) 