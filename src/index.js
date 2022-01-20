const express = require('express');
require('./db/mongoose');
const Accounts = require('./models/accounts');
const accountsRouter = require('./routers/accounts');

const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname, 'client/build');

app.use(express.json());
app.use(accountsRouter);
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
