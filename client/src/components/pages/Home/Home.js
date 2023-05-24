import React from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Table from '../../Table/Table';

export default function Home() {
  return (
    <div className='body'>
      <Header title='דף הבית' />
      <main>
        <Table/>
      </main>
      <Footer />
    </div>
  );
}
