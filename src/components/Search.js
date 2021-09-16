import React from 'react';
import { BiSearch } from 'react-icons/bi';

export const Search = ({ query, onQueryChange }) => {
  return (
    <div className='py-5 mx-2'>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <BiSearch />
          <label htmlFor='query' className='sr-only' />
        </div>
        <input
          type='text'
          name='query'
          id='query'
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          className='h-10 pl-8 rounded-sm focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2 block w-full sm:text-sm border-gray-300 border-2'
          placeholder='Search'
        />
      </div>
    </div>
  );
};
