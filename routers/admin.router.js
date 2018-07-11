const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/add', (req, res) => {
    res.render('admin/add');
});

router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.get('/manage', (req, res) => {
    res.render('admin/manage');
});

module.exports = router;