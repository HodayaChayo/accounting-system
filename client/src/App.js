import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Login  from './components/pages/Login/Login.js';
import Home from './components/pages/Home/Home.js';
import CusIndex from './components/pages/CusIndex/CusIndex.js';
import SortCodes from './components/pages/SortCodes/SortCodes.js';
import UserSettings from './components/pages/UserSettings/UserSettings.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/cusIndex' element={<CusIndex />}></Route>
          <Route path='/sortCodes' element={<SortCodes />}></Route>
          <Route path='/UserSettings' element={<UserSettings />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
