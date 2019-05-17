const mysql = require('mysql2/promise');
const express = require('express');
const router = express.Router();

let pool;
(async function initializePool() {
    pool = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'cinemaville',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
})();


router.get('/', async (req, res) => {
    const [results, fields] = await pool.execute(`SELECT * FROM Movies`);
    // line 13 is equivalent to this:
    // const arr = await connection.execute(`SELECT * FROM Movies`);
    // const results = arr[0];
    // const fields = arr[1];

    res.send(results);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results, fields] = await pool.execute(`SELECT * FROM Movies WHERE id = ${id}`);

        if (results.length) {
            res.send(results[0]);
        } else {
            res
                .status(404)
                .send(`movie ${id} doesn't exist`);
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong! :(');
    }
});

module.exports = router;