"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Use default import
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db"); // Import the pool object
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Use an environment variable for the port
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use auth routes with a prefix (e.g., /api)
app.use('/api', authRoutes_1.default); // This sets up the routes under the /api prefix
app.get('/api/players', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.pool.query('SELECT * FROM players'); // Adjust the query based on your table structure
        res.status(200).json(result.rows); // Send the rows back as a JSON response
    }
    catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Define a root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
