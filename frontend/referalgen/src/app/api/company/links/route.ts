import { NextResponse } from 'next/server';
import {Link} from '../../../types/types'

export async function GET(req: Request) {
    const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;
    const url = new URL(req.url);
    const company = url.searchParams.get('company')
    const product = url.searchParams.get('product')

  
    try {
      const response = await fetch(`${apiUrl}/company/links/${company}-${product}`, {
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
        { message: 'Failed to get companies for search', error: (error as Error).message },
        { status: 500 }
      );
    }
  }
