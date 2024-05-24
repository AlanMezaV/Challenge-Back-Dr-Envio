import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    direction: string;
    phone: string;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        direction: { type: String, required: true },
        phone: { type: String, required: true }
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
