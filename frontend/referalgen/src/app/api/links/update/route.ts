import { NextResponse } from 'next/server';

// Helper function to handle link updates
async function handleLinkUpdate(linkId: string, updateType: 'seen' | 'used') {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  const response = await fetch(`${apiUrl}/links/update/${updateType}?id=${encodeURIComponent(linkId)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    return NextResponse.json(
      { error: `Failed to update ${updateType} status`, details: errorResponse },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}

export async function PATCH(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const linkId = body.id;
    const updateType = body.updateType as 'seen' | 'used';

    // Validate input
    if (!linkId) {
      return NextResponse.json(
        { error: 'Invalid input: ID is required' },
        { status: 400 }
      );
    }

    if (!updateType || !['seen', 'used'].includes(updateType)) {
      return NextResponse.json(
        { error: 'Invalid input: updateType must be either "seen" or "used"' },
        { status: 400 }
      );
    }

    return handleLinkUpdate(linkId, updateType);
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: (error as Error).message },
      { status: 500 }
    );
  }
}