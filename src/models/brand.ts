import mongoose, { Document, Schema, Model } from 'mongoose';

interface IBrand extends Document {
    name: string;
}

const brandSchema: Schema<IBrand> = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Brand: Model<IBrand> = mongoose.model<IBrand>('Brand', brandSchema);

export default Brand;
