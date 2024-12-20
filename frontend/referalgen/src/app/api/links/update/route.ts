import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  try {
    // Parse the request body
    const body = await req.json();
    const linkId = body.id;

    // Validate input
    if (!linkId) {
      return NextResponse.json(
        { error: 'Invalid input: ID is required' },
        { status: 400 }
      );
    }

    // Make a PATCH request to the backend API with id as a query parameter
    const response = await fetch(`${apiUrl}/links/update/seen?id=${encodeURIComponent(linkId)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check for API response errors
    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(
        { error: 'Failed to update seen count', details: errorResponse },
        { status: response.status }
      );
    }

    // Return successful response
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: (error as Error).message },
      { status: 500 }
    );
  }
}
