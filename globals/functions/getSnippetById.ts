import { prisma } from "@/lib/prisma";

export const getSnippetById = async (id: string) => {
    try {
        const snippet = await prisma.snippet.findFirst({
            where: {
                id: id,
            },
        })
        return snippet;
    } catch (error) {
        console.log(error);
        return null
    }
}