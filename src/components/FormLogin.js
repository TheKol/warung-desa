import React from 'react';
import { useHistory } from 'react-router-dom';

const FormLogin = ({
  setPasswordValue,
  setUserName,
  errorMessage,
  userName,
  passwordValue,
  data,
  setToken,
  login,
}) => {
  const history = useHistory();

  const onClickLoginButton = async () => {
    console.log('tombol di click');
    try {
      const LoginInfo = {
        userName: userName,
        password: passwordValue,
      };
      console.log('awal try');
      login({
        variables: {
          input: LoginInfo,
        },
      });
      if (data) {
        console.log('data kalau ada');
        const { token } = data.updateToken;
        setToken(token);
        history.push('/');
      }
      console.log('akhir try');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <img
        className='w-20 h-28 mb-8'
        src='./images/logo-bumdes.png'
        alt='Logo Bumdes'
      />{' '}
      <div
        className='flex flex-col justify-center text-center items-center border-2 rounded-lg 
          p-4 md:p-8 shadow-md w-80 sm:w-96 md:w-150 h-80 sm:h-96 md:h-150 py-4 sm:py-8 
          md:py-12 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6'
      >
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Log In</h1>
        {errorMessage && (
          <div className='p-text text-red-500'>{errorMessage}</div>
        )}

        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type='text'
          className='dark:text-gray-500 self-start w-full rounded-md border-2 pl-2'
          placeholder='user name'
        />
        <input
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value);
          }}
          className='dark:text-gray-500 self-start w-full rounded-md border-2 pl-2'
          type='password'
          placeholder='password'
        />
        <button
          disabled={!userName || !passwordValue}
          onClick={onClickLoginButton}
          className='border-2 rounded-lg font-medium text-sm sm:text-base 
            md:text-lg lg:text-xl xl:text-2xl w-20 md:w-28 h-8 md:h-12 md:py-1'
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
