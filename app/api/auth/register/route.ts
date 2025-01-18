import { UserType } from '@/components/Auth/type';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password, name }: UserType = await req.json();
    console.log(email,password,name);
    // Validate input fields
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Return success response
    return new Response(JSON.stringify(user), { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
