const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());

app.use(express.json());

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Database connected'));

//Import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/user/posts', postsRoute);

app.listen(8888, console.log('Server on in port: 8888'));