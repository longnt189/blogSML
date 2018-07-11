const express = require('express');
const routerClient = require('./client.router');
const routerAdmin = require('./admin.router');
const router = express.Router();

router.use('/', routerClient);
router.use('/admin', routerAdmin);

module.exports = router;