import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Brand from '../models/brand';

// Crear nueva marca
export const createBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const newBrand = new Brand({ name });
        await newBrand.save();
        res.status(StatusCodes.CREATED).json(newBrand);
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener todas las marcas
export const getBrands = async (req: Request, res: Response): Promise<void> => {
    try {
        const brands = await Brand.find();
        res.status(StatusCodes.OK).json(brands);
    } catch (error) {
        console.error('Error getting brands:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener una marca por ID
export const getBrandById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);
        if (brand) {
            res.status(StatusCodes.OK).json(brand);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Brand not found' });
        }
    } catch (error) {
        console.error('Error getting brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Actualizar una marca por ID
export const updateBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const brand = await Brand.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );
        if (brand) {
            res.status(StatusCodes.OK).json(brand);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Brand not found' });
        }
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Eliminar una marca por ID
export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByIdAndDelete(id);
        if (brand) {
            res.status(StatusCodes.OK).json({ message: 'Brand deleted successfully', brand });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Brand not found' });
        }
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
