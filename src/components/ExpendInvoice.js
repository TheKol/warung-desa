import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

const ExpendInvoice = ({ data, onClickedClosedButton }) => {
  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const formatExpendDate = new Intl.DateTimeFormat(['ban', 'id'], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(data.expendDate);

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className='absolute top-0 left-0 bg-opacity-70 w-screen h-full bg-black'>
      <div className='w-full h-full'>
        <div className='flex'>
          <div className='flex flex-col justify-center text-center ml-4 mt-4 border-2 w-52 p-2 bg-white'>
            <div className='border-b-2 border-dashed border-black mt-16 pb-2'>
              <h1 className='text-[12px]'>
                BUMDES HARTA SADESA
                <br />
                LC KATAPANG
              </h1>
              <p className='text-[11px]'>
                Jl. Katapang Kulon No 5, Kabupaten Bandung
                <br />
                082116005095
              </p>
            </div>
            <div className='flex flex-col pb-2 border-b-2 border-dashed border-black py-2 w-full'>
              <div className='flex self-start'>
                <p className='text-[11px]'>Tanggal&emsp;&emsp;&emsp;:</p>
                <p className='flex-grow text-[11px] text-right'>
                  &emsp;{formatExpendDate}
                </p>
              </div>
            </div>
            <ul className='flex flex-col border-b-2 border-dashed border-black py-2 w-full'>
              <li className='flex items-center' key={1}>
                <p className='flex-none text-[11px]'>{data.expendName}</p>
                <span className='flex-grow text-[11px] text-right'>
                  {formatter.format(data.expendValue)}
                </span>
              </li>
            </ul>
            <div className='flex flex-col border-b-2 border-dashed border-black py-2 w-full'>
              <div className='flex items-center'>
                <p className='flex-none text-[11px]'>Total Expense</p>
                <span className='flex-grow text-[11px] text-right'>
                  {formatter.format(data.expendValue)}
                </span>
              </div>
              <div className='flex flex-col justify-center mt-4'>
                <p className='text-[11px]'>Expense Number</p>
                <p className='text-[11px]'>{data.id}</p>
              </div>
            </div>
            <div className='flex flex-col pt-2 w-full'>
              <div className='flex flex-col justify-center'>
                <p className='text-[11px]'>PENGELUARAN</p>
                <p className='text-[11px]'>{data.expendType}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white ml-4 mt-4 w-52 p-2 flex justify-between print:hidden'>
          <button
            onClick={printReceipt}
            className='relative w-32 h-16 border-2 rounded-lg text-xl hover:opacity-70 bg-[#009645] text-white self-center'
          >
            Print
          </button>
          <button className='' onClick={onClickedClosedButton}>
            <RiCloseLine className='text-5xl text-[#009645]' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpendInvoice;
