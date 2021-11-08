import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CasierPage } from './pages/CasierPage';
import ExpendPage from './pages/ExpendPage';
import { GoodsStorage } from './pages/GoodsStorage';
import IncomeStatementPage from './pages/IncomeStatementPage';
import LoginPage from './pages/LoginPage';
import PurcaseReportPage from './pages/PurcaseReportPage';
import RentPage from './pages/RentPage';
import RentReportPage from './pages/RentReportPage';
import SellingReportPage from './pages/SellingReportPage';
import NotFoundPage from './pages/404';

import { PrivateRoute } from './auth/PrivateRoute';
import { UserCashierRoute } from './auth/UserCashierRoute';
import { UserAdminRoute } from './auth/UserAdminRoute';
import UserPage from './pages/UserPage';
import { NavBar } from './NavBar';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute path='/' exact>
            <LoginPage />
          </PrivateRoute>
          <UserCashierRoute path='/cashier'>
            <CasierPage />
          </UserCashierRoute>
          <UserCashierRoute path='/rent'>
            <RentPage />
          </UserCashierRoute>
          <UserAdminRoute path='/goods-storage'>
            <GoodsStorage />
          </UserAdminRoute>
          <UserAdminRoute path='/selling-report'>
            <SellingReportPage />
          </UserAdminRoute>
          <UserAdminRoute path='/expense-report'>
            <ExpendPage />
          </UserAdminRoute>
          <UserAdminRoute path='/rent-report'>
            <RentReportPage />
          </UserAdminRoute>
          <UserAdminRoute path='/purcase-report'>
            <PurcaseReportPage />
          </UserAdminRoute>
          <UserAdminRoute path='/income-statement'>
            <IncomeStatementPage />
          </UserAdminRoute>
          <UserAdminRoute path='/user'>
            <UserPage />
          </UserAdminRoute>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
