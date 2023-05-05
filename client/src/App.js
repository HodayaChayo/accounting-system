import React from 'react';
import Header from './components/Header/Header.js';
// import Main from './components/Main/Main.js';
import Footer from './components/Footer/Footer.js';
import Login from './components/pages/Login/Login.js';

function App() {
  return (
    <div className='App'>
      <Header />
      <Login/>
      <Footer />
    </div>
  );
}

export default App;
