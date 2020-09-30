const router = require('express').Router();

router.use('/heros', require('./heros'));

module.exports = router;
