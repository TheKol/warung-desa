import { RiCloseLine } from 'react-icons/ri';
import React from 'react';

export const ProductInCart = ({
  cartItems,
  formatter,
  onDeleteProductInCart,
}) => {
  return (
    <li className='px-3 py-3 flex justify-center items-center'>
      <button
        type='button'
        className='h-16 w-16 p-1.5 mr-1.5 border-2 rounded hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#089EA3]'
      >
        <img src={cartItems.imgProduct} alt='indomie' />
      </button>
      <div className='flex-grow'>
        <div className='flex items-center'>
          <span className='flex-none font-medium text-lg sm:text-2xl text-[#009645]'>
            {cartItems.productName}
          </span>
          <span className='text-right flex-grow'>
            Jumlah item: {cartItems.amountItems} {cartItems.unit}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='flex-none font-bold text-[#009645] text-sm sm:text-lg'>
            {cartItems.barCode}
          </span>
          <div>
            <span>{formatter.format(cartItems.transactionTotalPriceItem)}</span>
          </div>
        </div>
        <div className='leading-tight text-gray-700'>
          Price: {formatter.format(cartItems.productPrice)}
        </div>
      </div>
      <button
        onClick={() => onDeleteProductInCart(cartItems)}
        type='button'
        className='flex justify-center items-center h-14 w-14 p-1.5 ml-1.5 border-2 rounded-lg hover:opacity-70 bg-[#009645] text-white'
      >
        <RiCloseLine className='text-5xl text-white' />
      </button>
    </li>
  );
};
