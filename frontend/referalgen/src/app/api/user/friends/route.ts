import { NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

// GET: Retrieve friend UIDs for a user
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/users/getFriends/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch friends: ${response.statusText}`);
    }

    const friends: string[] = await response.json();
    return NextResponse.json(friends, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching friends', error: (error as Error).message },
      { status: 500 }
    );
  }
}
