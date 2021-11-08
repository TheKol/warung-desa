import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import ExpendInvoice from './ExpendInvoice';

const TableExpendReport = ({
  expenseType,
  calculateMonth,
  calculateYear,
  month,
}) => {
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [idInvoice, setIdInvoice] = useState(null);

  const { loading: getExpendLOading, data: getExpend } = useQuery(GET_EXPEND, {
    variables: {
      getOneExpendId: idInvoice,
    },
  });

  const {
    loading,
    error,
    data: expendFiltered,
  } = useQuery(EXPEND_FILTERED, {
    variables: {
      input: {
        month: calculateMonth,
        year: calculateYear,
        expendType: expenseType,
      },
    },
  });

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  const reportQuery = expendFiltered.getFilteredExpend;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const totalReport = reportQuery
    .map((item) => item.expendValue)
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
          Laporan Pengeluaran {expenseType}
          <br />
          Bulan {month} Tahun {calculateYear}
        </h1>
        <table className='border-2 table-auto '>
          <thead>
            <tr>
              <th className='border-2 px-2'>No</th>
              <th className='border-2 px-2'>Tanggal</th>
              <th className='border-2 px-2'>Pengeluaran</th>
              <th className='border-2 px-2'>Biaya</th>
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
                        {formatDate(row.expendDate)}
                      </td>
                      <td id={index} className='border-2 px-2'>
                        {row.expendName}
                      </td>
                      <td className='border-2 text-right px-2'>
                        {formatter.format(row.expendValue)}
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
              <td className='text-right font-bold px-2'>TOTAL BIAYA : </td>
              <td className='border-2 text-right px-2'>
                {formatter.format(totalReport)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {toggleInvoice ? (
        !getExpendLOading ? (
          <ExpendInvoice
            data={getExpend.getOneExpend}
            onClickedClosedButton={() => {
              setToggleInvoice(false);
            }}
          />
        ) : null
      ) : null}
    </>
  );
};
const EXPEND_FILTERED = gql`
  query Query($input: ExpendReportInput) {
    getFilteredExpend(input: $input) {
      id
      expendName
      expendValue
      expendDate
      expendType
      description
    }
  }
`;

const GET_EXPEND = gql`
  query Query($getOneExpendId: ID) {
    getOneExpend(id: $getOneExpendId) {
      id
      expendName
      expendValue
      expendDate
      expendType
      description
    }
  }
`;

export default TableExpendReport;
