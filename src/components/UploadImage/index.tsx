import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type Props = {
  file: File | null | undefined;
  setFile: (file: File | null) => void;
}

export default function UploadImage({ file, setFile }: Props) {
  // const [file, setFile] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { data: session } = useSession();

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

  return (
    <>
      {file ? (
        <div className='flex flex-col items-center justify-center'>
          <div className="mb-5.5 ">
            <img src={URL.createObjectURL(file)} alt="Uploaded Image" className="max-w-[300px] h-45" />
            <span>{fileName}</span>
            <div className='mt-5'>
              <button
                onClick={handleCancel}
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
              >
                Remover imagem
              </button>
            </div>
          </div>
        </div>
      ) : (

        session?.user.avatarUrl ? (

          <div className='flex flex-col'>
            <Image
              width={300}
              height={45}
              src={session?.user.avatarUrl}
              alt="User"
              className='rounded-full'
            />
            <div className='z-2 border-2'>
              aa
            </div>
          </div>
        ) : (
          <div id="FileUpload" className="relative mb-5.5 block w-full max-w-[300px] h-45 cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <p>
                <span className="text-primary">Clique para escolher uma imagem</span>
              </p>
              <p className="mt-1.5">JPG, JPEG ou PNG</p>
              <p>(Tamanho máximo: 10MB)</p>
            </div>
          </div>
        )

      )}

      {error && (<span className='text-meta-1'>{error}</span>)}
    </>
  );
}
