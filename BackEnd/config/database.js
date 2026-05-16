const mongoose = require('mongoose');

const connectDB = (runApp) => {
  const db = process.env.DATABASE.replace(
    `<PASSWORD>`,
    process.env.DATABASE_PASSWORD
  );

  mongoose.connect(db)
    .then(() => {
      console.log('DB connection successful');
      if (runApp) runApp();
    })
    .catch((err) => {
      console.error('Connection error:', err);
    });
};

module.exports = connectDB;