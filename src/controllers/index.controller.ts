import { Request, Response } from 'express';

export const index = (req: Request, res: Response): void => {
    res.json({ message: 'Welcome to my sneaker challenge api' });
};
