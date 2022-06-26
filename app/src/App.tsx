import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './page/Home';

function App() {
  return (
      <HashRouter>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
  );
}

export default App;
