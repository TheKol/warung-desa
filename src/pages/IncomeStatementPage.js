import React, { useState } from 'react';
import TableIncomeStatement from '../components/TableIncomeStatement';
import { HiDocumentReport } from 'react-icons/hi';

const IncomeStatementPage = () => {
  const re = /^[0-9\b]+$/;
  const wholeMonth = [
    'Januari',
    'February',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const dateNow = new Date();
  const indexMonth = dateNow.getMonth();
  const [month, setMonth] = useState(wholeMonth[indexMonth]);
  const [year, setYear] = useState(dateNow.getFullYear());

  const calculateMonth = wholeMonth.indexOf(month);
  const calculateYear = parseInt(year);

  return (
    <div className='overflow-x-hidden w-screen'>
      <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl'>
        <div className='bg-[#009645] text-white px-2 py-3 w-full text-left rounded-t-md font-normal print:hidden'>
          <HiDocumentReport className='inline-block align-text-top' /> Laporan
          Laba Rugi
        </div>
        <div className='border-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4 print:hidden'>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              htmlFor='month'
            >
              Pilih Bulan:{' '}
            </label>
            <select
              name='month'
              id='month'
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            >
              {wholeMonth.map((month, index) => {
                return (
                  <option key={index} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='productName'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Tahun
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setYear(e.target.value);
                  }
                }}
                maxLength={4}
                placeholder='Masukan Tahun'
                value={year}
                type='text'
                name='productName'
                id='productName'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>
        </div>
      </div>
      <TableIncomeStatement
        calculateMonth={calculateMonth}
        calculateYear={calculateYear}
        month={month}
      />
    </div>
  );
};

export default IncomeStatementPage;
