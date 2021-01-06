import express from 'express';
import { errorHandler, notFound } from './middleware/error';
import productsRouter from './routers/products';
import { connectDB } from './config';
// Create the express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('API Running');
});

// Product Routers
app.use('/api/products', productsRouter);

// Error Handler
app.use(notFound).use(errorHandler);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT);
  console.log(`App listening on port ${PORT}...`.cyan.underline);
});
