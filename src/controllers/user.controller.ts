import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user';

// Obtener usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.find();
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            res.status(StatusCodes.OK).json(user);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Crear un usuario
export const createUser = async (req: Request, res: Response) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        direction: req.body.direction,
        phone: req.body.phone
    });
    try {
        const newUser = await user.save();
        res.status(StatusCodes.CREATED).json({ message: 'User added successfully', newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (updatedUser) {
            res.status(StatusCodes.OK).json({ message: 'User updated successfully', updatedUser });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(StatusCodes.OK).json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};