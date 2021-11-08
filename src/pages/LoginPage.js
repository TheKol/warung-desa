import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { gql, useMutation } from '@apollo/client';

const LoginPage = () => {
  const [, setToken] = useToken();
  const [, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });

  const history = useHistory();

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [login, { error }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      const user = result.data.updateToken;
      const { token } = user;
      setToken(token);
      if (user.loginType === 'kasir') {
        history.push('/cashier');
      } else if (user.loginType === 'admin') {
        history.push('/goods-storage');
      }
      window.location.reload();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      input: { userName: values.userName, password: values.password },
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <img
        className='w-20 h-28 mb-8'
        src='./images/logo-bumdes.png'
        alt='Logo Bumdes'
      />

      <form
        onSubmit={onSubmit}
        className='flex flex-col justify-center text-center items-center border-2 rounded-lg 
        p-4 md:p-8 shadow-md w-80 sm:w-96 md:w-150 h-80 sm:h-96 md:h-150 py-4 sm:py-8 
        md:py-12 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6'
      >
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Log In</h1>
        {error && (
          <div className='p-text text-red-500'>
            User name atau Password salah!
          </div>
        )}
        <input
          name='userName'
          value={values.userName}
          onChange={onChange}
          type='text'
          className='dark:text-gray-500 self-start w-full rounded-md border-2 pl-2'
          placeholder='user name'
          autoComplete='username'
        />
        <input
          name='password'
          value={values.password}
          onChange={onChange}
          className='dark:text-gray-500 self-start w-full rounded-md border-2 pl-2'
          type='password'
          placeholder='password'
          autoComplete='current-password'
        />
        <button
          disabled={!values.userName || !values.password}
          type='submit'
          className='border-2 rounded-lg font-medium text-sm sm:text-base 
          md:text-lg lg:text-xl xl:text-2xl w-20 md:w-28 h-8 md:h-12 md:py-1'
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

const LOGIN_USER = gql`
  mutation Mutation($input: UserPassInput) {
    updateToken(input: $input) {
      userName
      passwordHash
      loginType
      token
    }
  }
`;
