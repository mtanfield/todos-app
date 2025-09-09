import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mountRoutes from './routes/index.js';

dotenv.config({ path: '../.env' });

const port = process.env.PORT || 3001;
const API_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'Authorization');
  res.header('Content-Type: application/json');

  next();
});

mountRoutes(app);

app.listen(port, () => console.log(`Server listening at ${API_URL}, port ${port}`));
