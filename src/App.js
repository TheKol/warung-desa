import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CasierPage } from './pages/CasierPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' component={CasierPage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
