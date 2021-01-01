import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { connect } from 'mongoose';
import { errorHandler, notFound } from './middleware/error';
import { resolve } from 'path';
import productsRouter from './routers/products';
// Create the express application
const app = express();

dotenv.config();
colors.enable();

app.get('/', (_, res) => {
  res.send('API Running');
});

// Product Routers
app.use('/api/products', productsRouter);

// Error Handler
app.use(notFound).use(errorHandler);

// Declare the path to frontend's static assets
app.use(express.static(resolve('..', 'build')));

// Intercept requests to return the frontend's static entry point
app.get('*', (_, response) => {
  response.sendFile(resolve('..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
async function main() {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT);
    console.log(`App listening on port ${PORT}...`.cyan.underline);
  } catch (e) {
    console.error(`MongoDb Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
}

main();
