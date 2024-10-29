import { NextResponse } from 'next/server';
import {Link} from '../../types/types'

// GET request handler
export async function GET(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

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
      throw new Error('Failed to fetch user links');
    }

    const data: Link[] = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user links', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST request handler
export async function POST(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  try {
    const newLink: Link = await req.json(); // Parse request body
    const response = await fetch(`${apiUrl}/links/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLink),
    });

    if (!response.ok) {
      throw new Error('Failed to create link');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create link', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT request handler
export async function PUT(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;
  const { searchParams } = new URL(req.url);
  const editType = searchParams.get('editType');

  try {
    const body = await req.json();

    if (editType === 'activate') {
      const linkId = body.id;
      const response = await fetch(`${apiUrl}/links/edit/activate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: linkId }),
      });

      if (!response.ok) {
        throw new Error('Failed to activate link');
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const updatedLink: Link = body;
      const response = await fetch(`${apiUrl}/links/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLink),
      });

      if (!response.ok) {
        throw new Error('Failed to update link');
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update link', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE request handler
export async function DELETE(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;
  const { searchParams } = new URL(req.url);
  const linkId = searchParams.get('id');

  if (!linkId) {
    return NextResponse.json({ message: 'Link ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/links/delete/${linkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete link');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete link', error: (error as Error).message },
      { status: 500 }
    );
  }
}
