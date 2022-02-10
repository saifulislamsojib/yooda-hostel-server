import { model, Schema } from 'mongoose';
import IFood from '../types/IFood';

const foodModel = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        price: {
            type: String,
            required: [true, 'Price is required'],
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

const Food = model<IFood>('Food', foodModel);

export default Food;
