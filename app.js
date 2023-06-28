const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://localhost:27017/mestodb ', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to mestodb');
  });

const app = express();

app.use(bodyParser.json());

app.use(helmet());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6488a1b83f08623d31e2fe83',
//   };

//   next();
// });

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
