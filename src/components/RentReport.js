import React, { useState } from 'react';
import { HiDocumentReport } from 'react-icons/hi';
import TableRent from './TableRent';

const RentReport = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <div className='bg-[#009645] text-white px-2 py-3 w-full text-left rounded-t-md font-normal'>
        <HiDocumentReport className='inline-block align-text-top' /> Rent
      </div>
      <div className='border-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4 print:hidden'>
        {/* <div className='flex flex-row sm:items-start sm:pt-5 space-x-2'>
          <input
            className='self-center'
            type='radio'
            id='dp'
            name='payment'
            value={paymentStatus}
            onChange={() => {
              setPaymentStatus(true);
            }}
          />
          <label
            className='block text-sm font-medium text-gray-700 sm:mt-px'
            htmlFor='dp'
          >
            Lunas
          </label>
          <input
            className='self-center'
            type='radio'
            id='payOf'
            name='payment'
            value={paymentStatus}
            onChange={() => {
              setPaymentStatus(false);
            }}
          />
          <label
            className='block text-sm font-medium text-gray-700 sm:mt-px'
            htmlFor='payOf'
          >
            Belum Lunas
          </label>
        </div> */}
        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5'>
          <label
            htmlFor='rentDate'
            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
          >
            RentDate
          </label>
          <div className='mt-1 sm:mt-0 sm:col-span-2'>
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              type='date'
              name='rentDate'
              id='rentDate'
              className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
            />
          </div>
        </div>
      </div>
      <TableRent date={date} />
    </div>
  );
};

export default RentReport;
