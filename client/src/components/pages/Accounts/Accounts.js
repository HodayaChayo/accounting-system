import React, { useState } from 'react'
import Header from '../../Header/Header'
import Sidebars from '../../Sidebars/Sidebars'
import { accountsColumns } from './accountsTableColumns'
import Table from '../../Table/Table'
import Button from '../../Button/Button'
import AccountPopup from './AccountPopup'

export default function Accounts(){
  const [dataTable, setDataTable] = useState([])
  const [displayPopup, setDisplayPopup] = useState(false)

  return <div className='body'>
    <Header title='הגדרת חשבונות'/>
    <Sidebars/>
    <Button text='הוספה' fun={()=>{setDisplayPopup(true)}}/>
    {displayPopup && <AccountPopup setDisplay={setDisplayPopup}/>}
    <Table myData={dataTable} myColumns={accountsColumns}/>
  </div>
}