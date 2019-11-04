const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Database connected'));

//Import routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, console.log('Server on in port: 3000'));