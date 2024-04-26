const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { error } = require('console');

const app = express();
const PORT = 3003;
const DATA_FILE = './employeesData.json';

// this tells the backend what ports are allowed to fetch data from the json file
app.use(cors({
    origin: 'http://localhost:3005',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(bodyParser.json());

// Endpoint to get employees
app.get('/employees', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if(err) {
            res.status(500).send('Error reading data file.');
            return;
        }
        try {
            const employees = JSON.parse(data);
            res.json(employees);
        } catch (parseError) {
            res.status(500).json({error: 'Error parsing JSON data.'});
        }
    });
});

//Manual Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3005");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Endpoint to add or update employees
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file.');
            return;
        }
        try {
            let employees = JSON.parse(data);

            // Create a new employee object with the information provided
            const newEmployee = {
                id: employees.length + 1,
                ...req.body
            };

            employees.push(newEmployee); // This should be modified to handle updates as well
            fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing to data file.');
                    return;
                }
                res.send('Employee added/updated.');

        });

    } catch (parseError) {
        res.status(500).send('Error parsing data file.');
    }
});

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
