import { Request, Response } from 'express';
import Food from '../models/food.model';

export const getFoods = async (
    req: Request<
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>,
        { count: string; limit: string }
    >,
    res: Response,
) => {
    try {
        const { count, limit } = req.query;
        const foods = await Food.find({})
            .skip(count ? +count : 0)
            .limit(limit ? +limit : 0);
        res.status(200).json({ data: foods });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addFood = async (req: Request, res: Response) => {
    try {
        const food = new Food(req.body);
        await food.save();
        res.status(200).json({ data: food });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateFood = async (req: Request, res: Response) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: food, message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteFood = async (req: Request, res: Response) => {
    try {
        await Food.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};
