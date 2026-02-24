const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000
const mysql = require('mysql2/promise');
app.use(bodyParser.json());

let users = []
let counter = 1;

let conn = null
const initDBconnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    });
}

app.get('/users', async (req, res) => {
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0]);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?', user)
    console.log('results', results);
    res.json({
        message: 'User data inserted successfully',
        data: results[0]

    });
}
)

app.listen(port, async () => {
    await initDBconnection();
    console.log(`Server is running on port ${port}`)
});


