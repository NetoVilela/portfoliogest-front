'use client';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { LuLock, LuMail, LuUser2 } from 'react-icons/lu';
import { FieldValues, useForm } from 'react-hook-form';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import { AlertType } from '@/components/Alert/type';
import PhoneInput from '@/components/PhoneInput';
import Input from '@/components/Input';
import UploadImage from '@/components/UploadImage';
import { useParams } from 'next/navigation';
import useAxiosAuth from '@/services/hooks/useAxiosAuth';

const PASSWORD_HASH_DEFAULT = 'ASDI75DAKS';

const MyAccount = () => {
  const { id } = useParams();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [alert, setAlert] = useState<AlertType>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
  const [file, setFile] = useState<File | null>();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`/users/${id}`);
        console.log(response.data);

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
      phone
    };

    try {
      const responseUser = await api.post('/users', obj);

      if (responseUser.status === 201) {

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
                  'Authorization': '',
                },
              }
            );
          } catch (error) {
            console.log(error);
          }

        }

        setAlert({ status: 'success', title: 'Usuário cadastrado com sucesso', description: 'Acesse a listagem para acompanhar o registro' });
        setShowAlert(true);

        reset({
          name: '',
          phone: '',
          email: '',
          password: '',
          repeatPassword: '',
        });
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
      <div className="mx-auto max-w-280">
        <Breadcrumb pageName="Minha conta" />

        {showAlert && <Alert status={alert?.status || ''} title={alert?.title} description={alert?.description} />}

        <form noValidate onSubmit={handleSubmit(onSumbit)} className=' bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="rounded-sm border-2">
              <div className="border-b border-stroke pt-4 pb-1 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Informações pessoais
                </h3>
              </div>
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

            <div className="rounded-sm border-2">
              <div className="p-7 flex justify-center md:justify-end">
                <UploadImage file={file} setFile={setFile} />
              </div>
            </div>
          </div>
          <div className='flex justify-end pb-3 pr-3'>
              <Button title="Atualizar" loading={isLoadingSubmit} p={3} w={30} />
          </div>

        </form>

      </div>
    </>
  );
};

export default MyAccount;
