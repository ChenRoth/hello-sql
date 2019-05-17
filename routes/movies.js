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

router.get('/:id', async (req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'cinemaville'
    });

    const { id } = req.params;
    const [results, fields] = await connection.execute(`SELECT * FROM Movies WHERE id = ${id}`);
    if (results.length) {
        res.send(results[0]);
    } else {
        res
            .status(404)
            .send(`movie ${id} doesn't exist`);
    }

});

module.exports = router;