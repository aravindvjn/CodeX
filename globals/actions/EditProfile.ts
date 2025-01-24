'use server'
import { query } from "@/lib/db";
import { getUserId } from "@/lib/session";

export const editProfile = async (prev: { message: string, success?: boolean } | undefined, formData: FormData) => {
    try {
        const name = formData.get('name');
        const bio = formData.get('bio');
        const username = formData.get('username');

        if (!username) {
            return { message: 'username is required', success: false };
        }

        if (typeof username !== 'string' || username.length < 6) {
            return { message: 'username must be at least 6 characters', success: false };
        }
        
        const user_id = await getUserId();

        const userNameExists = await query('SELECT username from users WHERE username = $1 AND id !=$2', [username,user_id])

        if (userNameExists?.rows?.length > 0) {
            return { message: 'Username already exists', data: false };
        }

        const results = await query(
            `UPDATE users SET name = $1, username = $2, bio = $3 WHERE id = $4 RETURNING *`,
            [name, username, bio, user_id]
        );

        if (results.rows.length > 0) {
            return { message: 'Profile updated successfully', success: true };
        }
        return { message: 'Failed to update profile', success: false };
    } catch (error) {
        return { message: 'Internal Server Issue', success: false };
    }
}