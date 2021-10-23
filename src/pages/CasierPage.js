import React, { useState, useEffect } from 'react';
import { PopCart } from '../components/PopCart';
import { ProductItem } from '../components/ProductItem';
import { Search } from '../components/Search';
import { gql, useQuery, useMutation } from '@apollo/client';
import { PrintInvoice } from '../components/PrintInvoice';

export const CasierPage = () => {
  let [query, setQuery] = useState('');
  let [invoice, setInvoice] = useState([]);
  let [toggleCart, setToggleCart] = useState(false);
  let [productInCart, setProductInCart] = useState([]);
  let [toggleInvoice, setToggleInvoice] = useState(false);
  let [filteredProduct, setFilteredProduct] = useState([]);

  const { loading, error, data: stockList } = useQuery(ALL_PRODUCT);
  const [updateStock] = useMutation(UPDATE_STOCK, {
    refetchQueries: [ALL_PRODUCT, 'getAllProducts'],
  });
  const [
    inputTransaction,
    { data, loading: loadingTransaction, error: errorTransaction },
  ] = useMutation(ADD_TRANSACTION);

  const [deleteProductStock] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [ALL_PRODUCT, 'getAllProducts'],
  });

  const re = /^[0-9\b]+$/;

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const onClickedClosedButton = () => {
    setToggleInvoice(!toggleInvoice);
  };
  const onClickToggleCart = () => {
    setToggleCart(!toggleCart);
  };

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const cartTemp = localStorage.getItem('cart');
      const cartList = JSON.parse(cartTemp);
      setProductInCart(cartList);
    }
  }, []);

  useEffect(() => {
    if (productInCart.length !== 0) {
      localStorage.setItem('cart', JSON.stringify(productInCart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [productInCart]);

  useEffect(() => {
    if (invoice.length !== 0) {
      invoice.sellProduct.forEach((e) => {
        const objectIndex = stockList.getAllProducts.findIndex(
          (obj) => obj.id === e.productId
        );
        if (stockList.getAllProducts[objectIndex].stock === 0)
          deleteProductStock({ variables: { deleteProductId: e.productId } });
      });
      inputTransaction({ variables: { input: invoice } });
    }
  }, [invoice]);

  useEffect(() => {
    if (!loading)
      setFilteredProduct(
        stockList.getAllProducts.filter((item) => {
          return (
            item.productName.toLowerCase().includes(query.toLowerCase()) ||
            item.barCode.toLowerCase().includes(query.toLowerCase())
          );
        })
      );
  }, [setFilteredProduct, stockList, query, loading]);

  return (
    <div className='relative'>
      <div className='overflow-x-hidden w-screen h-screen'>
        <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl'>
          <button
            onClick={onClickToggleCart}
            className='relative w-20 h-20 mr-4 border-2 rounded-lg hover:opacity-70 bg-[#009645] text-white self-end'
          >
            <img src='./images/keranjang.png' alt='cart' />
            {productInCart.length === 0 ? null : (
              <div className='bg-red-500 w-6 h-6 rounded-full absolute -top-2 -right-2'>
                {productInCart.length}
              </div>
            )}
          </button>
          <Search
            query={query}
            onQueryChange={(myQuery) => setQuery(myQuery)}
          />
          <ul className='divide-y divide-gray-200'>
            {loading ? (
              <h1>Loading posts..</h1>
            ) : error ? (
              <h1>Error data..</h1>
            ) : (
              filteredProduct.map((product) => (
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
                    const objectIndex = stockList.getAllProducts.findIndex(
                      (obj) => obj.id === productAddToCart.productId
                    );
                    const stockBefore =
                      stockList.getAllProducts[objectIndex].stock;
                    const stockAfter =
                      stockBefore - productAddToCart.amountItems;
                    updateStock({
                      variables: {
                        input: {
                          id: productAddToCart.productId,
                          stock: stockAfter,
                        },
                      },
                    });
                    setProductInCart((product) => [
                      ...product,
                      productAddToCart,
                    ]);
                  }}
                />
              ))
            )}
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
          onDeleteProductInCart={(productInCartDelete) => {
            const objectIndex = stockList.getAllProducts.findIndex(
              (obj) => obj.id === productInCartDelete.productId
            );
            const stockBefore = stockList.getAllProducts[objectIndex].stock;
            const stockAfter = stockBefore + productInCartDelete.amountItems;
            updateStock({
              variables: {
                input: {
                  id: productInCartDelete.productId,
                  stock: stockAfter,
                },
              },
            });
            setProductInCart(
              productInCart.filter(
                (productList) => productList.id !== productInCartDelete.id
              )
            );
          }}
          onCheckOutClick={(createInvoice) => {
            setInvoice(createInvoice);
            setToggleInvoice(!toggleInvoice);
            localStorage.removeItem('cart');
          }}
        />
      ) : null}
      {toggleInvoice ? (
        loadingTransaction ? (
          <h1>Loading posts..</h1>
        ) : errorTransaction ? (
          <h1>Error data..</h1>
        ) : data ? (
          <PrintInvoice
            invoice={invoice}
            onClickedClosedButton={onClickedClosedButton}
            idTransaction={data.addSelling.id}
          />
        ) : null
      ) : null}
    </div>
  );
};

const ALL_PRODUCT = gql`
  query getAllProducts {
    getAllProducts {
      id
      barCode
      productName
      productPrice
      capitalPrice
      stock
      unit
      purcaseDate
      imgSource
    }
  }
`;

const UPDATE_STOCK = gql`
  mutation Mutation($input: Stock) {
    updateProduct(input: $input) {
      id
      stock
    }
  }
`;

const ADD_TRANSACTION = gql`
  mutation AddSellingMutation($input: SellingInput) {
    addSelling(input: $input) {
      id
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation DeleteProductMutation($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`;
