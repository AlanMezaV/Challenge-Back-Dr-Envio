import { Router } from 'express';
import { createBrand, getBrands, updateBrand, deleteBrand } from '../controllers/brand.controller';

const router = Router();

router.get('/brands', getBrands);
router.post('/brands', createBrand);
router.put('/brands/:id', updateBrand);
router.delete('/brands/:id', deleteBrand);

export default router;
