'use server';
import { authOptions } from "@/lib/authOptions";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const createSnippetAction = async (prevState: any, formData: FormData) => {
    try {
        const title = formData.get('title')?.toString().trim();
        const code = formData.get('code')?.toString().trim();

        if (!title || !code) {
            return { message: 'You cannot leave empty fields.' };
        }

        const session: any = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return { message: 'You must be logged in to create a snippet.' };
        }

        const userId = session.user.id;
        const results = await query(`
            INSERT INTO snippets (title, code, author_id)
            VALUES ($1, $2, $3) RETURNING *;
        `, [title, code, userId]);

        if (results.rows.length === 0) {
            return { message: 'Failed to create the snippet. Try again later.' };
        }

    } catch (err) {
        console.error('Error creating snippet:', err);
        return { message: 'Internal server error.' };
    }
    redirect('/');
};
