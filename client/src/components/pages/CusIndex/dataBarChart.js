function getData(data) {
  // let arr = [
  //   {
  //     month: 'ינואר',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'פברואר',
  //     expenses: 0,
  //     income: 90,
  //   },
  //   {
  //     month: 'מרץ',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'אפריל',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'מאי',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'יוני',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'יולי',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'אוגוסט',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'ספטמבר',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'אוקטובר',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'נובמבר',
  //     expenses: 0,
  //     income: 0,
  //   },
  //   {
  //     month: 'דצמבר',
  //     expenses: 0,
  //     income: 0,
  //   },
  // ];

  // // Function to translate month name from Hebrew to English
  // function translateMonth(hebrewMonth) {
  //   const months = [
  //     'ינואר',
  //     'פברואר',
  //     'מרץ',
  //     'אפריל',
  //     'מאי',
  //     'יוני',
  //     'יולי',
  //     'אוגוסט',
  //     'ספטמבר',
  //     'אוקטובר',
  //     'נובמבר',
  //     'דצמבר',
  //   ];
  //   return months.indexOf(hebrewMonth) + 1;
  // }

  // // Update values in the firstArray
  // let updatedArray = [...arr];
  // console.log(data);
  // data.forEach(({ month, expenses, income }) => {
  //   const index = translateMonth(month) - 1;
  //   if (index >= 0 && index < updatedArray.length) {
  //     updatedArray[index].expenses = expenses;
  //     updatedArray[index].income = income;
  //   }
  // });

  // return updatedArray;
  return [
    {
      month: 'ינואר',
      expenses: 4570,
      income: 10280,
    },
    {
      month: 'פברואר',
      expenses: 6110,
      income: 11320,
    },
    {
      month: 'מרץ',
      expenses: 0,
      income: 0,
    },
    {
      month: 'אפריל',
      expenses: 0,
      income: 0,
    },
    {
      month: 'מאי',
      expenses: 0,
      income: 0,
    },
    {
      month: 'יוני',
      expenses: 0,
      income: 0,
    },
    {
      month: 'יולי',
      expenses: 0,
      income: 0,
    },
    {
      month: 'אוגוסט',
      expenses: 0,
      income: 0,
    },
    {
      month: 'ספטמבר',
      expenses: 0,
      income: 0,
    },
    {
      month: 'אוקטובר',
      expenses: 0,
      income: 0,
    },
    {
      month: 'נובמבר',
      expenses: 0,
      income: 0,
    },
    {
      month: 'דצמבר',
      expenses: 0,
      income: 0,
    },
  ];
}
export { getData };
