import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { ProductInCart } from './ProductInCart';

export const PopCart = (props) => {
  const [cash, setCash] = useState('');
  const dateNow = Date.now();
  const totalTransaction = props.productInCart.reduce(
    (a, v) => (a = a + v.transactionTotalPriceItem),
    0
  );

  const transactionDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(dateNow);

  const printInvoice = {
    total: totalTransaction,
    cash: cash,
    change: cash - totalTransaction,
    date: dateNow,
    casier: 'Wawan',
    sellProduct: [...props.productInCart],
  };

  return (
    <div className='absolute top-0 left-0 bg-opacity-70 w-screen h-screen bg-black'>
      <div className='w-full h-full'>
        <div className='flex justify-center items-center h-screen'>
          <div className='relative flex flex-col w-[50rem] sm:h-[50rem] h-[640px] sm:rounded-lg bg-white'>
            <button
              className='absolute top-2 right-2'
              onClick={props.onClickToggleCart}
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
                {props.productInCart.map((cartItems) => (
                  <ProductInCart
                    formatter={props.formatter}
                    key={cartItems.id}
                    cartItems={cartItems}
                    transactionDate={transactionDate}
                    onDeleteProductInCart={props.onDeleteProductInCart}
                  />
                ))}
              </ul>
            </div>
            <div className='self-end mr-10'>
              <span className='text-right text-xl'>
                Total: {props.formatter.format(printInvoice.total)}
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
                      props.re.test(event.target.value)
                    ) {
                      setCash(event.target.value);
                    }
                  }}
                />
              </div>
              <span className='text-xl flex-grow text-right'>
                cash: {props.formatter.format(cash)}
              </span>
            </div>
            <div className='self-end mr-10'>
              <span className='text-right text-xl'>
                Kembalian:{' '}
                {props.formatter.format(parseInt(cash) - printInvoice.total)}
              </span>
            </div>
            <button
              disabled={props.productInCart.length === 0}
              onClick={() => {
                props.onCheckOutClick(printInvoice);
                props.setProductInCart([]);
                props.onClickToggleCart();
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
