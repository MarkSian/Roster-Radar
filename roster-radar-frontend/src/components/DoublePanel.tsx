import React, { useState } from 'react';

interface DoublePanelProps {
  onMyRosterClick: () => void;
  onOtherRostersClick: () => void;
  onPlayersClick: () => void;
  onTop10PlayersClick: () => void;
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

const DoublePanel: React.FC<DoublePanelProps> = ({ onMyRosterClick, onOtherRostersClick, onPlayersClick, onTop10PlayersClick }) => {
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

  const fetchTopPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/top-players'); // Adjust this URL to match your backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched top players:', data);
      setPlayers(data); // Assuming data is an array of players
    } catch (error) {
      console.error('Error fetching top players:', error);
    }
  };

  const renderTable = (title: string, players: Player[]) => (
    <div>
      <h1 className="fw-bold">{title}</h1>
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

  const handleMyRosterClick = async () => {
    await fetchPlayers();
    onMyRosterClick();
    console.log('My Roster Clicked:', players); // Log players state
    setLeftPanelContent(renderTable('My Roster', players));
  };

  const handleOtherRostersClick = async () => {
    await fetchPlayers();
    onOtherRostersClick();
    console.log('Other Rosters Clicked:', players); // Log players state
    setLeftPanelContent(renderTable('Other Rosters', players));
  };

  const handlePlayersClick = async () => {
    await fetchPlayers();
    onPlayersClick();
    console.log('Players Clicked:', players); // Log players state
    setRightPanelContent(renderTable('Players', players));
  };

  const handleTop10PlayersClick = async () => {
    await fetchTopPlayers();
    onTop10PlayersClick();
    console.log('Top 10 Players Clicked:', players); // Log players state
    setRightPanelContent(renderTable('Please Choose a Metric', players));
  };

  const handlePerClick = () => {
    setRightPanelContent(renderTable('Top 10 Players by PER', players));
  };

  const handleWinSharesClick = () => {
    setRightPanelContent(renderTable('Top 10 Players by Win Shares', players));
  };

  const handleBoxClick = () => {
    setRightPanelContent(renderTable('Top 10 Players by Box', players));
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
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handleTop10PlayersClick}>
              Top 10 Players
            </button>
          </div>
          <div className="btn-group top-buttons mt-3" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handlePerClick}>
              PER
            </button>
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handleWinSharesClick}>
              Win Share
            </button>
            <button type="button" className="btn btn-danger btn-outline-dark m-2" onClick={handleBoxClick}>
              Box
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