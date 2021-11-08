import React, { useState } from 'react';
import { VscOutput } from 'react-icons/vsc';
import { gql, useMutation } from '@apollo/client';
import ExpendInvoice from './ExpendInvoice';

export const AddExpend = () => {
  const re = /^[0-9\b]+$/;
  const wholeTypeExpend = ['Honorarium', 'Lain-lain'];

  const clearData = {
    expendName: '',
    expendValue: '',
    expendType: '',
    description: '',
  };

  let [expenseType, setExpensetype] = useState('Honorarium');
  let [toggleExpendInvoice, setToggleExpendInvoice] = useState(false);
  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);

  const [inputAddExpend, { data, loading, error }] = useMutation(ADD_EXPEND);

  const formSubmit = () => {
    const RentInfo = {
      expendName: formData.expendName,
      expendValue: parseInt(formData.expendValue),
      expendType: expenseType,
      description: formData.description,
    };

    inputAddExpend({ variables: { input: RentInfo } });
    setFormData(clearData);
    setToggleForm(false);
    setToggleExpendInvoice(true);
  };

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  return (
    <div className='print:hidden'>
      {toggleExpendInvoice && (
        <ExpendInvoice
          data={data.addExpend}
          onClickedClosedButton={() => {
            setToggleExpendInvoice(false);
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
          <VscOutput className='inline-block align-text-top' /> Add Expense
        </div>
      </button>
      {toggleForm && (
        <div className='border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4'>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='expendName'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Expense Name
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, expendName: e.target.value });
                }}
                value={formData.expendName}
                type='text'
                name='expendName'
                id='expendName'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='expendType'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Expense Type
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <select
                name='expendType'
                id='expendType'
                value={expenseType}
                onChange={(e) => {
                  setExpensetype(e.target.value);
                }}
              >
                {wholeTypeExpend.map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='expendValue'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Expense Amount
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setFormData({ ...formData, expendValue: e.target.value });
                  }
                }}
                value={formData.expendValue}
                type='text'
                name='expendValue'
                id='expendValue'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Description
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <textarea
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
                value={formData.description}
                name='description'
                id='description'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>
          <div className='pt-5'>
            <div className='flex justify-end'>
              <button
                disabled={
                  !formData.expendName ||
                  !formData.expendValue ||
                  !formData.description
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

const ADD_EXPEND = gql`
  mutation AddExpendMutation($input: ExpendDataInput) {
    addExpend(input: $input) {
      id
      expendName
      expendValue
      expendDate
      description
      expendType
    }
  }
`;
