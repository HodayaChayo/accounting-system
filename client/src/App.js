import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Login  from './components/pages/Login/Login.js';
import Home from './components/pages/Home/Home.js';
import CusIndex from './components/pages/CusIndex/CusIndex.js';
import SortCodes from './components/pages/SortCodes/SortCodes.js';
<<<<<<< HEAD
import Accounts from './components/pages/Accounts/Accounts.js';
=======
import UserSettings from './components/pages/UserSettings/UserSettings.js';
>>>>>>> 04a5ae8ad4e0236e3d3ff2e036190d89f5e5b6bd

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
<<<<<<< HEAD
          <Route path='/cusIndex' element={<CusIndex/>}></Route>
          <Route path='/sortCodes' element={<SortCodes/>}></Route>
          <Route path='/accounts' element={<Accounts/>} ></Route>
=======
          <Route path='/cusIndex' element={<CusIndex />}></Route>
          <Route path='/sortCodes' element={<SortCodes />}></Route>
          <Route path='/UserSettings' element={<UserSettings />}></Route>
>>>>>>> 04a5ae8ad4e0236e3d3ff2e036190d89f5e5b6bd
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
