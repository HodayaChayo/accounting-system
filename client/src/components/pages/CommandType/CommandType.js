import React, {useState} from 'react'
import Sidebars from '../../Sidebars/Sidebars'
import Header from '../../Header/Header'
import AddCommandType from './AddCommandType'

export default function commandType(){

  return(
    <div className='body'>
      <Header title='סוגיי פקודה'/>
      <Sidebars/>
      <AddCommandType/>

    </div>
  )
}