import axios from 'axios';
import  { pool } from './db';
import { PlayerData } from './models/playerModel';

const fetchAndInsertPlayersFrom2023 = async () => {
    console.log('Starting to fetch and insert players from the 2023 season');
    let client;
    try {
        console.log(`Fetching players from the 2023 season`);
        const response = await axios.get<PlayerData[]>('http://rest.nbaapi.com/api/PlayerDataAdvanced/query', {
            params: {
                season: '2023', // Add this line to filter by the 2023 season
                sortBy: 'playerName',
                ascending: 'true',
                pageSize: '900', // You can adjust the pageSize as needed
            }
        });

        console.log('Response:', response.data);

        const players: PlayerData[] = response.data || [];
        console.log(`Number of players fetched: ${players.length}`);
        if (!Array.isArray(players)) {
            console.error('Players is not an array:', players);
            return;
        }

        if (players.length === 0) {
            console.log('No players to fetch');
            return;
        }

        client = await pool.connect(); // Acquire a client from the pool

        for (const player of players) {
            const {
                id,
                playerName: playername,
                position,
                age,
                per,
                box,
                team,
            } = player;

            try {
                console.log('Values to insert:', [id, playername, position, age, per, box, team]);

                console.log(`Preparing to insert player: ${playername} with ID: ${id}`);
                await client.query(
                    `INSERT INTO players (
                        id, playername, position, age, per, box, team
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [id, playername, position, age, per, box, team]
                );

                console.log('Inserted player:', playername);
            } catch (insertError) {
                console.error('Error inserting player:', insertError);
            }
        }

    } catch (error) {
        console.error('Error fetching player data:', error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
        }
        await pool.end(); // Ensure to await the end of the pool
    }
};

fetchAndInsertPlayersFrom2023();