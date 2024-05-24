import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import SpecialPrice from '../models/specialPrice';
import User from '../models/user';
import Product from '../models/product';

// Obtener ofertas
export const getSpecialPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const offers = await SpecialPrice.find().populate('product_id').populate('user_id');
        res.status(StatusCodes.OK).json(offers);
    } catch (error) {
        console.error('Error getting offers:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener una oferta por ID
export const getSpecialPriceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const offer = await SpecialPrice.findById(id).populate('product_id').populate('user_id');
        if (offer) {
            res.status(StatusCodes.OK).json(offer);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Offer not found' });
        }
    } catch (error) {
        console.error('Error getting offer:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener precio especial por usuario
export const getSpecialPriceByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, product_name } = req.params;

        const user = await User.findById(user_id);
        const product = await Product.findOne({ name: product_name });

        if (!user || !product) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User or Product not found' });
            return;
        }

        const specialPrice = await SpecialPrice.findOne({
            user_id,
            product_id: product._id
        });

        if (specialPrice) {
            const priceWithDiscount = product.price - product.price * specialPrice.discount;
            res.status(StatusCodes.OK).json({ price: priceWithDiscount });
        } else {
            res.status(StatusCodes.OK).json({ price: product.price });
        }
    } catch (error) {
        console.error('Error getting Special Price:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Crear una oferta
export const createSpecialPrice = async (req: Request, res: Response): Promise<void> => {
    try {
        const specialPrice = new SpecialPrice({
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            discount: req.body.discount
        });
        await specialPrice.save();
        res.status(StatusCodes.CREATED).json({
            message: 'Special Price added successfully',
            specialPrice
        });
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Actualizar una oferta por ID
export const updateSpecialPrice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedSpecialPrice = await SpecialPrice.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (updatedSpecialPrice) {
            res.status(StatusCodes.OK).json({
                message: 'Special Price updated successfully',
                updatedSpecialPrice
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Special Price not found' });
        }
    } catch (error) {
        console.error('Error updating offer:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Eliminar una oferta por ID
export const deleteSpecialPrice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedSpecialPrice = await SpecialPrice.findByIdAndDelete(id);
        if (deletedSpecialPrice) {
            res.status(StatusCodes.OK).json({
                message: 'Special Price deleted successfully',
                deletedSpecialPrice
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Special Price not found' });
        }
    } catch (error) {
        console.error('Error deleting offer:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
