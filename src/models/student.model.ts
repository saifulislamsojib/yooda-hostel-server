import { model, Schema } from 'mongoose';
import IStudent from '../types/IStudent';

const studentModel = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'FullName is required'],
            trim: true,
        },
        roll: {
            type: String,
            required: [true, 'Roll is required'],
            trim: true,
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
            trim: true,
        },
        class: {
            type: String,
            required: [true, 'Class is required'],
            trim: true,
        },
        hall: {
            type: String,
            required: [true, 'Hall is required'],
            trim: true,
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            enum: ['active', 'inActive'],
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

const Student = model<IStudent>('Student', studentModel);

export default Student;
