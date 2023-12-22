import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import Encrypt from './components/Encrypt';

function App() {
  useEffect(() => {
    document.title = 'React UI Testing';
  }, []);

  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>React UI Form</h1>
        <Switch>
          <Route path="/encrypt" component={Encrypt} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const location = useLocation();

   return (
    <Link to="/encrypt" style={{ textDecoration: 'none' }}>
      {location.pathname !== '/encrypt' && (
        <button
          data-testid="encryption-button"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '5px',
          }}
        >
          Click this
        </button>
      )}
    </Link>
  );
}

export default App;
