import { Request, Response } from 'express';
import Distribute from '../models/distribute.model';

export const getTodaysDistributions = async (req: Request, res: Response) => {
    try {
        const distributeData = await Distribute.find({ date: new Date() });
        res.status(200).json({ data: distributeData });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const distribute = async (req: Request, res: Response) => {
    try {
        const already = await Distribute.findOne({
            studentId: req.body.studentId,
            date: { $gte: new Date(req.body.date) },
            shift: req.body.shift,
        });
        if (!already) {
            const distributeData = new Distribute(req.body);
            await distributeData.save();
            res.status(200).json({ data: distributeData });
        } else {
            res.status(200).json({ error: 'Already served!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
