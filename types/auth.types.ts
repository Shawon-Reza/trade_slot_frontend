export type AccountType = 'customer' | 'trader';


export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
    businessName?: string;
    phone?: string;
}