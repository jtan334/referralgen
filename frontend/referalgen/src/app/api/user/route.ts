import { NextResponse } from 'next/server';
import{User, Link} from '../../types/types';

const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL; // Place this outside the handlers if it's shared

// GET: Retrieve user links by user ID
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/users/links/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch links: ${response.statusText}`);
    }

    const links: Link[] = await response.json();
    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching user links', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(request: Request) {
  try {
    const newUser: User = await request.json();

    if (!newUser.uid || !newUser.name) {
      return NextResponse.json({ message: 'User UID and name are required' }, { status: 400 });
    }

  
    const response = await fetch(`${apiUrl}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    const createdUser = await response.json();
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating user', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user by user ID
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/users/delete/${userId}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({ message: `User ${userId} deleted`, result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error deleting user', error: (error as Error).message },
      { status: 500 }
    );
  }
}
