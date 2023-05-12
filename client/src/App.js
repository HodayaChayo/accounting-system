import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Login  from './components/pages/Login/Login.js';
import Home from './components/pages/Home/Home.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
