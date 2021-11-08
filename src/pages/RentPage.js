import React from 'react';
import { AddRent } from '../components/AddRent';
import RentReport from '../components/RentReport';

const RentPage = () => {
  return (
    <div className='overflow-x-hidden w-screen h-screen'>
      <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl space-y-2'>
        <AddRent />
        <RentReport />
      </div>
    </div>
  );
};

export default RentPage;
