import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Background from './components/Background';
import { UserProvider } from './hooks/useUser';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Background>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/cadastro" exact element={<Cadastro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </Background>
      </UserProvider>
    </Router>
  );
};

export default App;
