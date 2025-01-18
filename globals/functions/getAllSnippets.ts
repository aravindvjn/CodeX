import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getAllSnippets = async () => {
    try {
        const session: any = await getServerSession(authOptions);

        const snippets = await prisma.snippet.findMany({
            where: {
                author: session?.user?.id
            },
            orderBy: { createdAt: 'desc' },
        })
        return snippets;
    } catch (error) {
        console.log(error);
        return []
    }
}