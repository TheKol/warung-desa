import React, { useState, useCallback, useEffect } from 'react';
import { Search } from '../components/Search';
import { ProductInStock } from '../components/ProductInStock';
import { AddProductStock } from '../components/AddProductStock';

export const GoodsStorage = () => {
  let [query, setQuery] = useState('');
  let [productList, setProductList] = useState([]);
  let [filteredProduct, setFilteredProduct] = useState([]);
  let [purchaseReport, setPurchaseReport] = useState([]);

  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

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

  useEffect(() => {
    console.log('ini purchase Report : ', purchaseReport);
  }, [purchaseReport]);

  useEffect(() => {
    setFilteredProduct(
      productList.filter((item) => {
        return (
          item.productName.toLowerCase().includes(query.toLowerCase()) ||
          item.barCode.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
    console.log('ini product List : ', productList);
  }, [setFilteredProduct, productList, query]);

  return (
    <div className='overflow-x-hidden w-screen'>
      <div className='container flex flex-col mx-auto mt-3 font-thin max-w-6xl'>
        <AddProductStock
          onClickAddProduct={(newStock) => {
            setProductList([...productList, newStock]);
            setPurchaseReport((record) => [...record, newStock]);
          }}
          lastId={productList.reduce(
            (max, item) => (Number(item.id) > max ? Number(item.id) : max),
            0
          )}
        />
        <Search query={query} onQueryChange={(myQuery) => setQuery(myQuery)} />
        <ul className='divide-y divide-gray-200'>
          {filteredProduct.map((product) => (
            <ProductInStock
              key={product.id}
              formatter={formatter}
              product={product}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
