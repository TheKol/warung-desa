import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import RentInvoice from './RentInvoice';

const TableRentReport = ({ calculateMonth, calculateYear, month }) => {
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [idInvoice, setIdInvoice] = useState(null);

  const { loading: getRentLOading, data: getRent } = useQuery(GET_RENT, {
    variables: {
      getOneRentId: idInvoice,
    },
  });

  const {
    loading,
    error,
    data: rentFiltered,
  } = useQuery(RENT_FILTERED, {
    variables: {
      input: {
        month: calculateMonth,
        year: calculateYear,
      },
    },
  });

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  const reportQuery = rentFiltered.getFilteredRentReport2;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const totalReport = reportQuery
    .map((item) => item.rentDownPayment)
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
          Laporan Pendapatan Sewa
          <br />
          Bulan {month} Tahun {calculateYear}
        </h1>
        <table className='border-2 table-auto '>
          <thead>
            <tr>
              <th className='border-2 px-2'>No</th>
              <th className='border-2 px-2'>Tanggal Sewa</th>
              <th className='border-2 px-2'>No Sewa</th>
              <th className='border-2 px-2'>Nama Sewa</th>
              <th className='border-2 px-2'>Biaya Sewa</th>
              <th className='border-2 px-2'>Pembayaran</th>
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

                      <td className='border-2 px-2'>
                        {formatDate(row.rentDate)}
                      </td>
                      <td className='border-2 px-2'>{row.id}</td>
                      <td id={index} className='border-2 px-2'>
                        {row.rentName}
                      </td>
                      <td className='border-2 text-right px-2'>
                        {formatter.format(row.rentPrice)}
                      </td>
                      <td className='border-2 text-right px-2'>
                        {formatter.format(row.rentDownPayment)}
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
              <td></td>
              <td></td>
              <td className='text-right font-bold px-2'>TOTAL BIAYA : </td>
              <td className='border-2 text-right px-2'>
                {formatter.format(totalReport)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {toggleInvoice ? (
        !getRentLOading ? (
          <RentInvoice
            data={getRent.getOneRent}
            onClickedClosedButton={() => {
              setToggleInvoice(false);
            }}
          />
        ) : null
      ) : null}
    </>
  );
};
const RENT_FILTERED = gql`
  query Query($input: RentReportInput2) {
    getFilteredRentReport2(input: $input) {
      id
      rentName
      rentPrice
      rentUserName
      rentDownPayment
      rentStatus
      bookingDate
      rentDate
      rentDateEnd
    }
  }
`;

const GET_RENT = gql`
  query Query($getOneRentId: ID) {
    getOneRent(id: $getOneRentId) {
      id
      rentName
      rentPrice
      rentUserName
      rentDownPayment
      rentStatus
      bookingDate
      rentDate
      rentDateEnd
    }
  }
`;

export default TableRentReport;
