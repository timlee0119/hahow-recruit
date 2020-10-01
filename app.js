const express = require('express');
const app = express();

app.use(require('morgan')('dev'));

app.use(require('./routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
