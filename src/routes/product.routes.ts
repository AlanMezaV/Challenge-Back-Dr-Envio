import { Router } from 'express';
import {
    getProducts,
    getProductById,
    getProductsInStock,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller';

const router = Router();

router.get('/products/get-all', getProducts);
router.get('/products/:id', getProductById);
router.get('/products', getProductsInStock);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
