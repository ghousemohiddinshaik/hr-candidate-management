const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mohi',       // your MySQL username
  password: '1234', // your MySQL password
  database: 'hr_db'
});

// CRUD Endpoints for candidates

// Get all candidates
app.get('/api/candidates', (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add new candidate
app.post('/api/candidates', (req, res) => {
  const { name, email, phone_number, current_status, resume_link } = req.body;
  db.query('INSERT INTO candidates (name, email, phone_number, current_status, resume_link) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone_number, current_status, resume_link],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// Update candidate
app.put('/api/candidates/:id', (req, res) => {
  const { name, email, phone_number, current_status, resume_link } = req.body;
  db.query(
    'UPDATE candidates SET name=?, email=?, phone_number=?, current_status=?, resume_link=? WHERE id=?',
    [name, email, phone_number, current_status, resume_link, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Delete candidate
app.delete('/api/candidates/:id', (req, res) => {
  db.query('DELETE FROM candidates WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
