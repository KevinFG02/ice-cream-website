import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

}).promise();

const app = express();

// Port
const PORT = 3001;

const orders = [];

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //res.send('Pizza Time!');
    //res.sendFile(`${import.meta.dirname}/views/home.html`)

    res.render('home');
});

app.get('/db-test', async(req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders');
        res.send(orders)
    } catch(err){
        console.error("Database error: ", err);
        res.status(500).send('Database error: ' + err.message);
    }
})

app.get('/confirm-order', (req, res) => {
    res.render('confirm');
})

app.post('/submit-order', (req, res) => {
    const order = req.body;

    order['timestamp'] = new Date();

    orders.push(order);
    console.log(orders);

    res.render('confirm', { order });
})

app.get('/admin', async(req, res) =>{
    try {
        const orders = await pool.query('SELECT * FROM orders');
        res.send([orders]);
        res.render('admin', orders);
    } catch(err){
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)

        console.error("Database error: ", err);
        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }  
    
    //res.render('admin', {orders});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});