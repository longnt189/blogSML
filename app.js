const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routers');
const { port } = require('./config/config');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(mainRouter);

app.listen(port, (err) => {
    if (err) {
        console.log('>>> error: ', err);
        return;
    }

    console.log('Server running on port ', port);
});