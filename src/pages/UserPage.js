import React from 'react';
import { AddUser } from '../components/AddUser';

const UserPage = () => {
  return (
    <div className='overflow-x-hidden w-screen h-screen'>
      <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl space-y-2'>
        <AddUser />
      </div>
    </div>
  );
};

export default UserPage;
