import React, { useEffect, useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('Loading...');

  useEffect(() => {
    const backendUrl = window._env_?.BACKEND_URL || 'http://localhost:8000';
    fetch(`${backendUrl}/api/greeting`)
      .then((res) => res.json())
      .then((data) => setGreeting(data.message))
      .catch(() => setGreeting('Could not reach backend — please try again later.'));
  }, []);

  return (
    <div className="app">
      <h1>Demo App</h1>
      <p>{greeting}</p>
    </div>
  );
}

export default App;
