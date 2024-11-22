import { Router } from 'express';
import authRouter from '../routers/auth.router';
import userRouter from '../routers/user.router';
import boardRouter from '../routers/board.router';
import columnRouter from '../routers/column.router';
import taskRouter from '../routers/task.router';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/boards', boardRouter);
router.use("/columns", columnRouter);
router.use("/tasks", taskRouter);

export default router;
