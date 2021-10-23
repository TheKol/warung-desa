import React, { useState, useEffect } from 'react';
import { Search } from '../components/Search';
import { ProductInStock } from '../components/ProductInStock';
import { AddProductStock } from '../components/AddProductStock';
import { gql, useQuery, useMutation } from '@apollo/client';

export const GoodsStorage = () => {
  let [query, setQuery] = useState('');
  // let [productList, setProductList] = useState([]);
  let [filteredProduct, setFilteredProduct] = useState([]);
  let [purchaseReport, setPurchaseReport] = useState([]);

  const { loading, error, data: stockList } = useQuery(ALL_PRODUCT);
  const [inputBuyNewStock] = useMutation(ADD_PURCASE, {
    refetchQueries: [ALL_PRODUCT, 'getAllProducts'],
  });
  const [inputPurcaseReport] = useMutation(ADD_PURCASE_REPORT);

  console.log(purchaseReport);

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  // const fetchData = useCallback(() => {
  //   fetch('./product-stock.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProductList(data);
  //     });
  // }, []);

  useEffect(() => {
    if (purchaseReport.length !== 0) {
      inputBuyNewStock({ variables: { input: purchaseReport } });
      inputPurcaseReport({ variables: { input: purchaseReport } });
    }
  }, [purchaseReport]);

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
    <div className='overflow-x-hidden w-screen'>
      <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl'>
        <AddProductStock
          onClickAddProduct={(newStock) => {
            // setProductList([...productList, newStock]);
            setPurchaseReport(newStock);
          }}
          // lastId={productList.reduce(
          //   (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          //   0
          // )}
        />
        <Search query={query} onQueryChange={(myQuery) => setQuery(myQuery)} />
        <ul className='divide-y divide-gray-200'>
          {loading ? (
            <h1>Loading posts..</h1>
          ) : error ? (
            <h1>Error data..</h1>
          ) : (
            filteredProduct.map((product) => (
              <ProductInStock
                key={product.id}
                formatter={formatter}
                product={product}
              />
            ))
          )}
        </ul>
      </div>
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

const ADD_PURCASE = gql`
  mutation Mutation($input: ProductInput) {
    createProduct(input: $input) {
      id
    }
  }
`;

const ADD_PURCASE_REPORT = gql`
  mutation AddPurcaseMutation($input: PurcaseInput) {
    addPurcase(input: $input) {
      id
    }
  }
`;
