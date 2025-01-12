import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import STT from './components/STT/Chatbot';
import TTS from './components/TTS/Combinetts';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  // Use the location hook to get the current route
  const location = useLocation();

  return (
    <div className="AppM">
      {/* Display NavBar only on home route */}
      {location.pathname === '/' && <NavBar />}

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/text-to-speech" element={<TTS />} />
        <Route path="/speech-to-text" element={<STT />} />
      </Routes>
    </div>
  );
}



export default App;
