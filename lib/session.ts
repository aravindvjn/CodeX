'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getUserId = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return null;

        }
        return session?.user?.id || null;
    } catch {
        return null;
    }
}
export const getUserData = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return null;

        }
        return session?.user || null;
    } catch {
        return null;
    }
}