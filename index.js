const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

app.get('/test', (req, res) => {
    connection.connect((error) => {
        if (error) {
            res.send(error.message);
        }

        res.send({data: 'Connected to the MySQl server. 🔥'});
    });
});

app.get('/select-calendar', async (req, res) => {
    connection.query(`SELECT * FROM calendar`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
        }
        res.send(results);
    });
});

app.post('/select-events', async (req, res) => {
    const request = req.body;

    connection.query(`SELECT * FROM calendar_event WHERE calendar_id = ?`, [request.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
        }
        res.send(results);
    });
});

app.post('/insert-calendar', async (req, res) => {
    const request = req.body;

    connection.query(`INSERT INTO calendar (name) VALUES (?)`, [request.name], (error, results, fields) => {
        if (error) {
            res.send(error.message);
        }
        res.send({data: "new calendar added"});
    });
});

app.post('/insert-event', async (req, res) => {
    const request = req.body;

    connection.query(`
        INSERT INTO calendar_event (calendar_id, title, description, date_time)
        VALUES (?, ?, ?, ?)`,
        [
            request.calendar_id,
            request.title,
            request.description,
            request.date_time
        ],
        (error, results, fields) => {
        if (error) {
            res.send(error.message);
        }
        res.send({data: "new calendar event added"});
    });
});

app.post('/edit-event', async (req, res) => {
    const request = req.body;

    const query = "UPDATE calendar_event SET `title` = ?, `description` = ?, `date_time` = ? WHERE id = ?)"

    connection.query(query, [request.title, request.description, request.date_time, request.id],
        (error, results, fields) => {
            if (error) {
                res.send(error.message);
            }
            res.send({data: "calendar event edited"});
        });
});


app.post('/delete-event', async (req, res) => {
    const request = req.body;

    connection.query(`DELETE FROM calendar_event WHERE id = ?`, [request.id], (error, results, fields) => {
            if (error) {
                res.send(error.message);
            }
            res.send({data: "calendar event deleted"});
        });
});

app.listen(8888, () => console.log('alive on http://localhost:8888'));
