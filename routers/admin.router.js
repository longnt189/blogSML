const express = require('express');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/users/user.model');
const Post = require('../models/blog/blog.model');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.flash_messages = req.session.flash;
    delete req.session.flash;
    next();
});

router.use(['/login', 'register'] ,(req, res, next) => {
    if (req.session) return res.redirect('/admin');

    res.redirect('/admin/login');
})

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
            if (bcrypt.compareSync(password, user.password)) {
                console.log(req.session);
                req.flash('success', 'Login successfully!');
                res.redirect('/admin');
            } else {
                console.log('Sai mat khau');
                req.flash('danger', 'Sai mật khẩu');
                res.redirect('/admin/login');
            }
        } else {
            console.log('Khong tim thay username');
        }
    })
});

router.post('/post/add',[
    check('title').trim().not().isEmpty().withMessage('Title bắt buộc phải nhập'),
    check('content').trim().not().isEmpty().withMessage('Nội dung bắt buộc phải nhập'),
    check('author').trim().not().isEmpty().withMessage('Tác giả bắt buộc nhập')
], (req, res) => {
    const {
        title,
        description,
        content,
        author,
        category
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('admin/add', {
            title, description, content, author
        })
    }

    const post = new Post({
        title,
        description,
        content,
        author,
        category
    });

    post.save(err => {
        if (err) return next(err);

        return res.redirect('/admin/manage');
    });
});

module.exports = router;