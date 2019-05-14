const mysql = require('mysql2/promise');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'cinemaville'
    });

    const [results, fields] = await connection.execute(`SELECT * FROM Movies`);
    // line 13 is equivalent to this:
    // const arr = await connection.execute(`SELECT * FROM Movies`);
    // const results = arr[0];
    // const fields = arr[1];

    res.send(results);
});


module.exports = router;