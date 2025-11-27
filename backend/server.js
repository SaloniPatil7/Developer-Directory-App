// server.js - simple express backend storing data in a JSON file
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data', 'developers.json');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Ensure data directory + file exist
function ensureDb() {
  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));
}
ensureDb();

function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE);
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading DB', e);
    return [];
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET /developers
app.get('/developers', (req, res) => {
  const list = readDb();
  // optional query filters
  const { role, tech } = req.query;
  let filtered = list;
  if (role) {
    filtered = filtered.filter(d => d.role.toLowerCase() === role.toLowerCase());
  }
  if (tech) {
    const q = tech.toLowerCase();
    filtered = filtered.filter(d => d.techStack.join(',').toLowerCase().includes(q));
  }
  res.json(filtered);
});

// POST /developers
app.post('/developers', (req, res) => {
  const { name, role, techStack, experience } = req.body;  // <-- FIXED

  // Basic validation
  if (!name || !role || !techStack) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const expNum = Number(experience);
  if (Number.isNaN(expNum) || expNum < 0) {
    return res.status(400).json({ error: 'Experience must be a non-negative number.' });
  }

  const techArray = Array.isArray(techStack)
    ? techStack
    : String(techStack).split(',').map(t => t.trim()).filter(Boolean);

  const db = readDb();
  const newDev = {
    id: Date.now().toString(),
    name: String(name).trim(),
    role,
    techStack: techArray,
    experience: expNum,
    createdAt: new Date().toISOString()
  };
  db.unshift(newDev); // put newest on top
  writeDb(db);
console.log("DB updated. Total developers:", db.length);
  res.status(201).json({ message: 'Developer added', developer: newDev });
});

// Simple health check
app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
