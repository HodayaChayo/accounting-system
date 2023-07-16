import React, { useState } from 'react';
import Button from '../../Button/Button';

export default function AddCommandType() {
  const [code, setCode] = useState();
  const [name, setName] = useState('');
  const [debit, setDebit] = useState([])

  return (
    <div>
      <h2>הוספת סוג פקודה</h2>

      <form>
        <p>
          *קוד:
          <input
            type='text'
            placeholder='קוד הפקודה'
            onChange={e => {
              setCode(e.target.value);
            }}
          />
        </p>
        <p>
          *שם:
          <input
            type='text'
            placeholder='תיאור הפקודה'
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </p>
      </form>
      <h3>חובה</h3>
      <Button text='הוסף שורה' />
      <table>
        <thead>
          <tr>
            <th>חשבון</th>
            <th>אחוז</th>
            <th>חשבון ראשי</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select name='account'></select>
            </td>
            <td>
              <input type='text' placeholder='אחוז' value={100} onChange={(e)=>{console.log(e);}} />
            </td>
            <td>כן</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div></div>
      <h3>זכות</h3>
    </div>
  );
}
