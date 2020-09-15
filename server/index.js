const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const { PORT, MONGO_URI, MONGO_DB_NAME } = process.env;

const app = express();

app.use(bodyParser.json());

const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/file', require('./routes/api/file'));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
