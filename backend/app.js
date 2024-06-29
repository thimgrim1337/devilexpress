import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import indexRouter from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/style')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
