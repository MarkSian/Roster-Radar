//imports 
import express from 'express';
import cors from 'cors';
import playerRoutes from './routes/playerRoutes';

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());

//use player routes
app.use(playerRoutes);

//start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
