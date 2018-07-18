const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRouter = require('./routers');
const { port } = require('./config/config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blog-sml', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    console.log('>>> error database', err);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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