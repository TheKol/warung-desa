import React from 'react';
import { AddExpend } from '../components/AddExpend';
import ExpendReport from '../components/ExpendReport';

const ExpendPage = () => {
  return (
    <div className='overflow-x-hidden w-screen h-screen'>
      <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl space-y-2'>
        <AddExpend />
        <ExpendReport />
      </div>
    </div>
  );
};

export default ExpendPage;
