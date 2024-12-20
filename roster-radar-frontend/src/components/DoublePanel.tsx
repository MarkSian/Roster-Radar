import React, { useState, useEffect } from 'react';

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

  const handleMyRosterClick = async () => {
    await fetchPlayers();
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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