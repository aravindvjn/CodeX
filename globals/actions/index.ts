'use server';
import { prevActionStateType } from "@/components/AddSnippet/type";
import { DeleteActionType } from "@/components/Card/DeleteButton";
import { query } from "@/lib/db";
import { getUserId } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//edit or create a snippet

export const snippetAction = async (prevState: prevActionStateType, formData: FormData) => {
    try {
        const title = formData.get('title')?.toString().trim();
        const code = formData.get('code')?.toString().trim();
        const language = formData.get('language')?.toString().trim();
        if (!title || !code) {
            return { message: 'You cannot leave empty fields.', snippet_id: prevState?.snippet_id, page: prevState?.page };
        }

        const userId = await getUserId()

        if (!userId) {
            return { message: 'You must be logged in to create a snippet.', snippet_id: prevState?.snippet_id, page: prevState?.page };
        }


        let results;

        if (prevState?.page === 'Edit Snippet') {
            results = await query(`
                UPDATE snippets
                SET title=$1, code=$2,language=$3, updated_at=CURRENT_TIMESTAMP
                WHERE id=$4 AND author_id=$5
                RETURNING *;
            `, [title, code, language, prevState?.snippet_id, userId]);
        } else {

            results = await query(`
            INSERT INTO snippets (title, code, author_id,language)
            VALUES ($1, $2, $3,$4) RETURNING *;
        `, [title, code, userId, language]);

        }

        if (results.rows.length === 0) {
            return { message: `Failed to ${prevState?.page || 'create the snippet'}. Try again later.`, snippet_id: prevState?.snippet_id, page: prevState?.page };
        }

    } catch (err) {
        console.error('Error creating snippet:', err);
        return { message: 'Internal server error.', snippet_id: prevState?.snippet_id, page: prevState?.page };
    }
    revalidatePath('/')
    redirect('/');
};


//delete a snippet 
export const deleteSnippet = async (prevState: DeleteActionType) => {
    try {
        const userId = await getUserId()
        if (!prevState?.snippet_id) {
            return { message: 'Failed to delete the snippet.', snippet_id: '' };
        }
        if (!userId) {
            return { message: 'You must be logged in to delete a snippet.', snippet_id: prevState?.snippet_id };
        }
        const result = await query(`
        DELETE FROM snippets
        WHERE id=$1 AND author_id=$2
        RETURNING *;
    `, [prevState?.snippet_id, userId]);

        if (result.rowCount === 0) {
            return { message: 'Snippet not found or you do not have permission to delete it.', snippet_id: prevState?.snippet_id };
        }

    } catch (error) {
        console.log(error);
        return { message: 'Internal server error.', snippet_id: prevState?.snippet_id };
    }
    revalidatePath('/')
    redirect('/')
};
