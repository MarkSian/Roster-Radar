import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DoublePanelProps {
  onMyRosterClick: () => void;
  onOtherRostersClick: () => void;
  onPlayersClick: () => void;
  onProRostersClick: () => void;
}

interface Player {
  id: number;
  playername: string;
  position: string;
  per: number;
  winshares: number;
  box: number;
  team: string;
}

const DoublePanel: React.FC<DoublePanelProps> = ({ onMyRosterClick, onOtherRostersClick, onPlayersClick, onProRostersClick }) => {
  const [leftPanelContent, setLeftPanelContent] = useState<React.ReactNode>(null);
  const [rightPanelContent, setRightPanelContent] = useState<React.ReactNode>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  
  // fetch players from players table
  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/players'); // Adjust this URL to match your backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched players:', data);
      setPlayers(data); // Assuming data is an array of players
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

 //fetch user players

 async function fetchUserPlayers(userId: number): Promise<Player[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/user_players/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching players:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched User Players Data:', data);
    return data; // Return the fetched user players
  } catch (error) {
    console.error('Error fetching players:', error);
    return []; // Return an empty array in case of error
  }
}

  //my roster
  const handleMyRosterClick = async () => {
    const userId = getUserId();
    if (userId) {
      const userPlayers = await fetchUserPlayers(Number(userId)); // Fetch user players
      setPlayers(userPlayers); // Update the players state with user-specific players
    } else {
      console.error('User ID not found');
    }
    onMyRosterClick();
    console.log('My Roster Clicked:', players); // Log players state
    setLeftPanelContent(
      <div>
        <h1 className="fw-bold">My Roster</h1>
        <div className="bd-example">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Per</th>
                <th scope="col">Win Shares</th>
                <th scope="col">Box</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.playername}</td>
                  <td>{player.position}</td>
                  <td>{player.per}</td>
                  <td>{player.winshares}</td>
                  <td>{player.box}</td>
                  <td>{player.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  //other rosters
  const handleOtherRostersClick = async () => {
    await fetchPlayers();
    onOtherRostersClick();
    console.log('Other Rosters Clicked:', players); // Log players state
    setLeftPanelContent(
      <div>
        <h1 className="fw-bold">Other Rosters</h1>
        <div className="bd-example">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Per</th>
                <th scope="col">Win Shares</th>
                <th scope="col">Box</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.playername}</td>
                  <td>{player.position}</td>
                  <td>{player.per}</td>
                  <td>{player.winshares}</td>
                  <td>{player.box}</td>
                  <td>{player.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  //add player to roster
  // Function to get the logged-in user's ID
  interface DecodedToken {
    userId: string; // Adjust the type according to your actual userId type
    // Add other fields as necessary
}

const getUserId = (): string | null => {
    const token = localStorage.getItem('token'); // Assuming you stored the token in local storage
    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token and cast to DecodedToken
        return decodedToken.userId; // Assuming the user ID is stored in the 'userId' field
    }
    return null; // Return null if no token is found
};

const addPlayerToRoster = async (playerId: number) => {
    const userId = getUserId(); // Get the logged-in user's ID

    if (!userId) {
        console.error('User is not logged in');
        return; // Exit if user ID is not available
    }

    try {
        const response = await fetch('http://localhost:3000/api/user_players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, playerId }),
        });

        if (response.ok) {
            const addedPlayer = await response.json();
            console.log('Player added to roster:', addedPlayer);
            // Optionally, update the UI or notify the user
        } else {
            const error = await response.json();
            console.error('Error adding player:', error);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

  //players
  const handlePlayersClick = async () => {
    await fetchPlayers();
    onPlayersClick();
    console.log('Players Clicked:', players); // Log players state
    setRightPanelContent(
      <div>
        <h1 className="fw-bold">Players</h1>
        <div className="bd-example">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Per</th>
                <th scope="col">Win Shares</th>
                <th scope="col">Box</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.playername}</td>
                  <td>{player.position}</td>
                  <td>{player.per}</td>
                  <td>{player.winshares}</td>
                  <td>{player.box}</td>
                  <td>{player.team}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => addPlayerToRoster(player.id)}
                    >
                      Add to Roster
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  //top 10 players
  const handleProRostersClick = async () => {
    await fetchPlayers();
    onProRostersClick();
    console.log('Pro Rosters Clicked:', players); // Log players state
    setRightPanelContent(
      <div>
        <h1 className="fw-bold">Top 10 Players</h1>
        <div className="bd-example">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Per</th>
                <th scope="col">Win Shares</th>
                <th scope="col">Box</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.playername}</td>
                  <td>{player.position}</td>
                  <td>{player.per}</td>
                  <td>{player.winshares}</td>
                  <td>{player.box}</td>
                  <td>{player.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-3">
        <div className="col-md-5 d-flex flex-column align-items-center">
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handleMyRosterClick}>
              My Roster
            </button>
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handleOtherRostersClick}>
              Other Rosters
            </button>
          </div>
        </div>
        <div className="col-md-1 d-flex justify-content-center">
          <div className="vertical-line"></div>
        </div>
        <div className="col-md-5 d-flex flex-column align-items-center">
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handlePlayersClick}>
              Players
            </button>
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handleProRostersClick}>
              Top 10 Players
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 panel-left text-white">
          {leftPanelContent}
        </div>
        <div className="col-md-6 panel-right text-white">
          {rightPanelContent}
        </div>
      </div>
    </div>
  );
};

export default DoublePanel;