import React, { useState, useEffect, useCallback } from 'react';

export const PrintInvoice = () => {
  let [invoice, setInvoice] = useState([]);

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const fetchInvoice = useCallback(() => {
    fetch('./invoice.json')
      .then((response) => response.json())
      .then((data) => {
        setInvoice(data);
      });
  }, []);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const transactionDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(invoice.date);

  console.log(invoice);

  return (
    <div className='flex flex-col justify-center text-center ml-4 mt-4 border-2 w-52 p-2'>
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
          <p className='text-[11px]'>Kasir&emsp;&emsp;&emsp;&emsp; :</p>
          <p className='flex-grow text-[11px] text-right'>
            &emsp;{invoice.casier}
          </p>
        </div>
        <div className='flex self-start'>
          <p className='text-[11px]'>Tipe pesanan&ensp;:</p>
          <p className='flex-grow text-[11px] text-right'>&emsp;FAST</p>
        </div>
      </div>
      <ul className='flex flex-col border-b-2 border-dashed border-black py-2 w-full'>
        {invoice.sellProduct &&
          invoice.sellProduct.map((item) => (
            <li className='flex items-center' key={item.id}>
              <p className='flex-none text-[11px]'>
                {item.amountItems} {item.productName}
              </p>
              <span className='flex-grow text-[11px] text-right'>
                {formatter.format(item.transactionTotalPriceItem)}
              </span>
            </li>
          ))}
      </ul>
      <div className='flex flex-col border-b-2 border-dashed border-black py-2 w-full'>
        <div className='flex items-center'>
          <p className='flex-none text-[11px]'>Subtotal</p>
          <span className='flex-grow text-[11px] text-right'>
            {formatter.format(invoice.total)}
          </span>
        </div>
        <div className='flex items-center'>
          <p className='flex-none text-[11px] text-left'>
            item = {invoice.totalItem} - Qty = {invoice.totalQty}
            <br />
            Total
          </p>
          <span className='flex-grow text-[11px] text-right self-end'>
            {formatter.format(invoice.total)}
          </span>
        </div>
        <div className='flex items-center'>
          <p className='flex-none text-[11px]'>Cash</p>
          <span className='flex-grow text-[11px] text-right'>
            {formatter.format(invoice.cash)}
          </span>
        </div>
        <div className='flex items-center'>
          <p className='flex-none text-[11px]'>Kembali</p>
          <span className='flex-grow text-[11px] text-right'>
            {formatter.format(invoice.change)}
          </span>
        </div>
        <div className='flex justify-center mt-4'>
          <p className='text-[11px]'>Nomor pesanan&emsp;:</p>
          <p className='text-[11px]'>&emsp;{invoice.id}</p>
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
  );
};
