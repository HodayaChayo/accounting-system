import React, {useState} from 'react'
import Sidebars from '../../Sidebars/Sidebars'
import Header from '../../Header/Header'
import AddCommandType from './AddCommandType'
import Button from '../../Button/Button'

export default function commandType(){
  const[displayAdd, setDisplayAdd] = useState(false)

  return(
    <div className='body'>
      <Header title='סוגיי פקודה'/>
      <Sidebars/>
      <Button text='הוספת סוג פקודה' fun={()=>{setDisplayAdd(true)}}/>
      {displayAdd && <AddCommandType display={setDisplayAdd}/>}

    </div>
  )
}