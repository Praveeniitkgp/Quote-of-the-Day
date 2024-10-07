import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

// Route to serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html
});

// Route to get a random quote of the day
app.get('/quote-of-the-day', async (req, res) => {
  try {
    const response = await fetch('http://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote of the day');
    }
    const quote = await response.json();
    res.json(quote);
  } catch (error) {
    console.error("Error fetching quote of the day:", error);
    res.status(500).json({ message: "Error fetching quote of the day" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
