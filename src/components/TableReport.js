import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { PrintInvoice } from './PrintInvoice';

const TableReport = ({ calculateMonth, calculateYear, month }) => {
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [idInvoice, setIdInvoice] = useState(null);

  const { loading: getSellingLoading, data: getSelling } = useQuery(
    GET_SELLING,
    {
      variables: {
        getOneSellingId: idInvoice,
      },
    }
  );

  const {
    loading,
    error,
    data: sellingsFiltered,
  } = useQuery(SELLINGS_FILTERED, {
    variables: {
      input: {
        month: calculateMonth,
        year: calculateYear,
      },
    },
  });

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  const reportQuery = sellingsFiltered.getFilteredSellings;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const totalReport = reportQuery
    .map((item) => item.total)
    .reduce((prev, curr) => prev + curr, 0);

  const formatDate = (date) => {
    return Intl.DateTimeFormat(['ban', 'id'], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  return (
    <>
      <div className='h-screen mt-10 w-full ml-4'>
        <h1 className='hidden print:block font-bold text-3xl mb-6'>
          Laporan Penjualan <br />
          Bulan {month} Tahun {calculateYear}
        </h1>

        <table className='border-2 table-auto '>
          <thead>
            <tr>
              <th className='border-2 px-2'>No</th>
              <th className='border-2 px-2'>Tanggal</th>
              <th className='border-2 px-2'>Transaction</th>
              <th className='border-2 px-2'>Pendapatan kotor</th>
            </tr>
          </thead>
          <tbody className='cursor-pointer'>
            {reportQuery.length !== 0
              ? reportQuery.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        setToggleInvoice(true);
                        setIdInvoice(row.id);
                      }}
                    >
                      <td className='border-2 px-2 text-right'>{index + 1}</td>

                      <td className='border-2 px-2'>{formatDate(row.date)}</td>
                      <td id={index} className='border-2 px-2'>
                        {row.id}
                      </td>
                      <td className='border-2 text-right px-2'>
                        {formatter.format(row.total)}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td className='text-right font-bold px-2'>TOTAL : </td>
              <td className='border-2 text-right px-2'>
                {formatter.format(totalReport)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {toggleInvoice ? (
        !getSellingLoading ? (
          <PrintInvoice
            invoice={getSelling.getOneSelling}
            onClickedClosedButton={() => {
              setToggleInvoice(false);
            }}
          />
        ) : null
      ) : null}
    </>
  );
};
const SELLINGS_FILTERED = gql`
  query Query($input: SellingsInput) {
    getFilteredSellings(input: $input) {
      id
      date
      cash
      casier
      change
      sellProduct {
        id
        productId
        amountItems
        barCode
        productName
        productPrice
        capitalPrice
        imgProduct
        unit
        itemProfit
        transactionProfit
        transactionTotalPriceItem
      }
      total
      totalItem
      totalProfit
      totalQty
    }
  }
`;

const GET_SELLING = gql`
  query Query($getOneSellingId: ID) {
    getOneSelling(id: $getOneSellingId) {
      id
      sellProduct {
        id
        productId
        amountItems
        barCode
        productName
        productPrice
        capitalPrice
        imgProduct
        unit
        itemProfit
        transactionProfit
        transactionTotalPriceItem
      }
      date
      cash
      casier
      change
      total
      totalItem
      totalProfit
      totalQty
    }
  }
`;

export default TableReport;
