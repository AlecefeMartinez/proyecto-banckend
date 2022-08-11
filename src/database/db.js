const mongoose = require('mongoose')

console.log('Connecting to MongoDB...')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err))
