import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MdDelete } from 'react-icons/md';
import { SlOptionsVertical } from "react-icons/sl";


type Props = {
  file: File | null | undefined;
  setFile: (file: File | null) => void;
}

export default function UploadImage({ file, setFile }: Props) {
  // const [file, setFile] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > 10 * 1024 * 1024) {
        setFile(null);
        setFileName('');
        setError('Imagem não pode ser maior que 10MB');
      } else {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setError('');
      }

    }
  };

  const handleCancel = () => {
    setFile(null);
    setError('');
  };

  const handleRemoveImage = () => {
    if (window.confirm("Deseja realmente remover essa imagem?")) {
      console.log("Imagem removida");
    }
  };

  console.log(session?.user.avatarUrl);

  return (
    <>
      {file ? (
        <div className='flex flex-col items-center justify-center'>
          <div className="mb-5.5 relative">
            <Image
              width={240}
              height={240}
              src={URL.createObjectURL(file)}
              alt="User"
              className='rounded-full object-cover min-w-60 min-h-60 max-w-60 max-h-60'
            />
            <div className='absolute bottom-50 left-50 p-2'>
              <div onClick={handleCancel} className='w-8 h-8 rounded-full border-primary hover:brightness-90 border-2 text-white flex justify-center items-center bg-primary transition-all cursor-pointer'>
                <MdDelete />
              </div>
            </div>
            <span>{fileName}</span>
          </div>
        </div>
      ) : (

        session?.user.avatarUrl ? (

          <div className="relative">
            <div className='relative'>
              <Image
                width={240}
                height={240}
                src={session?.user.avatarUrl}
                alt="User"
                className='rounded-full object-cover min-w-60 min-h-60 max-w-60 max-h-60'
              />
            </div>
            <div>
              <div onClick={toggleOptions} className='shadow-5 w-8 p-2 rounded-full cursor-pointer hover:shadow-6 transition-all absolute right-4 bg-gray top-2' id="menu-button" aria-expanded="true" aria-haspopup="true">
                <SlOptionsVertical />
              </div>
              {showOptions && (
                <div className="absolute right-1 z-10 mt-2 w-36 top-8 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                  <div className="py-1" role="none">
                    <div className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:shadow-2" role="menuitem" tabIndex={-1} id="menu-item-1">Editar imagem</div>
                    <div onClick={handleRemoveImage} className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:shadow-2" role="menuitem" tabIndex={-1} id="menu-item-0">Remover imagem</div>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div
            id="FileUpload"
            className="flex justify-center items-center relative mb-5.5 w-60 h-60 cursor-pointer appearance-none rounded-full border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <p className='text-center'>
                <span className="text-primary">Clique para escolher uma imagem</span>
              </p>
              <p className="mt-1.5">JPG, JPEG ou PNG</p>
              <p>(Tamanho máximo: 10MB)</p>
            </div>
          </div>
        )

      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="fileInput"
        ref={fileInputRef}
      />

      {error && (<span className='text-meta-1'>{error}</span>)}
    </>
  );
}
