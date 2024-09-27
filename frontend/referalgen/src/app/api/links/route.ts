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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;

  switch (req.method) {
    case 'GET':
      try {
        const userId = req.query.userId as string;
        const response = await fetch(`${apiUrl}/users/links/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user links');
        const data: Link[] = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user links', error: error });
      }
      break;

    case 'POST':
      try {
        const newLink: Link = req.body;
        const response = await fetch(`${apiUrl}/links/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLink),
        });

        if (!response.ok) throw new Error('Failed to create link');
        const data = await response.json();
        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create link', error: error  });
      }
      break;

    case 'PUT':
      const editType = req.query.editType;

      if (editType === 'activate') {
        // PUT for links/edit/activate
        try {
          const linkId = req.body.id;  // Assuming the request body contains the link id to activate
          const response = await fetch(`${apiUrl}/links/edit/activate`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: linkId }),
          });

          if (!response.ok) throw new Error('Failed to activate link');
          const data = await response.json();
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ message: 'Failed to activate link', error:  error});
        }

      } else {
        // PUT for links/edit
        try {
          const updatedLink: Link = req.body;
          const response = await fetch(`${apiUrl}/links/edit`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLink),
          });

          if (!response.ok) throw new Error('Failed to update link');
          const data = await response.json();
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ message: 'Failed to update link', error:  error});
        }
      }
      break;

    case 'DELETE':
      try {
        const linkId = req.query.id as string;
        const response = await fetch(`${apiUrl}/links/delete/${linkId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to delete link');
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete link', error: error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
