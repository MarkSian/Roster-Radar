CREATE DATABASE IF NOT EXISTS roster_db;

\c roster_db;

--user table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, --store hashed password
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--players table
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY, --this is the same as the "id" from api 
    api_id INT UNIQUE NOT NULL, --this is the id from the api
    player_name VARCHAR(100) NOT NULL,
    position VARCHAR(50), --position of the player
    age INT, --age of the player
    per DECIMAL(5, 2), --player efficiency rating
    box DECIMAL(10, 2), --box plus/minus
    team VARCHAR(50), --team the player is on
    block_percentage DECIMAL(5, 2), --block percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--user_players table
CREATE TABLE user_players (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    player_id INT REFERENCES players(player_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, player_id)
);