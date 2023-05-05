import React from 'react';
export default function Main() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <main>
      <p>{!data ? 'Loading...' : data}</p>
    </main>
  );
}
