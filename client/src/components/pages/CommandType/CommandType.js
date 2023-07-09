import React, {useState} from 'react'
import Sidebars from '../../Sidebars/Sidebars'
import Header from '../../Header/Header'

export default function commandType(){

  return(
    <div className='body'>
      <Header title='סוגיי פקודה'/>
      <Sidebars/>

      <h3>חובה</h3>
      <h3>זכות</h3>

    </div>
  )
}