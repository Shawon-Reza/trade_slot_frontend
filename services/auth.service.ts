// import { RegisterPayload } from "@/types/auth.types";
// import { fetch } from "next";

// export const authService = {

//     register: async (payload : RegisterPayload) => {
//         const { name, email, password, accountType } = payload;
//         try {
//             const response = await fetch('/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });
//             console.log("Register",response)
//         } catch (error) {
//             console.error('Error registering user:', error);
//             throw error;
//         }
//     }
// }