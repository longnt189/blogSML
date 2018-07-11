const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('client/index', {
        img: 'home',
    });
});

router.get('/about', (req, res) => {
    res.render('client/about', {
        img: 'about',
    });
});

router.get('/contact', (req, res) => {
    res.render('client/contact', {
        img: 'contact',
    });
});

router.get('/post', (req, res) => {
    res.render('client/post', {
        img: 'post',
    });
});

module.exports = router;