const express = require('express');
const User = require('../models/users/user.model');
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

router.post('/register', (req, res) => {
    const { 
        username,
        email,
        password
     } = req.body;

    const cUser = new User({
        username,
        email,
        password,
    });

    cUser.save((err, user) => {
        if (err) {
            console.log('>>> error register', err);
            return;
        }

        console.log('>>> User:', user);
        res.redirect('/admin');
    });
});

router.post('/login', (req, res) => {
    const {
        username,
        password,
    } = req.body;

    User.findOne({
        username: username,
    }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }

        if (user) {
            if (user.password === password) {
                res.redirect('/admin');
            } else {
                console.log('Sai mat khau');
            }
        } else {
            console.log('Khong tim thay username');
        }
    })
})

module.exports = router;