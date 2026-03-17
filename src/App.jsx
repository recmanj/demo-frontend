import React, { useEffect, useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('Loading...');

  useEffect(() => {
    const backendUrl = window._env_?.BACKEND_URL ?? '';
    fetch(`${backendUrl}/api/greeting`)
      .then((res) => res.json())
      .then((data) => setGreeting(data.message))
      .catch(() => setGreeting('Could not reach backend — please try again later.'));
  }, []);

  return (
    <div className="app">
      <h1>Demo App</h1>
      <p>{greeting}</p>
      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#888' }}>
        v1.1.0 — Powered by Flux CD
      </footer>
    </div>
  );
}

export default App;
