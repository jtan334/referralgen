import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

interface Link {
  UID: number;
  owner: string;
  companyName: string;
  productName: string;
  country: string;
  active: boolean;
  refLink: string;
  seen: number;
  used: number;
}

interface User {
  UID: string;
  name: string;
}

// Handle GET requests to retrieve user links
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  try {
    const response = await fetch(`${apiUrl}/users/links/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch links');
    }

    const links: Link[] = await response.json();
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user links', error: error }, { status: 500 });
  }
}

// Handle POST requests to create a new user
export async function POST(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  try {
    const newUser: User = await req.json();

    const response = await fetch(`${apiUrl}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const createdUser = await response.json();
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error: error }, { status: 500 });
  }
}

// Handle DELETE requests to delete a user by user ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  try {
    const response = await fetch(`${apiUrl}/users/delete/${userId}`, {
      method: 'POST', // Note: Your backend uses POST for DELETE operations
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    const result = await response.json();
    return NextResponse.json({ message: `User ${userId} deleted`, result });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error: error }, { status: 500 });
  }
}
