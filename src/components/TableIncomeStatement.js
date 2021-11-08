import React from 'react';
import { gql, useQuery } from '@apollo/client';

const TableIncomeStatement = ({ calculateMonth, calculateYear, month }) => {
  const tax = 1.5;
  const {
    loading: allReportDataLoading,
    error: allReportDataError,
    data: allReportData,
  } = useQuery(GET_ALL_REPORT, {
    variables: {
      input: {
        month: calculateMonth,
        year: calculateYear,
      },
      getFilteredRentReport2Input2: {
        month: calculateMonth,
        year: calculateYear,
      },
      getFilteredExpend2Input2: {
        month: calculateMonth,
        year: calculateYear,
      },
      getFilteredPurcaseInput2: {
        month: calculateMonth,
        year: calculateYear,
      },
    },
  });

  if (allReportDataLoading) return null;
  if (allReportDataError) return 'Error Data yang dicari tidak ada!!';

  const sellingData = allReportData.getFilteredSellings;
  const rentData = allReportData.getFilteredRentReport2;
  const expendData = allReportData.getFilteredExpend2;
  const purcaseData = allReportData.getFilteredPurcase;

  const totalSelling = sellingData
    .map((item) => item.total)
    .reduce((prev, curr) => prev + curr, 0);

  const totalRent = rentData
    .map((item) => item.rentDownPayment)
    .reduce((prev, curr) => prev + curr, 0);

  const totalExpend = expendData
    .map((item) => item.expendValue)
    .reduce((prev, curr) => prev + curr, 0);

  const totalPurcase = purcaseData
    .map((item) => item.capitalPrice * item.stock)
    .reduce((prev, curr) => prev + curr, 0);

  const grossIncome = totalSelling + totalRent;
  const totalTax = (grossIncome / 100) * tax;
  const netIncome = grossIncome - totalPurcase - totalTax;
  const incomeStatement = netIncome - totalExpend;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  console.log(
    `total selling : ${formatter.format(
      totalSelling
    )}, rent : ${totalRent}, expense : ${totalExpend}, purcase : ${totalPurcase}`
  );

  return (
    <div className='overflow-x-hidden w-screen my-8'>
      <div className='container flex flex-col mx-auto mt-3 space-y-4 max-w-6xl'>
        <div className='flex flex-row text-center self-center'>
          <div>
            <img
              className='w-24 h-32'
              src='./images/logo-bumdes.png'
              alt='Logo Bumdes'
            />
          </div>
          <div className='self-center px-8'>
            <h1 className='text-4xl font-bold'>BUMDESA HARTA SADESA</h1>
            <h2 className='text-2xl font-semibold'>LAPORAN LABA RUGI</h2>
            <p>
              PERIODE: {month.toUpperCase()} {calculateYear}
            </p>
          </div>
        </div>
        <table className='border-2 table-auto w-[720px] self-center'>
          <thead>
            <tr>
              <th className='text-center' colSpan='3'>
                PENDAPATAN
              </th>
            </tr>
          </thead>
          <thead>
            <tr className='bg-gray-400'>
              <th className='border-2 px-2 w-4'>A.</th>
              <th className='border-2 px-2 text-left' colSpan='2'>
                PENDAPATAN PENJUALAN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-2 text-right'>1</td>
              <td className='border-2 px-2'>Barang-Barang</td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalSelling)}
              </td>
            </tr>
            <tr>
              <td className='border-2 text-right pr-2' colSpan='2'>
                TOTAL :
              </td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalSelling)}
              </td>
            </tr>
          </tbody>
          <thead>
            <tr className='bg-gray-400'>
              <th className='border-2 px-2 w-4'>B.</th>
              <th className='border-2 px-2 text-left' colSpan='2'>
                PENDAPATAN SEWA DAN JASA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-2 text-right'>1</td>
              <td className='border-2 px-2'>Jasa Sewa</td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalRent)}
              </td>
            </tr>
            <tr>
              <td className='border-2 text-right pr-2' colSpan='2'>
                TOTAL :
              </td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalRent)}
              </td>
            </tr>
          </tbody>
          <thead>
            <tr className='bg-gray-400'>
              <th className='border-2 px-2 w-4'>C.</th>
              <th className='border-2 px-2 text-left' colSpan='2'>
                TOTAL JUMLAH PENDAPATAN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-2 px-2' colSpan='2'></td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(grossIncome)}
              </td>
            </tr>
          </tbody>
          <thead>
            <tr className='bg-gray-400'>
              <th className='border-2 px-2 w-4'>D.</th>
              <th className='border-2 px-2 text-left' colSpan='2'>
                BIAYA-BIAYA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-2 text-right'>1</td>
              <td className='border-2 px-2'>Pembelian Stock Barang Dagangan</td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalPurcase)}
              </td>
            </tr>
            <tr>
              <td className='border-2 text-right'>2</td>
              <td className='border-2 px-2'>
                Biaya Administrasi dan Operasional
              </td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalExpend)}
              </td>
            </tr>
            <tr>
              <td className='border-2 text-right'>3</td>
              <td className='border-2 px-2'>Pajak</td>
              <td className='border-2 px-2 text-right'>{tax} %</td>
            </tr>
            <tr>
              <td className='border-2 text-right'>4</td>
              <td className='border-2 px-2'>Total Pajak</td>
              <td className='border-2 px-2 text-right'>
                {formatter.format(totalTax)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className='text-center px-2 border-2' colSpan='2'>
                LABA KOTOR - PEMBELIAN - PAJAK
              </td>
              <td className='border-2 text-right px-2'>
                {formatter.format(netIncome)}
              </td>
            </tr>
            <tr>
              <td className='text-center font-bold border-2 px-2' colSpan='2'>
                LABA / RUGI
              </td>
              <td className='border-2 text-right px-2'>
                {formatter.format(incomeStatement)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TableIncomeStatement;

const GET_ALL_REPORT = gql`
  query Query(
    $input: SellingsInput
    $getFilteredRentReport2Input2: RentReportInput2
    $getFilteredExpend2Input2: ExpendReportInput2
    $getFilteredPurcaseInput2: PurcaseReportInput
  ) {
    getFilteredSellings(input: $input) {
      total
    }
    getFilteredRentReport2(input: $getFilteredRentReport2Input2) {
      rentDownPayment
    }
    getFilteredExpend2(input: $getFilteredExpend2Input2) {
      expendValue
    }
    getFilteredPurcase(input: $getFilteredPurcaseInput2) {
      capitalPrice
      stock
      stock
    }
  }
`;
