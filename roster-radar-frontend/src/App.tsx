// imports
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import NavBar from './components/NavBar';
import DoublePanel from './components/DoublePanel';
import FooterSection from './components/FooterSection';
import AuthForm from './components/AuthForm'; // Import AuthForm component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        <Route path="/dashboard" element={
          <>
            <NavBar />
            <DoublePanel onMyRosterClick={function (): void {
              throw new Error('Function not implemented.');
            } } onOtherRostersClick={function (): void {
              throw new Error('Function not implemented.');
            } } onPlayersClick={function (): void {
              throw new Error('Function not implemented.');
            } } onProRostersClick={function (): void {
              throw new Error('Function not implemented.');
            } } />
            <FooterSection />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;