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

  export async function POST(req: Request) {
    const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;
  
    try {
      // Parse the request body for the new company details
      const newCompany: Company = await req.json();
  
      // Make the POST request to the API
      const response = await fetch(`${apiUrl}/company/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompany),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add the company');
      }
  
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to add company', error: (error as Error).message },
        { status: 500 }
      );
    }
  }
