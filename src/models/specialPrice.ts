import mongoose, { Document, Schema, Model } from 'mongoose';

interface ISpecialPrice extends Document {
    product_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    discount: number;
}

const specialPriceSchema = new Schema<ISpecialPrice>(
    {
        product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        discount: { type: Number, required: true }
    },
    { timestamps: true }
);

const SpecialPrice: Model<ISpecialPrice> = mongoose.model<ISpecialPrice>(
    'SpecialPrice',
    specialPriceSchema
);

export default SpecialPrice;
