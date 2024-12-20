DROP DATABASE IF EXISTS roster_db;
CREATE DATABASE roster_db;

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
    id INT PRIMARY KEY, --this is the id from the api
    playerName VARCHAR(255) NOT NULL,
    position VARCHAR(30), --position of the player
    per DECIMAL(5, 2), --player effeciency rating of the player
    winShares DECIMAL(5, 2), --player efficiency rating
    "box" DECIMAL(10, 2), --box plus/minus
    team VARCHAR(30) --team the player is on
);

--user_players table
CREATE TABLE user_players (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    id INT REFERENCES players(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, id)
);