import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const creds = require('../../webnext-388317-a94d4d8e4e94.json'); // replace with your path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Authenticate with Google Sheets API
      const client = new google.auth.JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      await client.authorize();

      const sheets = google.sheets({ version: 'v4', auth: client });
      
      const spreadsheetId = '1Ql3bTvFLXkzRTHTVCcRoIQE0VVsO7HIjEjx7iegQN2E'; // replace with your Google Sheets ID

      const range = 'Sheet1!A:B'; // Adjust depending on your sheet structure

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values || [];

      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}
