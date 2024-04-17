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

// Endpoint to add or update employees 
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file.');
            return;
        }
        const employees = JSON.parse(data);
        employees.push(newEmployee); // This should be modified to handle updates as well
        fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file.');
                return;
            }
            res.send('Employee added/updated.');
        });
    });
});