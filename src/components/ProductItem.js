import React, { useState } from 'react';

export const ProductItem = (props) => {
  const [amount, setAmount] = useState('');

  const itemProfit = props.product.productPrice - props.product.capitalPrice;
  const parseAmount = parseInt(amount);

  const checkStock = () => {
    if (props.product.stock <= parseAmount) {
      return false;
    } else {
      return true;
    }
  };

  const productAddToCart = {
    id: props.lastId + 1,
    productId: props.product.id,
    barCode: props.product.barCode,
    productName: props.product.productName,
    productPrice: props.product.productPrice,
    capitalPrice: props.product.capitalPrice,
    amountItems: parseAmount,
    unit: props.product.unit,
    imgProduct: props.product.imgSource,
    itemProfit: itemProfit,
    transactionProfit: itemProfit * parseAmount,
    transactionTotalPriceItem: props.product.productPrice * parseAmount,
  };

  return (
    <li className='px-3 py-3 flex justify-center items-center'>
      <button
        type='button'
        className='h-16 w-16 p-1.5 mr-1.5 border-2 rounded hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#089EA3]'
        onClick={() => (!amount ? setAmount('1') : setAmount(parseAmount + 1))}
      >
        <img src={props.product.imgSource} alt={props.product.imgSource} />
      </button>
      <div className='flex-grow'>
        <div className='flex items-center'>
          <span className='flex-none font-medium text-lg sm:text-2xl text-[#009645]'>
            {props.product.productName}
          </span>
          <span className='text-right flex-grow'>
            Stock: {props.product.stock}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='flex-none font-bold text-[#009645] text-sm sm:text-lg'>
            {props.product.barCode}
          </span>
          <div>
            <input
              className='w-7 text-right rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              type='text'
              placeholder='0'
              maxLength={3}
              value={amount}
              onChange={(event) => {
                if (
                  event.target.value === '' ||
                  props.re.test(event.target.value)
                ) {
                  setAmount(event.target.value);
                }
              }}
            />
            <span> {props.product.unit}</span>
          </div>
        </div>
        <div className='leading-tight text-gray-700'>
          Price: {props.formatter.format(props.product.productPrice)}
        </div>
      </div>
      <button
        disabled={!amount || !checkStock()}
        onClick={() => {
          props.onBuyClicked(productAddToCart);
          setAmount('');
        }}
        type='button'
        className='h-14 w-14 p-1.5 ml-1.5 border-2 rounded-lg hover:opacity-70 bg-[#009645] text-white'
      >
        Add
      </button>
    </li>
  );
};
