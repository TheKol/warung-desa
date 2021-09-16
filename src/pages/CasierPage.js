import React, { useState, useCallback, useEffect } from 'react';
import { PopCart } from '../components/PopCart';
import { ProductItem } from '../components/ProductItem';
import { Search } from '../components/Search';

export const CasierPage = () => {
  let [query, setQuery] = useState('');
  let [invoice, setInvoice] = useState([]);
  let [productList, setProductList] = useState([]);
  let [toggleCart, setToggleCart] = useState(false);
  let [productInCart, setProductInCart] = useState([]);
  let [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    if (invoice.length !== 0) {
      invoice.sellProduct.forEach((e) => {
        const objectIndex = productList.findIndex(
          (obj) => obj.id === e.productId
        );
        const stockBefore = productList[objectIndex].stock;
        productList[objectIndex].stock = stockBefore - e.amountItems;
      });
      console.log('Perubahan stock pada: ', productList);
      console.log('Invoice yang dibuat untuk record ke pembukuan: ', invoice);
    }
  }, [invoice, productList]);

  const re = /^[0-9\b]+$/;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  useEffect(() => {
    setFilteredProduct(
      productList.filter((item) => {
        return (
          item.productName.toLowerCase().includes(query.toLowerCase()) ||
          item.barCode.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }, [setFilteredProduct, productList, query]);

  const fetchData = useCallback(() => {
    fetch('./product-stock.json')
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onClickToggleCart = () => {
    setToggleCart(!toggleCart);
  };

  return (
    <div className='relative'>
      <div className='overflow-x-hidden w-screen h-screen'>
        <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl'>
          <button
            onClick={onClickToggleCart}
            className='relative w-20 h-20 mr-4 border-2 rounded-lg hover:opacity-70 bg-[#009645] text-white self-end'
          >
            <img src='./images/keranjang.png' alt='cart' />
            <div className='bg-red-500 w-6 h-6 rounded-full absolute -top-2 -right-2'>
              {productInCart.length}
            </div>
          </button>
          <Search
            query={query}
            onQueryChange={(myQuery) => setQuery(myQuery)}
          />
          <ul className='divide-y divide-gray-200'>
            {filteredProduct.map((product) => (
              <ProductItem
                key={product.id}
                formatter={formatter}
                re={re}
                product={product}
                lastId={productInCart.reduce(
                  (max, item) =>
                    Number(item.id) > max ? Number(item.id) : max,
                  0
                )}
                onBuyClicked={(productAddToCart) => {
                  setProductInCart((productList) => [
                    ...productList,
                    productAddToCart,
                  ]);
                }}
              />
            ))}
          </ul>
        </div>
      </div>
      {toggleCart ? (
        <PopCart
          re={re}
          formatter={formatter}
          onClickToggleCart={onClickToggleCart}
          setProductInCart={setProductInCart}
          productInCart={productInCart}
          onDeleteProductInCart={(productInCartId) =>
            setProductInCart(
              productInCart.filter(
                (productList) => productList.id !== productInCartId
              )
            )
          }
          onCheckOutClick={(createInvoice) => {
            setInvoice(createInvoice);
          }}
        />
      ) : null}
    </div>
  );
};
