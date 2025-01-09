import {Report} from '../../types/types';

const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_API_URL;


export const getReports = async (): Promise<Report[]> => {

 const response = await fetch(`${apiUrl}/api/reports`);
  return await response.json();
};

export const sendReport = async (report: Report): Promise<void> => {
    const response = await fetch(`${apiUrl}/reports/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  });
}