import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Yooda Hostel Server Boss!');
});

export default router;
