import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '../models/product';

// Obtener productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find().populate('brand_id');
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('brand_id');
        if (product) {
            res.status(StatusCodes.OK).json(product);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener productos en stock
export const getProductsInStock = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.aggregate([
            {
                $match: { 'sizes.stock': { $gt: 0 } }
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    description: 1,
                    sizes: {
                        $filter: {
                            input: '$sizes',
                            as: 'size',
                            cond: { $gt: ['$$size.stock', 0] }
                        }
                    },
                    brand_id: 1
                }
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brand_id',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    description: 1,
                    sizes: 1,
                    brand: 1
                }
            }
        ]);

        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error',
            error
        });
    }
};

// Crear un producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const product = new Product({
        brand_id: req.body.brand_id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        sizes: req.body.sizes
    });
    try {
        const newProduct = await product.save();
        res.status(StatusCodes.CREATED).json({ message: 'Product added successfully', newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Actualizar un producto por ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (updatedProduct) {
            res.status(StatusCodes.OK).json({
                message: 'Product updated successfully',
                updatedProduct
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Eliminar un producto por ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.status(StatusCodes.OK).json({
                message: 'Product deleted successfully',
                deletedProduct
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};
