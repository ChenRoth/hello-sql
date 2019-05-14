const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send(['space jam', 'pulp fiction', 'spider-man'])
});


module.exports = router;