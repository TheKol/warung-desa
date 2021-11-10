import React, { useState } from 'react';
import { RiBuildingLine } from 'react-icons/ri';
import { gql, useMutation } from '@apollo/client';
import RentInvoice from './RentInvoice';
import { useUser } from '../auth/useUser';

export const AddRent = () => {
  const re = /^[0-9\b]+$/;
  const clearData = {
    rentName: '',
    rentPrice: '',
    rentUserName: '',
    rentDownPayment: '',
    rentStatus: '',
    rentDate: '',
    rentStartTime: '',
    rentEndTime: '',
  };
  const { userName } = useUser();

  let [toggleRentInvoice, setToggleRentInvoice] = useState(false);
  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);

  const [inputAddRent, { data, loading, error }] = useMutation(ADD_RENT);

  const formSubmit = () => {
    const rentStatus =
      parseInt(formData.rentPrice) > parseInt(formData.rentDownPayment)
        ? false
        : true;
    const rentDate = formData.rentDate.concat(' ', formData.rentStartTime);
    const rentDateEnd = formData.rentDate.concat(' ', formData.rentEndTime);

    const RentInfo = {
      rentName: formData.rentName,
      rentPrice: parseInt(formData.rentPrice),
      rentUserName: formData.rentUserName,
      rentDownPayment: parseInt(formData.rentDownPayment),
      rentStatus: rentStatus,
      rentDate: rentDate,
      rentDateEnd: rentDateEnd,
      cashier: userName,
    };

    inputAddRent({ variables: { input: RentInfo } });
    setFormData(clearData);
    setToggleForm(false);
    setToggleRentInvoice(true);
  };

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  return (
    <div>
      {toggleRentInvoice && (
        <RentInvoice
          data={data.addRent}
          onClickedClosedButton={() => {
            setToggleRentInvoice(false);
            window.location.reload();
          }}
        />
      )}
      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
        className={`bg-[#009645] text-white px-2 py-3 w-full text-left rounded-t-md ${
          toggleForm ? 'rounded-t-md' : 'rounded-md'
        }`}
      >
        <div>
          <RiBuildingLine className='inline-block align-text-top' /> Add Rent
        </div>
      </button>
      {toggleForm && (
        <div className='border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4'>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentName'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Rent Name
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, rentName: e.target.value });
                }}
                value={formData.rentName}
                type='text'
                name='rentName'
                id='rentName'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentUserName'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Rent User
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, rentUserName: e.target.value });
                }}
                value={formData.rentUserName}
                type='text'
                name='rentUserName'
                id='rentUserName'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentPrice'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Rent Price
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setFormData({ ...formData, rentPrice: e.target.value });
                  }
                }}
                value={formData.rentPrice}
                type='text'
                name='rentPrice'
                id='rentPrice'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentDownPayment'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              DP
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setFormData({
                      ...formData,
                      rentDownPayment: e.target.value,
                    });
                  }
                }}
                value={formData.rentDownPayment}
                type='text'
                name='rentDownPayment'
                id='rentDownPayment'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentDate'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Rent Date
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, rentDate: e.target.value });
                }}
                value={formData.rentDate}
                type='date'
                name='rentDate'
                id='rentDate'
                className='w-40 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentTimeStart'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Time
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, rentStartTime: e.target.value });
                }}
                value={formData.rentStartTime}
                type='time'
                name='rentTimeStart'
                id='rentTimeStart'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='rentEndTime'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Rent End
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, rentEndTime: e.target.value });
                }}
                value={formData.rentEndTime}
                type='time'
                name='rentEndTime'
                id='rentEndTime'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>
          <div className='pt-5'>
            <div className='flex justify-end'>
              <button
                disabled={
                  !formData.rentName ||
                  !formData.rentUserName ||
                  !formData.rentPrice ||
                  !formData.rentDownPayment ||
                  !formData.rentDate ||
                  !formData.rentStartTime ||
                  !formData.rentEndTime
                }
                onClick={formSubmit}
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#009645] hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#089EA3]'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ADD_RENT = gql`
  mutation AddRentMutation($input: RentDataInput) {
    addRent(input: $input) {
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
