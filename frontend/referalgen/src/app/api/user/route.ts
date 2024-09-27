import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  switch (req.method) {
    // GET: Retrieve user links by user ID
    case 'GET':
      try {
        
        const userId = req.query.userId as string;
        
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
        }

        const response = await fetch(`${apiUrl}/users/links/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch links: ${response.statusText}`);
        }

        const links: Link[] = await response.json();
        res.status(200).json(links);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user links', error: (error as Error).message });
      }
      break;

    // POST: Create a new user
    case 'POST':
      try {
        const newUser: User = req.body;

        if (!newUser.UID || !newUser.name) {
          return res.status(400).json({ message: 'User UID and name are required' });
        }

        const response = await fetch(`${apiUrl}/users/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          throw new Error(`Failed to create user: ${response.statusText}`);
        }

        const createdUser = await response.json();
        res.status(201).json(createdUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: (error as Error).message });
      }
      break;

    // DELETE: Delete a user by user ID
    case 'DELETE':
      try {
        const userId = req.query.userId as string;
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
        }

        const response = await fetch(`${apiUrl}/users/delete/${userId}`, {
          method: 'POST', // As per your backend's DELETE method
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete user: ${response.statusText}`);
        }

        const result = await response.json();
        res.status(200).json({ message: `User ${userId} deleted`, result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
