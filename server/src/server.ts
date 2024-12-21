import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; // Use default import
import dotenv from 'dotenv';
import { pool } from './db'; // Import the pool object

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use an environment variable for the port

// Middleware
app.use(cors());
app.use(express.json());

// Use auth routes with a prefix (e.g., /api)
app.use('/api', authRoutes); // This sets up the routes under the /api prefix
app.get('/api/players', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM players'); // Adjust the query based on your table structure
        res.status(200).json(result.rows); // Send the rows back as a JSON response
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch top 10 players by PER
app.get('/api/top-players', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM players ORDER BY per DESC LIMIT 10');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching top players:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


// Define a root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});