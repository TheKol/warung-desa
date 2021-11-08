import { Redirect, Route } from 'react-router-dom';
import { useUser } from './useUser';

export const UserAdminRoute = (props) => {
  const user = useUser();
  if (user) {
    if (user.loginType !== 'admin') return <Redirect to='/cashier' />;
  } else if (!user) return <Redirect to='/' />;

  return <Route {...props} />;
};
