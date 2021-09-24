import React, { useState } from 'react';
import { FaWarehouse } from 'react-icons/fa';

export const AddProductStock = ({ onClickAddProduct, lastId }) => {
  const clearData = {
    productName: '',
    barCode: '',
    productPrice: '',
    capitalPrice: '',
    amount: '',
    unit: '',
    imgSource: '',
  };

  let [toggleForm, setToggleForm] = useState(false);
  let [selectedFile, setSelectedFile] = useState('');
  let [formData, setFormData] = useState(clearData);

  const formSubmit = () => {
    const imgUrl = `./images/${selectedFile.name}`;
    const ProductInfo = {
      id: String(lastId + 1),
      productName: formData.productName,
      barCode: formData.barCode,
      productPrice: parseInt(formData.productPrice),
      capitalPrice: parseInt(formData.capitalPrice),
      stock: parseInt(formData.amount),
      unit: formData.unit,
      purcaseDate: Date.now(),
      imgSource: imgUrl,
    };
    onClickAddProduct(ProductInfo);
    setFormData(clearData);
    setToggleForm(!toggleForm);
  };

  return (
    <div>
      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
        className={`bg-[#009645] text-white px-2 py-3 w-full text-left rounded-t-md ${
          toggleForm ? 'rounded-t-md' : 'rounded-md'
        }`}
      >
        <div>
          <FaWarehouse className='inline-block align-text-top' /> Add Product
          Stock
        </div>
      </button>
      {toggleForm && (
        <div className='border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4'>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='productName'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Product Name
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, productName: e.target.value });
                }}
                value={formData.productName}
                type='text'
                name='productName'
                id='productName'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='barCode'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Bar Code
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, barCode: e.target.value });
                }}
                value={formData.barCode}
                type='text'
                name='barCode'
                id='barCode'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='productPrice'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Product Price
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, productPrice: e.target.value });
                }}
                value={formData.productPrice}
                type='text'
                name='productPrice'
                id='productPrice'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='capitalPrice'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Capital Price
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, capitalPrice: e.target.value });
                }}
                value={formData.capitalPrice}
                type='text'
                name='capitalPrice'
                id='capitalPrice'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='amount'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Amount
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, amount: e.target.value });
                }}
                value={formData.amount}
                type='text'
                name='amount'
                id='amount'
                className='w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='unit'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Unit
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, unit: e.target.value });
                }}
                value={formData.unit}
                type='text'
                name='unit'
                id='unit'
                className='w-40 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              />
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
            <label
              htmlFor='imgSource'
              className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
            >
              Upload Product Image
            </label>
            <div className='mt-1 sm:mt-0 sm:col-span-2'>
              <input
                type='file'
                name='imgSource'
                id='imgSource'
                accept='.png, .jpg, .jpeg'
                className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className='pt-5'>
            <div className='flex justify-end'>
              <button
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
