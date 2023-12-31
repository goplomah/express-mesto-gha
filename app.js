const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const routes = require('./routes/index');
const handlerCentralError = require('./middlewares/handlerCentralError');

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://localhost:27017/mestodb ', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to mestodb');
  });

const app = express();

app.use(express.json());

app.use(helmet());

app.use(routes);
app.use(errors());
app.use(handlerCentralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
