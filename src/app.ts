import bodyParser from 'body-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import passport from './controllers/passport';
import session from 'express-session';
import specs from './configs/swaggerConfig';

import AppError from './utils/appError';
import globalErrorHandler from './utils/globalErrorHandler';

import adminRouter from './routes/admin.route';
import candidateRouter from './routes/candidate.route';
import enterpriseRouter from './routes/enterprise.route';
import authRouter from './routes/auth.route';
import postRouter from './routes/post.route';
import jobTitleRouter from './routes/jobTitle.route';

import morgan from 'morgan';
const app = express();

// 1) GLOBAL MIDDLEWARES

// Body parser, reading data from body into req.body
app.use(bodyParser.json());

// swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// set security HTTP headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log('Env currently running on: ' + process.env.NODE_ENV);

// limit the number of requests from the same IP
// in this case, 100 requests per hour
const timeWindow = 60 * 60 * 1000; // 1 hour
const maxRequest = 100;

const limiter = rateLimit({
  max: maxRequest,
  windowMs: timeWindow,
  message: 'Too many requests from this IP, please try again in an hour!'
});

// apply the limiter to all routes that start with /api
app.use('/api', limiter);

// middleware to parse the body of the request into json
// limit the size of the body to 10kb
app.use(express.json({ limit: '10kb' }));

// middleware to parse the urlencoded body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

const whitelist = [''];
// hpp - html param pollution will remove the duplicate parameter
app.use(
  hpp({
    whitelist: whitelist
  })
);

// enable CORS for all requests
var corsOptions = {
  origin: `http://localhost:3001`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// middleware to serve static files
app.use(express.static(`${__dirname}/public`));

// passport middleware
// session
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 2) ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/candidates', candidateRouter);
app.use('/api/v1/enterprises', enterpriseRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/job-titles', jobTitleRouter);

// 3) ERROR HANDLING
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
