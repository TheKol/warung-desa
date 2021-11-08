import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const RentInvoice = ({ data, updatePayment, onClickedClosedButton }) => {
  const [payment, setPayment] = useState('');

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const transactionDate = new Intl.DateTimeFormat(['ban', 'id'], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(data.bookingDate);

  const startRent = new Intl.DateTimeFormat(['ban', 'id'], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(data.rentDate);

  const endRent = new Intl.DateTimeFormat(['ban', 'id'], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(data.rentDateEnd);

  const printReceipt = () => {
    window.print();
  };

  const paymentCheck = () => {
    if (parseInt(payment) + data.rentDownPayment > data.rentPrice) {
      return false;
    } else return true;
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
                  &emsp;{transactionDate}
                </p>
              </div>
              <div className='flex self-start'>
                <p className='text-[11px]'>Mulai&emsp;&emsp;&emsp;&emsp;:</p>
                <p className='flex-grow text-[11px] text-right'>
                  &emsp;{startRent}
                </p>
              </div>
              <div className='flex self-start'>
                <p className='text-[11px]'>
                  Berakhir&emsp;&ensp;&ensp;&ensp;&thinsp;&thinsp;:
                </p>
                <p className='flex-grow text-[11px] text-right'>
                  &emsp;{endRent}
                </p>
              </div>
              <div className='flex self-start'>
                <p className='text-[11px]'>Kasir&emsp;&emsp;&emsp;&emsp; :</p>
                <p className='flex-grow text-[11px] text-right'>
                  &emsp;{data.cashier}
                </p>
              </div>
            </div>
            <ul className='flex flex-col border-b-2 border-dashed border-black py-2 w-full'>
              <li className='flex items-center' key={1}>
                <p className='flex-none text-[11px]'>{data.rentName}</p>
                <span className='flex-grow text-[11px] text-right'>
                  {formatter.format(data.rentPrice)}
                </span>
              </li>
            </ul>
            <div className='flex flex-col border-b-2 border-dashed border-black py-2 w-full'>
              <div className='flex items-center'>
                <p className='flex-none text-[11px]'>Down Payment</p>
                <span className='flex-grow text-[11px] text-right'>
                  {formatter.format(data.rentDownPayment)}
                </span>
              </div>
              <div className='flex items-center'>
                <p className='flex-none text-[11px]'>Remaining Pay</p>
                <span className='flex-grow text-[11px] text-right'>
                  {formatter.format(data.rentPrice - data.rentDownPayment)}
                </span>
              </div>
              <div className='flex flex-col justify-center mt-4'>
                <p className='text-[11px]'>Nomor pesanan</p>
                <p className='text-[11px]'>{data.id}</p>
              </div>
            </div>
            <div className='flex flex-col pt-2 w-full'>
              <div className='flex flex-col justify-center'>
                <p className='text-[11px]'>TERIMA KASIH</p>
                <p className='text-[11px]'>
                  Kami tunggu kedatangannya
                  <br />
                  kembali
                </p>
              </div>
            </div>
          </div>
        </div>
        {updatePayment ? (
          !data.rentStatus ? (
            <div className='bg-white ml-4 mt-4 w-52 p-2 flex justify-between print:hidden'>
              <div className='flex flex-col sm:items-start justify-center'>
                <label
                  htmlFor='payment'
                  className='block text-sm font-medium text-gray-700 sm:mt-px'
                >
                  Payment :
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <input
                    onChange={(e) => {
                      setPayment(e.target.value);
                    }}
                    value={payment}
                    type='text'
                    name='payment'
                    id='payment'
                    className='w-24 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
                  />
                </div>
              </div>
              <button
                disabled={!payment || !paymentCheck()}
                onClick={() => {
                  updatePayment(payment);
                }}
                className='relative w-20 h-14 border-2 rounded-lg text-xl hover:opacity-70 bg-[#009645] text-white self-center'
              >
                Pay
              </button>
            </div>
          ) : null
        ) : null}{' '}
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

export default RentInvoice;
