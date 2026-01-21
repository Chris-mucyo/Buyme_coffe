import Router from 'express';
const route = Router();
import userRouter from './user.routes.js';

route.use('/users', userRouter);


export default route;

