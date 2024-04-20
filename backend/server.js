const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = './employeesData.json';

app.use(cors({
    origin: 'http://localhost:3001'
}));
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

app.delete('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);

    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file.');
        }

        // Remove the employee
        employees.splice(index, 1);

        // Write the updated array back to the file 
        fs.writeFile(DATA_FILE, JSON.stringify(employees, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file.');
                return;
            }
            res.status(204).send(); // no content to send back 
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});