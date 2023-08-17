import React, { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import ButtonIcon from '../../Button/ButtonIcon';
import css from './commandType.module.css';
import { v4 as uuid } from 'uuid';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';


export default function AddCommandType(props) {
  const thisVatId = localStorage.getItem('CusVAT_Id');
  const [code, setCode] = useState();
  const [name, setName] = useState('');
  const [selectAccount, setSelectAccount] = useState([]);
  const [debit, setDebit] = useState([
    { account: -1, percent: 100, isMain: 'כן', delete: '' },
  ]);
  const [credit, setCredit] = useState([
    { account: -1, percent: 100, isMain: 'כן', delete: '' },
  ]);

  // check if debits percent equals to credits percent
  const isPercentEquals = (debit, credit) => {
    let sumDebit = 0;
    let sumCredit = 0;

    debit.forEach(el => {
      sumDebit += Number(el.percent);
    });

    credit.forEach(el => {
      sumCredit += Number(el.percent);
    });

    // console.log('debit: ', sumDebit, 'credit: ', sumCredit);
    return sumDebit === sumCredit;
  };

  // Checks if there is an account for all the non-mains
  const haveAccountInNotMain = (debit, credit) => {
    let flag = true;

    debit.forEach(el => {
      if (el.isMain === 'לא' && Number(el.account) === -1) {
        flag = false;
      }
    });

    credit.forEach(el => {
      // console.log(Number(el.account));
      if (el.isMain === 'לא' && Number(el.account) === -1) {
        flag = false;
      }
    });

    return flag;
  };

  useEffect(() => {
    fetch('/accounts/getSelectData', {
      method: 'POST',
      body: JSON.stringify({ thisVatId }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.unshift({ value: -1, label: '?' });
        setSelectAccount(res);
      });
  }, []);

  // ADD: //
  // add rows to debit part:
  const debitAddHandle = () => {
    const item = {
      account: -1,
      percent: 0,
      isMain: 'לא',
      delete: 'delete',
    };
    setDebit([...debit, item]);
  };

  // add rows to credit part:
  const creditAddHandle = () => {
    const item = {
      account: -1,
      percent: 0,
      isMain: 'לא',
      delete: 'delete',
    };
    setCredit([...credit, item]);
  };

  // EDIT: //
  // edit rows in debit part:
  const debitEditHandle = idx => e => {
    const { name, value } = e.target;
    const rows = [...debit];
    rows[idx] = {
      ...rows[idx],
      [name]: value,
    };
    setDebit(rows);
    // console.log(rows);
    // console.log(debit);
  };

  // edit rows in credit part:
  const creditEditHandle = idx => e => {
    const { name, value } = e.target;
    const rows = [...credit];
    rows[idx] = {
      ...rows[idx],
      [name]: value,
    };
    setCredit(rows);
    // console.log(rows);
    // console.log(credit);
  };

  // DELETE: //
  // delete rows in debit part:
  const debitDeleteHandle = idx => {
    debit.splice(idx, 1);
    setDebit([...debit]);
  };

  // delete rows in credit part:
  const creditDeleteHandle = idx => {
    credit.splice(idx, 1);
    setCredit([...credit]);
  };

  const addToDatabase = () => {
    const dataObj = {
      thisVatId: thisVatId,
      code: code,
      name: name,
      debitArr: debit,
      creditArr: credit,
    };

    fetch('/commandType/add', {
      method: 'POST',
      body: JSON.stringify(dataObj),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdd) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          // props.dataChange(prevValue => prevValue + 1);
          props.display(false);
          props.dataChange(prevValue => prevValue + 1)
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

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
      <Button text='הוסף שורה' fun={debitAddHandle} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>חשבון</th>
            <th>אחוז</th>
            <th>חשבון ראשי</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {debit.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <select
                  name='account'
                  value={item.account}
                  onChange={debitEditHandle(idx)}
                >
                  {selectAccount.map(el => {
                    return (
                      <option
                        key={uuid()}
                        label={el.label}
                        value={el.value}
                      ></option>
                    );
                  })}
                </select>
              </td>
              <td>
                <input
                  type='text'
                  name='percent'
                  placeholder='אחוז'
                  value={item.percent}
                  onChange={debitEditHandle(idx)}
                />
              </td>
              <td>{debit[idx].isMain}</td>
              <td>
                {debit[idx].delete !== '' && (
                  <ButtonIcon
                    src={<MdOutlineDeleteForever />}
                    fun={() => debitDeleteHandle(idx)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
      <h3>זכות</h3>
      <Button text='הוסף שורה' fun={creditAddHandle} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>חשבון</th>
            <th>אחוז</th>
            <th>חשבון ראשי</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {credit.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <select
                  name='account'
                  value={item.account}
                  onChange={creditEditHandle(idx)}
                >
                  {selectAccount.map(el => {
                    return (
                      <option
                        key={uuid()}
                        label={el.label}
                        value={el.value}
                      ></option>
                    );
                  })}
                </select>
              </td>
              <td>
                <input
                  type='text'
                  name='percent'
                  placeholder='אחוז'
                  value={item.percent}
                  onChange={creditEditHandle(idx)}
                />
              </td>
              <td>{credit[idx].isMain}</td>
              <td>
                {credit[idx].delete !== '' && (
                  <ButtonIcon
                    src={<MdOutlineDeleteForever />}
                    fun={() => creditDeleteHandle(idx)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.buttons}>
        <Button
          text='שמירה'
          fun={() => {
            addToDatabase()
          }}
          isDisable={
            !isPercentEquals(debit, credit) ||
            !haveAccountInNotMain(debit, credit) ||
            code === '' ||
            name === ''
          }
        />
        <Button
          text='ביטול'
          fun={() => {
            props.display(false);
          }}
        />
      </div>
    </div>
  );
}
