import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Header from './components/Header/Header.js';
// import Main from './components/Main/Main.js';
// import Footer from './components/Footer/Footer.js';
import Login from './components/pages/Login/Login.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}>
        </Route>
      </Routes>
      </BrowserRouter>
      {/* <Header />
      <Login/>
      <Footer /> */}
    </div>
  );
}

export default App;
