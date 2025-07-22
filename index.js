import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import apiRouter from './routes/api.js';
import morgan from 'morgan';
import uploadFileRouter from './routes/uploadFile.js';
import multer from 'multer';
import ProviderRouter from './routes/provider.js';
import ProjectRouter from './routes/project.js';
import clientRouter from './routes/client.js';
import logRouter from './routes/log.js';
import BillsRouter from './routes/bills.js';
import BudgetsRouter from './routes/budgets.js';
import AccountPayableRouter from './routes/accountsPayable.js';
import ServiceRouter from './routes/service.js';
import StatusRouter from './routes/status.js';
import PaidFromRouter from './routes/paidFrom.js';
import CategoryRouter from './routes/category.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use("/files", express.static("files"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});
app.use(morgan('dev'));

app.use(express.json({ limit: '10mb' }));
// app.use('/dashboard',dashboardRouter)
app.use('/client', clientRouter);
app.use('/project', ProjectRouter);
app.use('/provider', ProviderRouter);
app.use('/bills', BillsRouter);
app.use('/budgets', BudgetsRouter);
app.use('/account_payable', AccountPayableRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/api/logs', logRouter);
app.use('/service',ServiceRouter)
app.use('/status',StatusRouter)
app.use('/paid_from',PaidFromRouter)
app.use('/category',CategoryRouter)

app.use('/upload-file',uploadFileRouter)




app.get('/live', (req, res) => res.json({ message: 'Message from server' }));

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    console.log('Mongo DB conn. string...', process.env.MONGO_CONNECT);
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_CONNECT).then(() => console.log("db connected"));
    app
      .listen(port, () => console.log(`Server is listening on port: ${port}`))
      .on('error', (e) => {
        console.log('Error happened check: ', e.message);
      });
  } catch (error) {
    console.log(error);
  }
};


startServer();
