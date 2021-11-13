import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled, { keyframes } from 'styled-components';
import { useUser } from './auth/useUser';

const navigation = [
  { name: 'Kasir', href: '/cashier' },
  { name: 'Sewa', href: '/rent' },
  { name: 'Stock', href: '/goods-storage' },
  { name: 'Penjualan', href: '/selling-report' },
  { name: 'Pengeluaran', href: '/expense-report' },
  { name: 'Laporan Sewa', href: '/rent-report' },
  { name: 'Pembelian', href: '/purcase-report' },
  { name: 'Laba & Rugi', href: '/income-statement' },
  { name: 'User', href: '/user' },
];

const NavLink = styled.a`
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    max-width: 100px;
    height: 21px;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: all 0.5s cubic-bezier(0.03, 0.78, 0.4, 1.39);
    opacity: 0;
  }
  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.2);
      transform: scaleX(1);
      opacity: 1;
    }
  }
`;

export const NavBar = () => {
  const [token, setToken] = useState(false);
  const user = useUser();
  const clear = keyframes`
     to {
    opacity: 1;
    transform: none;}
    `;

  const NavToggle = styled.div`
    animation: ${clear} 0.3s forwards;
    transform: translateY(3rem);
  `;

  const [toggleBtn, setToggleBtn] = useState(false);

  useEffect(() => {
    if (user) {
      setToken(true);
    }
  }, [user, setToken]);

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const toggleBtnClick = () => {
    setToggleBtn(!toggleBtn);
  };

  return (
    <>
      <nav
        className='top-0 z-10 uppercase border-b-2 
      text-gray-500 bg-white dark:bg-black dark:text-white w-screen print:hidden'
      >
        <div className='flex flex-row p-2 items-center'>
          <div className='flex flex-row flex-initial items-center'>
            <a className='mx-2' href='/'>
              <img
                src='./images/logo-bumdes.png'
                alt='Logo Bumdes'
                className='w-6'
              />
            </a>
            <p className='font-semibold text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl'>
              BUMDES
            </p>
          </div>
          <div className='flex-auto'></div>
          <div className='flex flex-row flex-initial items-center p-2 mr-2'>
            <button
              onClick={toggleBtnClick}
              className='rounded-sm md:hidden focus:ring-2 ring-gray-500 px-2'
            >
              <GiHamburgerMenu className='toggle-btn mt-1 right-6 text-2xl ' />
            </button>
            <div className='flex-col hidden md:block space-x-3'>
              {navigation.map((item) => (
                <NavLink
                  className='relative text-xs'
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </NavLink>
              ))}
              {token ? (
                <NavLink
                  onClick={logOut}
                  className='relative mb-2 cursor-pointer text-xs'
                  key='Log In'
                >
                  Log Out
                </NavLink>
              ) : null}
            </div>
          </div>
        </div>
        {toggleBtn ? (
          <NavToggle
            className='z-20 md:hidden absolute 
          bg-white dark:bg-black right-0 w-screen border-b-2'
          >
            <div className='flex flex-col items-end mr-8 space-y-2'>
              {navigation.map((item) => (
                <NavLink
                  className='relative text-xs'
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </NavLink>
              ))}
              {token ? (
                <NavLink
                  onClick={logOut}
                  className='relative mb-2 cursor-pointer text-xs'
                  key='Log In'
                >
                  Log Out
                </NavLink>
              ) : null}
            </div>
          </NavToggle>
        ) : null}
      </nav>
    </>
  );
};
