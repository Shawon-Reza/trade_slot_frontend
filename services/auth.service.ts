

import { axiosApi } from '@/lib/axios';
import type { RegisterPayload, RegisterResponse } from '@/types/auth.types';
import { cookies } from 'next/headers';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL


export const authService = {

    getSession: async () => {
        const cookieStore = await cookies()



        const res = await fetch(`${baseURL}/api/auth/get-session`, {
            headers: {
                Cookie: cookieStore.toString()
            },
            cache: "no-store"
        })

        if (res.ok) {
            return {
                data: await res.json(),
                success: true
            }
        }


    }








};