import NavBar from './components/NavBar'
import DoublePanel from './components/DoublePanel'
import FooterSection from './components/FooterSection'
import './App.css'

function App() {
  const handleMyRosterClick = () => {
    console.log('My Roster clicked');
  };

  const handleOtherRostersClick = () => {
    console.log('Other Rosters clicked');
  };

  const handlePlayersClick = () => {
    console.log('Players clicked');
  };

  const handleProRostersClick = () => {
    console.log('Pro Rosters clicked');
  };
  
  return (
    <>
      <NavBar />
      <DoublePanel  
        onMyRosterClick={handleMyRosterClick}
        onOtherRostersClick={handleOtherRostersClick}
        onPlayersClick={handlePlayersClick}
        onProRostersClick={handleProRostersClick}
        />
      <FooterSection />
    </>
  )
}

export default App
