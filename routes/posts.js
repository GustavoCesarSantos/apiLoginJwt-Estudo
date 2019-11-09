const router = require('express').Router();

const verify = require('../middleware/verifyToken');

router.get('/', verify, (req,res) => {
  res.json({ post: { title: 'First post', description: 'First text' } });
})

module.exports = router;