const router = require('express').Router();

router.get('/', (req, res) => {
  res.send();
});

router.get('/:heroId', (req, res) => {
  res.send();
});

module.exports = router;
