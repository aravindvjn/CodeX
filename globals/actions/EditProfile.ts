'use server'
import { query } from "@/lib/db";
import { getUserId } from "@/lib/session";

export const editProfile = async (prev: { message: string, name: string | null } | undefined, formData: FormData) => {
    try {
        const name = formData.get('name');
        console.log(name)
        if (!name) {
            return { message: 'Name is required', name: null };
        }
        const user_id = await getUserId();
        const results = await query(`UPDATE users SET name = $1 where id = $2 RETURNING name`, [name, user_id])
        if (results.rows.length > 0) {
            return { message: 'Profile updated successfully', name: results.rows[0].name };
        }
        return { message: 'Failed to update profile', name: null };
    } catch (error) {
        return { message: 'Internal Server Issue', name: null };
    }
}