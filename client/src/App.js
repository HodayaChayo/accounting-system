import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/Login.js';
import Home from './components/pages/Home/Home.js';
import CusIndex from './components/pages/CusIndex/CusIndex.js';
import CommandType from './components/pages/CommandType/CommandType.js';
import SortCodes from './components/pages/SortCodes/SortCodes.js';
import Accounts from './components/pages/Accounts/Accounts.js';
import UserSettings from './components/pages/UserSettings/UserSettings.js';
import UploadingDocuments from './components/pages/UploadingDocuments/UploadingDocuments.js';
import ReceivingDocuments from './components/pages/ReceivingDocuments/ReceivingDocuments.js';
import WorkerSettings from './components/pages/WorkerSettings/WorkerSettings.js';
import Archive from './components/pages/Archive/Archive.js';
import IncomeTaxReport from './components/pages/IncomeTaxReport/IncomeTaxReport.js';

import LedgerReport from './components/pages/LedgerReport/LedgerReport.js';
import VatReport from './components/pages/VatReport/VatReport.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/cusIndex' element={<CusIndex />}></Route>
          <Route path='/commandType' element={<CommandType />}></Route>
          <Route path='/sortCodes' element={<SortCodes />}></Route>
          <Route path='/accounts' element={<Accounts />}></Route>
          <Route path='/cusIndex' element={<CusIndex />}></Route>
          <Route path='/sortCodes' element={<SortCodes />}></Route>
          <Route path='/UserSettings' element={<UserSettings />}></Route>
          <Route path='/LedgerReport' element={<LedgerReport />}></Route>
          <Route path='/VatReport' element={<VatReport />}></Route>
          <Route
            path='/UploadingDocuments'
            element={<UploadingDocuments />}
          ></Route>
          <Route
            path='/ReceivingDocuments'
            element={<ReceivingDocuments />}
          ></Route>
          <Route path='/WorkerSettings' element={<WorkerSettings />}></Route>
          <Route path='/IncomeTaxReport' element={<IncomeTaxReport />}></Route>
          <Route path='/Archive' element={<Archive />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
