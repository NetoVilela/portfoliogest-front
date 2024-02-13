'use client';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { LuLock, LuMail, LuUser2 } from 'react-icons/lu';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import { AlertType } from '@/components/Alert/type';
import PhoneInput from '@/components/PhoneInput';
import Input from '@/components/Input';
import UploadImage from '@/components/UploadImage';
import { useParams } from 'next/navigation';
// import useAxiosAuth from '@/services/hooks/useAxiosAuth';
import editMyAccountSChema from './schemas/editMyAccount.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import api from "@/services/api";
import { SpinnerLoading } from '@/components/Spinner';

const PASSWORD_HASH_DEFAULT = 'ASDI75DAKS';

const MyAccount = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [alert, setAlert] = useState<AlertType>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({ resolver: zodResolver(editMyAccountSChema) });
  const [file, setFile] = useState<File | null>();
  // const axiosAuth = useAxiosAuth();

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${id}`);
        const { name, email, phone } = response.data;
        reset({
          name,
          email,
          phone,
          password: PASSWORD_HASH_DEFAULT,
          repeatPassword: PASSWORD_HASH_DEFAULT,
        });

      } catch (error) {
        console.log(`Erro ao obter dados de usuário: ${error}`);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchData();

    setValue('phone', '');
  }, []);

  const onSumbit = async (data: FieldValues) => {
    setIsLoadingSubmit(true);
    const { name, password, phone } = data;

    const obj = {
      name,
      ...(password !== PASSWORD_HASH_DEFAULT && { password }),
      phone,
      status: true,
    };

    try {
      const responseUser = await api.put(`/users/${id}`, obj);

      if (responseUser.status === 200) {

        if (file instanceof File) {
          const formData = new FormData();
          const { id } = responseUser.data;
          formData.append('file', file);
          formData.append('userId', id);

          try {
            await api.post(
              '/images/upload-avatar',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': 'Bearer',
                },
              }
            );
          } catch (error) {
            console.log(error);
          }

        }

        setAlert({ status: 'success', title: 'Dados editados com sucesso!', description: '' });
        setShowAlert(true);
        setFile(null);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      setShowAlert(true);
      setAlert({ status: 'error', title: 'Não foi possível cadastrar o usuário', description: e.response.data.message });
    }

    setIsLoadingSubmit(false);
  };

  return (
    <>
      <title>Minha conta</title>
      <div className="mx-auto">
        <Breadcrumb pageName="Minha conta" />

        {showAlert && <Alert status={alert?.status || ''} title={alert?.title} description={alert?.description} />}

        <form noValidate onSubmit={handleSubmit(onSumbit)} className='bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-100">
              <SpinnerLoading />
            </div>
          ) : (
            <>
              <div className="border-b border-stroke pt-4 pb-1 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Informações pessoais
                </h3>
              </div >
              <div className="grid grid-cols-1 md:grid-cols-2">

                <div className="rounded-sm">
                  <div className="p-7 flex justify-center">
                    <UploadImage file={file} setFile={setFile} />
                  </div>
                </div>

                <div className="rounded-sm">
                  <div className="p-7">
                    <div className="flex flex-col gap-5.5 sm:flex-row">
                      <Input
                        label='Nome'
                        name='name'
                        register={register}
                        placeholder="Digite o nome"
                        error={!!errors.name?.message}
                        helperText={errors?.name?.message as string}
                        icon={<LuUser2 size={20} />}
                      />

                      <PhoneInput
                        error={!!errors.phone?.message}
                        helperText={errors.phone?.message as string || ''}
                        name={'phone'}
                        value={watch('phone') || ''}
                        setValue={setValue}
                      />
                    </div>

                    <Input
                      classNameProps='w-full'
                      label='Email'
                      name='email'
                      type="email"
                      register={register}
                      placeholder="Digite o email"
                      error={!!errors.email?.message}
                      helperText={errors?.email?.message as string}
                      icon={<LuMail size={20} />}
                      disabled
                    />

                    <div className="mb-10 flex flex-col gap-5.5 sm:flex-row">
                      <Input
                        label='Senha'
                        name='password'
                        type="password"
                        register={register}
                        placeholder="Digite a senha"
                        error={!!errors.password?.message}
                        helperText={errors?.password?.message as string}
                        icon={<LuLock size={20} />}
                      />
                      <Input
                        label='Repita a senha'
                        name='repeatPassword'
                        type="password"
                        register={register}
                        placeholder="Digite a senha"
                        error={!!errors.repeatPassword?.message}
                        helperText={errors?.repeatPassword?.message as string}
                        icon={<LuLock size={20} />}
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className='flex justify-end pb-3 pr-3'>
                <Button title="Salvar" loading={isLoadingSubmit} p={2} w={50} />
              </div>
            </>
          )}
        </form >


      </div >
    </>
  );
};

export default MyAccount;
