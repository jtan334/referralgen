import { NextResponse } from 'next/server';
import{Company} from '../../types/types'

export async function GET(req: Request) {
    const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;
   

  
    try {
      const response = await fetch(`${apiUrl}/company`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
  
      const data: Company[] = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to get companies for search', error: (error as Error).message },
        { status: 500 }
      );
    }
  }
