import mongoose, { Document, Schema, Model } from 'mongoose';

interface ISizes extends Document {
    size: number;
    stock: number;
}

interface IProduct extends Document {
    brand_id: Schema.Types.ObjectId;
    name: string;
    price: number;
    description: string;
    sizes: ISizes[];
}

const SizesSchema = new Schema<ISizes>(
    {
        size: { type: Number, required: true },
        stock: { type: Number, required: true }
    },
    { _id: false }
);

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        sizes: { type: [SizesSchema], required: true },
        brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true }
    },
    { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;
