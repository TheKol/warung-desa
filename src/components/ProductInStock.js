export const ProductInStock = ({ formatter, product }) => {
  const transactionDate = new Intl.DateTimeFormat(['ban', 'id'], {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(product.purcaseDate);

  return (
    <li className='px-3 py-3 flex justify-center items-center'>
      <div className='flex justify-center items-center h-16 w-16 p-1.5 mr-1.5 border-2 rounded'>
        <img
          src={`http://localhost:4000/images/${product.imgSource}`}
          alt={product.productName}
        />
      </div>
      <div className='flex-grow'>
        <div className='flex items-center'>
          <span className='flex-none font-medium text-lg sm:text-2xl text-[#009645]'>
            {product.productName}
          </span>
          <span className='text-right flex-grow text-sm sm:text-base'>
            Stock: {product.stock} {product.unit}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='flex-none font-bold text-[#009645] text-sm sm:text-base'>
            {product.barCode}
          </span>
          <div>
            <span className='text-sm sm:text-base'>{transactionDate}</span>
          </div>
        </div>
        <div className='flex items-center justify-between leading-tight text-gray-700 text-sm sm:text-base'>
          <span>Sell Price: {formatter.format(product.productPrice)}</span>
          <span>Capital Price: {formatter.format(product.capitalPrice)}</span>
        </div>
      </div>
    </li>
  );
};
