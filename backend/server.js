const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3003;
const DATA_FILE = './employeesData.json';

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get employees
app.get('/employees', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if(err) {
            res.status(500).send('Error reading data file.');
            return;
        }
        res.json(JSON.parse(data));
    });
});