import { NextResponse } from 'next/server';
import { Report } from '../../types/types';

const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

export async function GET(request: Request) {
  try {
    const response = await fetch(`${apiUrl}/reports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch reports' },
        { status: response.status }
      );
    }

    const reports: Report[] = await response.json();
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const report: Report = await request.json();

    const response = await fetch(`${apiUrl}/reports/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(
        { error: 'Failed to add report', details: errorResponse },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: (error as Error).message },
      { status: 500 }
    );
  }
}