import React, { useState, useEffect } from 'react';

interface DoublePanelProps {
  onMyRosterClick: () => void;
  onOtherRostersClick: () => void;
  onPlayersClick: () => void;
  onProRostersClick: () => void;
}

interface Player {
  id: number;
  name: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
}

const DoublePanel: React.FC<DoublePanelProps> = ({ onMyRosterClick, onOtherRostersClick, onPlayersClick, onProRostersClick }) => {
  const [leftPanelContent, setLeftPanelContent] = useState<React.ReactNode>(null);
  const [rightPanelContent, setRightPanelContent] = useState<React.ReactNode>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://rest.nbaapi.com/api/PlayerDataAdvanced/query');
      const data = await response.json();
      console.log('Fetched players:', data); // Log fetched data
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleMyRosterClick = () => {
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
                <th scope="col">Points</th>
                <th scope="col">Rebounds</th>
                <th scope="col">Assists</th>
                <th scope="col">Steals</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                  <td>{player.rebounds}</td>
                  <td>{player.assists}</td>
                  <td>{player.steals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleOtherRostersClick = () => {
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
                <th scope="col">Points</th>
                <th scope="col">Rebounds</th>
                <th scope="col">Assists</th>
                <th scope="col">Steals</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                  <td>{player.rebounds}</td>
                  <td>{player.assists}</td>
                  <td>{player.steals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handlePlayersClick = () => {
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
                <th scope="col">Points</th>
                <th scope="col">Rebounds</th>
                <th scope="col">Assists</th>
                <th scope="col">Steals</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                  <td>{player.rebounds}</td>
                  <td>{player.assists}</td>
                  <td>{player.steals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleProRostersClick = () => {
    onProRostersClick();
    console.log('Pro Rosters Clicked:', players); // Log players state
    setRightPanelContent(
      <div>
        <h1 className="fw-bold">Pro Rosters</h1>
        <div className="bd-example">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
                <th scope="col">Rebounds</th>
                <th scope="col">Assists</th>
                <th scope="col">Steals</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.points}</td>
                  <td>{player.rebounds}</td>
                  <td>{player.assists}</td>
                  <td>{player.steals}</td>
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
              Pro Rosters
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
}

export default DoublePanel;