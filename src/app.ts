import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db';
import indexRoutes from './routes/index.routes';
import brandsRoutes from './routes/brand.routes';
import productsRoutes from './routes/product.routes';
import usersRoutes from './routes/user.routes';
import specialPriceRoutes from './routes/specialPrice.routes';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/', indexRoutes);
app.use('/', brandsRoutes);
app.use('/', productsRoutes);
app.use('/', usersRoutes);
app.use('/', specialPriceRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default app;
