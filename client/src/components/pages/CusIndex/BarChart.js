'use strict';

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';
import { getData } from './dataBarChart';

export default function BarChart () {
  const [options, setOptions] = useState({
    title: {
      text: 'מצב תיק לפי חודשים',
    },
    subtitle: {
      text: '2023',
    },
    data: getData(),
    series: [
      {
        type: 'column',
        xKey: 'month',
        yKey: 'expenses',
      },
      {
        type: 'column',
        xKey: 'month',
        yKey: 'income',
      },
    ],
  });

  return <AgChartsReact options={options} />;
};

// const root = createRoot(document.getElementById('root'));
// root.render(<ChartExample />);
