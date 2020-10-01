const router = require('express').Router();

router.use('/heroes', require('./heroes'));

module.exports = router;
