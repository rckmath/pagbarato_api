import express, { Router, Request, Response } from 'express';
import Constants from '@configs/constants.config';
import { msToTime } from '@utils/conversionFunctions.util';

const router: Router = express.Router();

router.get('/api/status', async (_req: Request, res: Response) => {
  const actualHour = String(new Date().getHours()).padStart(2, '0');
  const actualMinutes = String(new Date().getMinutes()).padStart(2, '0');
  const actualSeconds = String(new Date().getSeconds()).padStart(2, '0');

  return res.json({
    env: Constants.env,
    serverTime: `${actualHour}:${actualMinutes}:${actualSeconds}`,
    uptime: msToTime(process.uptime()),
  });
});

export default router;
