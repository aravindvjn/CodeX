export type AuthType = {
    email?: {
        value?: string;
        valid?: boolean
    }
    password?: {
        value?: string;
        valid?: boolean
    }
}
export type UserType = {
    email: string;
    password: string;
    name?: string;
}