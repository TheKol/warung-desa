import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useUser } from '../auth/useUser';
import { ProductInCart } from './ProductInCart';

export const PopCart = ({
  re,
  formatter,
  productInCart,
  onCheckOutClick,
  setProductInCart,
  onClickToggleCart,
  onDeleteProductInCart,
}) => {
  const [cash, setCash] = useState('');
  const { userName } = useUser();

  const totalItems = productInCart.reduce(
    (total, item) => (total = total + item.amountItems),
    0
  );

  const totalTransaction = productInCart.reduce(
    (total, item) => (total = total + item.transactionTotalPriceItem),
    0
  );

  const totalProfit = productInCart.reduce(
    (total, item) => (total = total + item.transactionProfit),
    0
  );

  const printInvoice = {
    totalQty: totalItems,
    totalItem: productInCart.length,
    total: totalTransaction,
    cash: parseInt(cash),
    change: cash - totalTransaction,
    casier: userName,
    totalProfit: totalProfit,
    sellProduct: [...productInCart],
  };

  return (
    <div className='absolute top-0 left-0 bg-opacity-70 w-screen h-[100%] bg-black'>
      <div className='w-full h-full'>
        <div className='flex justify-center items-center h-screen'>
          <div className='relative flex flex-col w-[50rem] sm:h-[35rem] h-[640px] sm:rounded-lg bg-white'>
            <button
              className='absolute top-2 right-2'
              onClick={onClickToggleCart}
            >
              <RiCloseLine className='text-5xl text-[#009645]' />
            </button>
            <div className='flex flex-row items-center self-center mt-10'>
              <div className='w-20 h-20 border-2 rounded-lg bg-[#009645] text-white'>
                <img src='./images/keranjang.png' alt='cart' />
              </div>
              <span className='text-6xl'>Cart</span>
            </div>
            <div className='overflow-scroll overflow-x-hidden'>
              <ul className='divide-y divide-gray-200'>
                {productInCart.map((cartItems) => (
                  <ProductInCart
                    key={cartItems.id}
                    formatter={formatter}
                    cartItems={cartItems}
                    onDeleteProductInCart={onDeleteProductInCart}
                  />
                ))}
              </ul>
            </div>
            <div className='self-end mr-10'>
              <span className='text-right text-xl'>
                Total: {formatter.format(printInvoice.total)}
              </span>
            </div>
            <div className='flex mx-10'>
              <div className=''>
                <span className='text-xl'>cash: </span>
                <input
                  type='text'
                  className='text-xl w-32 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
                  value={cash}
                  placeholder='0'
                  onChange={(event) => {
                    if (
                      event.target.value === '' ||
                      re.test(event.target.value)
                    ) {
                      setCash(event.target.value);
                    }
                  }}
                />
              </div>
              <span className='text-xl flex-grow text-right'>
                cash: {formatter.format(cash)}
              </span>
            </div>
            <div className='self-end mr-10'>
              <span className='text-right text-xl'>
                Kembalian:{' '}
                {formatter.format(parseInt(cash) - printInvoice.total)}
              </span>
            </div>
            <button
              disabled={productInCart.length === 0 || !cash}
              onClick={() => {
                onCheckOutClick(printInvoice);
                setProductInCart([]);
                onClickToggleCart();
              }}
              className='relative w-32 h-16 mb-10 border-2 rounded-lg text-xl hover:opacity-70 bg-[#009645] text-white self-center'
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
