const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const AppError = require(`${__dirname}/error/AppError`);
const errorsController = require(`./controllers/errorsController`);
const cors = require("cors");
const { startBookingJobs } = require("./jobs/booking.job");

const app = express();

app.use(express.json());
app.use(cors());
app.set("query parser", "extended");

dotenv.config({ path: `./config.env` });

startBookingJobs();


const adminRouter = require(`./routers/adminRouter`);
const authRouter = require(`./routers/authRouter`)
const bookingsRouter = require(`./routers/bookingsRouter`)
const categoriesRouter = require(`./routers/categoriesRouter`)
const citiesRouter = require(`./routers/citiesRouter`)
const facilitiesRouter = require(`./routers/facilitiesRouter`)
const farmsRouter = require('./routers/farmsRouter');
const notificationsRouter = require(`./routers/notificationsRouter`);
const ownersRouter = require(`./routers/ownersRouter`);
const reviewsRouter = require(`./routers/reviewsRouter`)
const settingsRouter = require(`./routers/settingsRouter`)
const usersRouter = require('./routers/usersRouter');

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/farms', farmsRouter);
app.use('/api/v1/bookings', bookingsRouter);
app.use('/api/v1/facilities', facilitiesRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/cities', citiesRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/settings', settingsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notifications', notificationsRouter);
app.use('/api/v1/owners', ownersRouter);
app.use('/api/v1/admin', adminRouter);



app.use((req, res, next) => {
  next(new AppError(`This url ${req.originalUrl} is not found.`, 404));
});

app.use(errorsController);

const runApp = function () {
  app.listen(3000, () => console.log(`Example app listening on port 3000!`));
}

connectDB(runApp);