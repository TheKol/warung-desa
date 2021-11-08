import React, { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { gql, useMutation, useQuery } from '@apollo/client';
import UserList from './UserList';

export const AddUser = () => {
  const wholeTypeUser = ['admin', 'kasir'];

  const clearData = {
    userName: '',
    loginType: '',
    passwordHash: '',
  };

  let [loginType, setLoginType] = useState('admin');
  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);
  let [repeatPassword, setRepeatPassword] = useState('');
  let [, setErrors] = useState({});

  const [inputAddUser, { error }] = useMutation(ADD_USER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    refetchQueries: [USER_LIST, 'Query'],
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [USER_LIST, 'Query'],
  });

  const { loading, data } = useQuery(USER_LIST);

  const checkPassword = () => {
    if (formData.passwordHash && repeatPassword) {
      if (formData.passwordHash === repeatPassword) {
        return true;
      }
      return false;
    } else return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const UserInfo = {
      userName: formData.userName,
      loginType: loginType,
      passwordHash: formData.passwordHash,
    };

    inputAddUser({ variables: { input: UserInfo } });
    setFormData(clearData);
    setRepeatPassword('');
  };

  // const onClickDeleteUser = (deletedId) => {
  //   deleteUser({ variables: { id: deletedId } });
  // };

  // if (loading) return null;
  // if (error) return 'Error Data yang dicari tidak ada!!';

  return (
    <>
      <div className='print:hidden'>
        <button
          onClick={() => {
            setToggleForm(!toggleForm);
          }}
          className={`bg-[#009645] text-white px-2 py-3 w-full text-left rounded-t-md ${
            toggleForm ? 'rounded-t-md' : 'rounded-md'
          }`}
        >
          <div>
            <AiOutlineUserAdd className='inline-block align-text-top' /> Add
            User
          </div>
        </button>
        {toggleForm && (
          <form
            onSubmit={onSubmit}
            className='border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4'
          >
            {error && (
              <div className='p-text text-red-500'>
                User Name sudah dipakai!
              </div>
            )}

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
              <label
                htmlFor='userName'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                User Name
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, userName: e.target.value });
                  }}
                  value={formData.userName}
                  type='text'
                  name='userName'
                  id='userName'
                  autoComplete='username'
                  className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
              <label
                htmlFor='loginType'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                User Type
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <select
                  name='loginType'
                  id='loginType'
                  value={loginType}
                  onChange={(e) => {
                    setLoginType(e.target.value);
                  }}
                >
                  {wholeTypeUser.map((type, index) => {
                    return (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
              <label
                htmlFor='passwordHash'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Password
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, passwordHash: e.target.value });
                  }}
                  value={formData.passwordHash}
                  type='password'
                  name='passwordHash'
                  id='passwordHash'
                  autoComplete='new-password'
                  className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
                />
              </div>
            </div>
            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
              <label
                htmlFor='repeatPassword'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Repeat - Password
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                  value={repeatPassword}
                  type='password'
                  name='repeatPassword'
                  id='repeatPassword'
                  autoComplete='new-password'
                  className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
                />
              </div>
            </div>

            <div className='pt-5'>
              <div className='flex justify-end items-center'>
                {!checkPassword() && (
                  <p className='text-red-600'>Password tidak sama!</p>
                )}
                <button
                  disabled={
                    !formData.userName ||
                    !formData.passwordHash ||
                    !repeatPassword ||
                    !checkPassword()
                  }
                  type='submit'
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#009645] hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#089EA3]'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {!loading ? (
        <UserList
          data={data.getAllAuth}
          onClickDeleteUser={(deletedId, deletedUserName) => {
            if (
              window.confirm(
                `Delete yakin ingin menghapus User: ${deletedUserName}?`
              )
            ) {
              deleteUser({ variables: { deleteAuthId: deletedId } });
            } else return null;
          }}
        />
      ) : null}
    </>
  );
};

const ADD_USER = gql`
  mutation Mutation($input: AuthInput) {
    addAuth(input: $input) {
      id
    }
  }
`;

const USER_LIST = gql`
  query Query {
    getAllAuth {
      id
      userName
      loginType
    }
  }
`;

const DELETE_USER = gql`
  mutation Mutation($deleteAuthId: ID!) {
    deleteAuth(id: $deleteAuthId)
  }
`;
