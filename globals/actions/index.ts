'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const createSnippetAction = async (prevSate: any, formData: FormData) => {
    try {
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        console.log('code', code)
        if (!title.trim() && !code.trim()) {
            return {
                message: 'You cannot leave empty fields.'
            }
        }
        
        const session: any = await getServerSession(authOptions);
        
        if (!session) {
            console.error('No active session found');
            return {
                message: 'You must be logged in to create a snippet.'
            };
        }
        const userId = session?.user?.id
        // // Proceed to create the snippet
        const newSnippet = await prisma.snippet.create({
            data: {
                title,
                code,
                authorId: userId!,
            },
        });
    } catch (err) {
        console.error(err);
    }
    redirect('/')
}
