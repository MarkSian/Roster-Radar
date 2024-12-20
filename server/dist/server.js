"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports 
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Use an environment variable for the port
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use auth routes with a prefix (e.g., /api)
app.use('/api', authRoutes_1.default); // This adds a prefix to your routes
// start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
