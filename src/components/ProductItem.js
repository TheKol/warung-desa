import React, { useState } from 'react';

export const ProductItem = ({
  re,
  lastId,
  product,
  formatter,
  onBuyClicked,
}) => {
  const [amount, setAmount] = useState('');

  const parseAmount = parseInt(amount);
  const itemProfit = product.productPrice - product.capitalPrice;

  const checkStock = () => {
    if (product.stock < parseAmount) {
      return false;
    } else {
      return true;
    }
  };

  const productAddToCart = {
    id: lastId + 1,
    unit: product.unit,
    productId: product.id,
    itemProfit: itemProfit,
    amountItems: parseAmount,
    barCode: product.barCode,
    imgProduct: product.imgSource,
    productName: product.productName,
    productPrice: product.productPrice,
    capitalPrice: product.capitalPrice,
    transactionProfit: itemProfit * parseAmount,
    transactionTotalPriceItem: product.productPrice * parseAmount,
  };

  return (
    <li className='px-3 py-3 flex justify-center items-center'>
      <button
        type='button'
        className='flex justify-center items-center h-16 w-16 p-1.5 mr-1.5 border-2 rounded hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#089EA3]'
        onClick={() => (!amount ? setAmount('1') : setAmount(parseAmount + 1))}
      >
        <img src={product.imgSource} alt={product.imgSource} />
      </button>
      <div className='flex-grow'>
        <div className='flex items-center'>
          <span className='flex-none font-medium text-lg sm:text-2xl text-[#009645]'>
            {product.productName}
          </span>
          <span className='text-right flex-grow text-sm sm:text-base'>
            Stock: {product.stock}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='flex-none font-bold text-[#009645] text-sm sm:text-base'>
            {product.barCode}
          </span>
          <div>
            <input
              className='w-7 text-right rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              type='text'
              placeholder='0'
              maxLength={3}
              value={amount}
              onChange={(event) => {
                if (event.target.value === '' || re.test(event.target.value)) {
                  setAmount(event.target.value);
                }
              }}
            />
            <span className='text-sm sm:text-base'> {product.unit}</span>
          </div>
        </div>
        <div className='leading-tight text-gray-700 text-sm sm:text-base'>
          Price: {formatter.format(product.productPrice)}
        </div>
      </div>
      <button
        disabled={!amount || !checkStock()}
        onClick={() => {
          onBuyClicked(productAddToCart);
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
