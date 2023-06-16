import React, { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import css from './accounts.module.css';
import Select from 'react-select';
import axios from 'axios';

export default function AccountPopup(props) {
  const [selectSortCode, setSelectSortCode] = useState([]);
  const [options, setOptions] = useState([]);
  const thisVatId = localStorage.getItem('CusVAT_Id');

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];


  // const fetchOptions = async () => {
  //   try {
  //     const response = await fetch('/sortCode/getSelectData');
  //     const data = await response.json();
  //     // const transformedOptions = transformOptions(data); // Transform the fetched data into the required format
  //     setSelectSortCode(data);
  //   } catch (error) {
  //     console.error('Error fetching options:', error);
  //   }
  // };

  useEffect(() => {

    // fetchOptions(); 
    const fetchOption= async() =>{

      await fetch('/sortCode/getSelectData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({thisVatId}),
      })
        .then(res => res.json())
        .then(async res => {
          // console.log('get data');
          console.log(res);
          setSelectSortCode(res)
          console.log(selectSortCode);
        });
    }

    fetchOption()
  }, []);

  // useEffect(()=>{
  //   setOptions(selectSortCode)
  // },[selectSortCode])

  const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '25px',
      height: '25px',
      // maxWidth: '180px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '25px',
      padding: '0 4px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '25px',
    }),
  };

  return (
    <div className={css.popup}>
      <h2>הוספת חשבון</h2>
      <div>
        <p>
          *מספר חשבון: <input type='number' placeholder='מספר חשבון' />
        </p>
        <p>
          *קוד מיון: <Select options={selectSortCode} styles={selectStyle} />
        </p>
      </div>
      <div className={css.buttons}>
        <Button text='הוספה' />
        <Button
          text='ביטול'
          fun={() => {
            props.setDisplay(false);
          }}
        />
      </div>
    </div>
  );
}
