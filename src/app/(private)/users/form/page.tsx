'use client';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { LuLock, LuMail, LuUser2 } from 'react-icons/lu';
import createUserSchema from './schemas/createUser.schema';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import { AlertType } from '@/components/Alert/type';
import PhoneInput from '@/components/PhoneInput';
import Input from '@/components/Input';
import UploadImage from '@/components/UploadImage';

const Settings = () => {
	const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
	const [alert, setAlert] = useState<AlertType>();
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({ resolver: zodResolver(createUserSchema) });
	const [file, setFile] = useState<File | null>();

	useEffect(() => {
		setValue('phone', '');
	}, []);

	const onSumbit = async (data: FieldValues) => {
		setIsLoadingSubmit(true);
		const { name, email, password, phone } = data;
		const obj = { name, email, password, phone };

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
									'Content-Type': 'multipart/form-data',  // Certifique-se de definir o tipo de conteúdo como multipart/form-data
									'Authorization': '',   // Adicione o cabeçalho Authorization com o token Bearer
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
			<title>Cadastrar usuário</title>
			<div className="mx-auto max-w-280">
				<Breadcrumb pageName="Cadastrar usuário" />

				{showAlert && <Alert status={alert?.status || ''} title={alert?.title} description={alert?.description} />}

				<form noValidate onSubmit={handleSubmit(onSumbit)}>
					<div className="grid grid-cols-5 gap-8">
						<div className="col-span-5 xl:col-span-3">
							<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
								<div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
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

						<div className="col-span-5 xl:col-span-2">
							<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
								<div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
									<h3 className="font-medium text-black dark:text-white">
										Imagem
									</h3>
								</div>
								<div className="p-7">
									<UploadImage file={file} setFile={setFile} />
								</div>
							</div>
						</div>

					</div>

					<div className="grid-cols-12 flex justify-end gap-4.5 mt-5">
						<Button title="Cadastrar" loading={isLoadingSubmit} />
					</div>

				</form>

			</div>
		</>
	);
};

export default Settings;
