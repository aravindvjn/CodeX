import { prisma } from "@/lib/prisma";

export const getAllSnippets = async () => {
    try {
        const snippets = await prisma.snippet.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return snippets;
    } catch (error) {
        console.log(error);
        return []
    }
}