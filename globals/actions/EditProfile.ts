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
        const usernameRegex = /^[a-zA-Z0-9_]{6,30}$/;

        if (typeof username !== 'string' || !usernameRegex.test(username)) {
            return { message: 'username must be at least 6 characters and contain only letters, numbers, and underscores', success: false };
        }


        const user_id = await getUserId();

        const userNameExists = await query('SELECT username from users WHERE username = $1 AND id !=$2', [username, user_id])

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