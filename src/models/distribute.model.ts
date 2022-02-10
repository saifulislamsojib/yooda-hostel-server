import { model, Schema } from 'mongoose';
import IDistribute from '../types/IDistribute';

const distributeModel = new Schema(
    {
        studentId: {
            type: String,
            required: [true, 'Student Id is required'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        shift: {
            type: String,
            required: [true, 'Shift is required'],
        },
        status: {
            type: String,
            default: 'served',
        },
        foodItemList: {
            type: [String],
            required: [true, 'Food Item List is required'],
            minlength: [1, 'Minimum number of food items is 1'],
        },
    },
    {
        timestamps: true,
    },
);

const Distribute = model<IDistribute>('Distribute', distributeModel);

export default Distribute;
