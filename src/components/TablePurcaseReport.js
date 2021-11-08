import { gql, useQuery } from '@apollo/client';
import React from 'react';

const TablePurcaseReport = ({ calculateMonth, calculateYear, month }) => {
  const {
    loading,
    error,
    data: purcaseFiltered,
  } = useQuery(PURCASE_FILTERED, {
    variables: {
      input: {
        month: calculateMonth,
        year: calculateYear,
      },
    },
  });

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  const reportQuery = purcaseFiltered.getFilteredPurcase;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const totalReport = reportQuery
    .map((item) => item.capitalPrice * item.stock)
    .reduce((prev, curr) => prev + curr, 0);

  const formatDate = (date) => {
    return Intl.DateTimeFormat(['ban', 'id'], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  return (
    <div className='h-screen mt-10 w-full ml-4'>
      <h1 className='hidden print:block font-bold text-3xl mb-6'>
        Laporan Pembelian
        <br />
        Bulan {month} Tahun {calculateYear}
      </h1>
      <table className='border-2 table-auto '>
        <thead>
          <tr>
            <th className='border-2 px-2'>No</th>
            <th className='border-2 px-2'>Tanggal Pembelian</th>
            <th className='border-2 px-2'>No Pembelian</th>
            <th className='border-2 px-2'>Nama Barang</th>
            <th className='border-2 px-2'>Kuantitas</th>
            <th className='border-2 px-2'>Biaya Pembelian</th>
          </tr>
        </thead>
        <tbody>
          {reportQuery.length !== 0
            ? reportQuery.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className='border-2 px-2 text-right'>{index + 1}</td>

                    <td className='border-2 px-2'>
                      {formatDate(row.purcaseDate)}
                    </td>
                    <td className='border-2 px-2'>{row.id}</td>
                    <td id={index} className='border-2 px-2'>
                      {row.productName}
                    </td>
                    <td className='border-2 text-right px-2'>
                      {row.stock} {row.unit}
                    </td>
                    <td className='border-2 text-right px-2'>
                      {formatter.format(row.capitalPrice * row.stock)}
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
  );
};
const PURCASE_FILTERED = gql`
  query Query($input: PurcaseReportInput) {
    getFilteredPurcase(input: $input) {
      id
      barCode
      productName
      productPrice
      capitalPrice
      stock
      unit
      purcaseDate
      imgSource
    }
  }
`;

export default TablePurcaseReport;
