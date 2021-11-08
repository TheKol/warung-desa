import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import RentInvoice from './RentInvoice';

const TableRent = ({ date }) => {
  const [toggleInvoice, setToggleInvoice] = useState(false);
  const [idInvoice, setIdInvoice] = useState(null);

  const dt = new Date(date);

  const { loading: getRentLoading, data: getRent } = useQuery(GET_RENT, {
    variables: {
      getOneRentId: idInvoice,
    },
  });

  const {
    loading,
    error,
    data: rentReport,
  } = useQuery(RENT_REPORT, {
    variables: {
      input: {
        month: dt.getMonth(),
        year: dt.getFullYear(),
        day: dt.getDate(),
      },
    },
  });

  const [updatestatusRent] = useMutation(UPDATE_RENT_STATUS, {
    refetchQueries: [RENT_REPORT, 'getAllProducts'],
  });

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  const rentReportQuery = rentReport.getFilteredRentReport;
  const formatDate = (date) => {
    return Intl.DateTimeFormat(['ban', 'id'], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const updateStatusPayment = (payment) => {
    if (!getRentLoading) {
      const rentData = getRent.getOneRent;
      console.log('data dp : ', rentData.rentDownPayment);
      const newPayment = parseInt(payment) + rentData.rentDownPayment;
      console.log('new payment : ', newPayment);
      if (newPayment === rentData.rentPrice) {
        updatestatusRent({
          variables: {
            input: {
              id: rentData.id,
              rentStatus: true,
              rentDownPayment: newPayment,
            },
          },
        });
      } else
        updatestatusRent({
          variables: {
            input: {
              id: rentData.id,
              rentStatus: false,
              rentDownPayment: newPayment,
            },
          },
        });
    }
  };

  return (
    <>
      <div className='h-screen mt-10 w-full ml-4'>
        <h1 className='hidden print:block font-bold text-3xl mb-6'>
          Ini Judul Laporan
        </h1>

        <table className='border-2 table-auto '>
          <thead>
            <tr>
              <th className='border-2 px-2'>No</th>
              <th className='border-2 px-2'>Rent ID</th>
              <th className='border-2 px-2'>Rent Date</th>
              <th className='border-2 px-2'>End Date</th>
              <th className='border-2 px-2'>Rent</th>
              <th className='border-2 px-2'>User</th>
              <th className='border-2 px-2'>Rent Price</th>
              <th className='border-2 px-2'>Payment</th>
              <th className='border-2 px-2'>Pay OF</th>
            </tr>
          </thead>
          <tbody className='cursor-pointer'>
            {rentReportQuery.length !== 0
              ? rentReportQuery.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        setToggleInvoice(true);
                        setIdInvoice(row.id);
                      }}
                    >
                      <td className='border-2 px-2 text-right'>{index + 1}</td>
                      <td id={index} className='border-2 px-2'>
                        {row.id}
                      </td>
                      <td className='border-2 px-2'>
                        {formatDate(row.rentDate)}
                      </td>
                      <td className='border-2 px-2'>
                        {formatDate(row.rentDateEnd)}
                      </td>
                      <td className='border-2 px-2'>{row.rentName}</td>
                      <td className='border-2 px-2'>{row.rentUserName}</td>
                      <td className='border-2 px-2'>
                        {formatter.format(row.rentPrice)}
                      </td>
                      <td className='border-2 px-2'>
                        {formatter.format(row.rentDownPayment)}
                      </td>
                      <td className='border-2 px-2'>
                        {row.rentStatus.toString()}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      {toggleInvoice ? (
        !getRentLoading ? (
          <RentInvoice
            data={getRent.getOneRent}
            updatePayment={(payment) => {
              updateStatusPayment(payment);
            }}
            onClickedClosedButton={() => {
              setToggleInvoice(false);
            }}
          />
        ) : null
      ) : null}
    </>
  );
};
export default TableRent;

const RENT_REPORT = gql`
  query Query($input: RentReportInput) {
    getFilteredRentReport(input: $input) {
      id
      rentName
      rentPrice
      rentUserName
      rentDownPayment
      rentStatus
      bookingDate
      rentDate
      rentDateEnd
      cashier
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
      cashier
    }
  }
`;

const UPDATE_RENT_STATUS = gql`
  mutation Mutation($input: Status) {
    updateStatusRent(input: $input) {
      id
    }
  }
`;
