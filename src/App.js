import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrintInvoice } from './components/PrintInvoice';
import { CasierPage } from './pages/CasierPage';
import { GoodsStorage } from './pages/GoodsStorage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' component={CasierPage} exact />
          <Route path='/goods-storage' component={GoodsStorage} />
          <Route path='/print-invoice' component={PrintInvoice} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
