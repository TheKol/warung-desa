import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { gql, useQuery, useMutation } from '@apollo/client';

const ImagesList = ({ onClickSelectImage, onClickChoseImage }) => {
  const [imgName, setImgName] = useState('');
  const { loading, error, data } = useQuery(ALL_IMAGES);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) =>
      addImage({ variables: { imgName: data.uploadImg.imgName } }),
  });

  const [addImage] = useMutation(ADD_IMAGE, {
    refetchQueries: [ALL_IMAGES, 'Query'],
  });

  if (loading) return null;
  if (error) return 'Error Data yang dicari tidak ada!!';

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  return (
    <div className='absolute flex justify-center top-0 left-0 bg-opacity-70 w-screen h-full bg-black z-10'>
      <div className='flex flex-col items-center bg-white w-11/12 h-screen'>
        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5'>
          <label
            htmlFor='imgName'
            className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
          >
            Upload Image
          </label>
          <div className='mt-1 sm:mt-0 sm:col-span-2'>
            <input
              type='file'
              name='imgName'
              id='imgName'
              accept='.png, .jpg, .jpeg'
              className='w-60 rounded-md border-2 focus:ring-[#089EA3] focus:outline-none focus:ring-2 focus:ring-offset-2'
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className='grid grid-cols-4 sm:grid-cols-12 gap-1 my-4'>
          {data.getAllImg.map((img, index) => (
            <button
              key={index}
              className='flex justify-center items-center h-16 w-16 p-1.5 mr-1.5 border-2
                rounded hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#089EA3]'
              onClick={() => {
                setImgName(img.imgName);
              }}
            >
              <img
                src={`http://localhost:4000/images/${img.imgName}`}
                alt={img.imgName}
              />
            </button>
          ))}
        </div>
        <button
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm 
          font-medium rounded-md text-white bg-[#009645] hover:opacity-70 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-[#089EA3]'
          onClick={() => {
            console.log(imgName);
            onClickChoseImage(imgName);
            onClickSelectImage();
          }}
        >
          Chose Image
        </button>
        <button
          className='absolute top-2 right-2 sm:right-14'
          onClick={onClickSelectImage}
        >
          <RiCloseLine className='text-5xl text-[#009645]' />
        </button>
      </div>
    </div>
  );
};

export default ImagesList;

const ALL_IMAGES = gql`
  query Query {
    getAllImg {
      id
      imgName
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation Mutation($file: Upload!) {
    uploadImg(file: $file) {
      imgName
    }
  }
`;

const ADD_IMAGE = gql`
  mutation Mutation($imgName: String!) {
    addImg(imgName: $imgName) {
      id
      imgName
    }
  }
`;
