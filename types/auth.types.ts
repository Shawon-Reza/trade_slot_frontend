export type AccountType = 'customer' | 'trader';


export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    accountType: AccountType;
    businessName?: string;
    phone?: string;
}

export interface RegisterResponse {
    message?: string;
    success?: boolean;
    data?: unknown;
}

export interface ApiErrorResponse {
    message?: string;
}

export type ActiveMode = "CUSTOMER" | "TRADER";