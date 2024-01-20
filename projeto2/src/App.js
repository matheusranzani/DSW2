import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Background from './components/Background';

const App = () => {
  return (
    <Router>
      <Header />
      <Background>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </Background>
    </Router>
  );
};

export default App;
