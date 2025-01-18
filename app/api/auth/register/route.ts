import { UserType } from '@/components/Auth/type';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password, name }: UserType = await req.json();

    // Validate input fields
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    // Check if the user already exists
    const results = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (results.rows.length > 0) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const insertResult = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = insertResult.rows[0];

    // Return success response with the new user data
    return new Response(JSON.stringify(newUser), { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
