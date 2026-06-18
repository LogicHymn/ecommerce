const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();
const app =express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.json({message: 'Server is running'})
});

app.get('/test-db', async (req,res) => {
    try{
        const result = await pool.query('SELECT * FROM products LIMIT 3');
        res.json(result.rows);
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Databse connection failed'});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});