import { Request, Response } from 'express';
import Student from '../models/student.model';

export const getStudents = async (
    req: Request<
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>,
        { count: string }
    >,
    res: Response,
) => {
    try {
        const { count } = req.query;
        const students = await Student.find({})
            .skip(+count || 0)
            .limit(10);
        res.status(200).json({ data: students });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getStudentByRoll = async (req: Request, res: Response) => {
    try {
        const student = await Student.findOne({ roll: req.params.roll });
        if (student) {
            res.status(200).json({ data: student });
        } else {
            res.status(200).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addStudent = async (req: Request, res: Response) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(200).json({ data: student });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: student, message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        await Student.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { ids, status } = req.body;
        await Student.updateMany({ _id: { $in: ids } }, { status });
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};
