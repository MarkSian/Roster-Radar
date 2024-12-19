//imports 

import { NextFunction, Router, Request, Response } from 'express';
import { getPlayerData } from '../controllers/playerController';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();


// define route for getting player data
router.get('/api/playerAdvanced/name/:playerName', getPlayerData);


export default router;