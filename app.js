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

app.post('/submit-order', async(req, res) => {
    
    try {
        const order = req.body;
        order.timestamp = new Date();

        console.log(order);

        // Convert toppings array to a comma-delimited string
        order.toppings = Array.isArray(order.toppings) ?
            order.toppings.join(", ") : "";

        // Define an SQL query to INSERT new order
        const sql = `INSERT INTO orders (name, email, flavor, cone, toppings, comment) 
            VALUES(?, ?, ?, ?, ?, ?)`;

        // Create an array of parameters from order data
        const params = [
            order.name,
            order.email,
            order.flavor,
            order.cone,
            order.toppings,
            order.comment
        ];

        // Execute the query
        const [result] = await pool.execute(sql, params);

        // Get the id from the newly inserted row
        order.id = result.insertId;
        console.log("A new row was inserted with ID " + order.id);

        // Display the confirmation page
        res.render('confirm', {order});
    } catch (err) {
        console.error('Error saving orders: ', err);
        res.status(500).send('Sorry, there was an error processing your order. Please try again.')
    }
})

app.get('/admin', async(req, res) =>{
    try {
        const [orders] = await pool.query(`SELECT * FROM orders ORDER BY timestamp DESC`);
        console.log(orders);
        res.render('admin', { orders });

    } catch (err){
        console.error('Database error: ', err);
        res.status(500).send('Database error occurred.' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});