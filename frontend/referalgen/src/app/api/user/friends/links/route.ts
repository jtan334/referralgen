import { NextResponse } from 'next/server';
import { Link } from '../../../../types/types';

const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

// GET: Retrieve all links from a user's friends
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/users/getFriendsLinks/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch friends links: ${response.statusText}`);
    }

    const links: Link[] = await response.json();
    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching friends links', error: (error as Error).message },
      { status: 500 }
    );
  }
}
