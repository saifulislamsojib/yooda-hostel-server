import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import { Request, Response } from 'express';
import Distribute from '../models/distribute.model';
import Student from '../models/student.model';

export const getTodaysDistributions = async (req: Request, res: Response) => {
    try {
        const distributeData = await Distribute.find({
            date: { $gte: startOfDay(new Date()), $lte: endOfDay(new Date()) },
        });
        res.status(200).json({ data: distributeData });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const distribute = async (req: Request, res: Response) => {
    try {
        const { studentId, date, shift } = req.body;
        const isStudent = await Student.findOne({ roll: studentId });
        if (isStudent) {
            const already = await Distribute.findOne({
                studentId,
                shift,
                date: { $gte: startOfDay(new Date(date)), $lte: endOfDay(new Date(date)) },
            });
            if (!already) {
                const distributeData = new Distribute(req.body);
                await distributeData.save();
                res.status(200).json({ data: distributeData });
            } else {
                res.status(200).json({ error: 'Already served!' });
            }
        } else {
            res.status(200).json({ error: 'No Student Found By The Roll!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
