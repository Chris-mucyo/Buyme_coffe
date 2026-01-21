import express from 'express';
import cors from 'cors';
import route from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', route);
export default app;