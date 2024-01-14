import React, { useEffect, useRef } from 'react';
import { Navbar } from './components/Home/Navbar.jsx';
import Home from './components/Home/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About/About.jsx';
import Profile from './components/Profile/Profile.jsx';
import MusicParty from './components/MusicParty/MusicParty.jsx';

function App() {
 

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/musicparty" element={<MusicParty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
