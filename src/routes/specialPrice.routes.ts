import { Router } from 'express';
import {
    getSpecialPrices,
    getSpecialPriceById,
    getSpecialPriceByUser,
    createSpecialPrice,
    updateSpecialPrice,
    deleteSpecialPrice
} from '../controllers/specialPrice.controller';

const router = Router();

router.get('/special-price', getSpecialPrices);
router.get('/special-price/:id', getSpecialPriceById);
router.get('/price/:user_id/:product_name', getSpecialPriceByUser);
router.post('/special-price', createSpecialPrice);
router.put('/special-price/:id', updateSpecialPrice);
router.delete('/special-price/:id', deleteSpecialPrice);

export default router;
