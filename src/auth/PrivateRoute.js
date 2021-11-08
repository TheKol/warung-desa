import { Redirect, Route } from 'react-router-dom';
import { useUser } from './useUser';

export const PrivateRoute = (props) => {
  const user = useUser();
  if (user) {
    if (user.loginType === 'kasir') {
      return <Redirect to='/cashier' />;
    } else if (user.loginType === 'admin') {
      return <Redirect to='/goods-storage' />;
    }
  }

  return <Route {...props} />;
};
