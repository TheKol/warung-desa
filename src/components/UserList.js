import React from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';

const UserList = ({ data, onClickDeleteUser }) => {
  return (
    <div className='h-screen mt-10 w-full ml-4'>
      <table className='border-2 table-auto '>
        <thead>
          <tr>
            <th className='border-2 px-2'>No</th>
            <th className='border-2 px-2'>User Name</th>
            <th className='border-2 px-2'>Tipe User</th>
            <th className='border-2 px-2'>Hapus</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0
            ? data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className='border-2 px-2 text-right'>{index + 1}</td>

                    <td className='border-2 px-2'>{row.userName}</td>
                    <td className='border-2 px-2'>{row.loginType}</td>
                    <td className='border-2 px-2'>
                      <button
                        className='flex justify-center items-center'
                        onClick={() => {
                          onClickDeleteUser(row.id, row.userName);
                        }}
                      >
                        <AiOutlineUserDelete className='text-2xl self-center' />
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
