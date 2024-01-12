'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FieldValues, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import HelperText from '@/components/HelperText';
import Brand from '@/components/Brand';

const loginSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().refine(data => data.trim() !== '', {
		message: 'Senha inválida'
	}),
});

export default function SignIn() {
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
	const router = useRouter();
	const [errorLogin, setErrorLogin] = useState('');
	const [loading, setLoading] = useState(false);

	const makeLogin = async (data: FieldValues) => {
		setLoading(true);
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
			callbackUrl: '/'
		});

		setLoading(false);

		if (res?.ok && res?.url) {
			setErrorLogin('');
			router.push(res.url);
		}

		if (res?.error) {
			setErrorLogin(res.error);
		}
	};

	return (
		<>
			<title>Login</title>

			<div className="flex flex-col justify-center items-center h-screen p-10">

				<div className="md:w-180 xl:w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

						{errorLogin && !loading && (
							<div className="flex items-center bg-meta-7 text-white text-sm font-bold px-4 2xsm:py-3 sm:py-4" role="alert">
								<div className='flex w-full justify-center items-center text-xl'>
									<svg className="fill-current w-4 h-4 mr-2" data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<path clipRule="evenodd" fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
									</svg>
									<p className='text-sm'>{errorLogin}</p>
								</div>
							</div>
						)}

						<div className="flex flex-wrap items-center">
							<div className="hidden w-full xl:block xl:w-1/2">
								<div className="py-17.5 px-4 text-center">
									<Link className="mb-5.5 inline-block" href="/">
										<Brand />
									</Link>

									<p className="2xl:px-20">
										Controle seus portfólios e consulte dados com nossa API
									</p>

									<span className="mt-15 inline-block">
										<Image
											className=''
											src={'/images/login/login.svg'}
											alt='Login'
											width={700}
											height={80}
										/>
									</span>
								</div>

							</div>

							<div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
								<div className="w-full p-8 sm:p-12.5 xl:p-17.5">
									<h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
										Login
									</h2>

									<form onSubmit={handleSubmit(makeLogin)}>
										<div className="mb-4">
											<label className="mb-2.5 block font-medium text-black dark:text-white">
												Email
											</label>
											<div className="relative">
												<input
													{...register('email')}
													type="email"
													placeholder="Informe seu email"
													className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none  dark:bg-form-input dark:focus:border-primary text-boxdark-2"
												/>
												<HelperText message={errors?.email?.message as string} />

												<span className="absolute right-4 2xsm:top-2 sm:top-4 top-4">
													<svg
														className="fill-current"
														width="22"
														height="22"
														viewBox="0 0 22 22"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g opacity="0.5">
															<path
																d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
																fill=""
															/>
														</g>
													</svg>
												</span>
											</div>
										</div>

										<div className="mb-6">
											<label className="mb-2.5 block font-medium text-black dark:text-white">
												Senha
											</label>
											<div className="relative">
												<input
													{...register('password')}
													type="password"
													placeholder="Informe sua senha"
													className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-boxdark-2"
												/>
												<HelperText message={errors?.password?.message as string} />

												<span className="absolute right-4 top-4">
													<svg
														className="fill-current"
														width="22"
														height="22"
														viewBox="0 0 22 22"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g opacity="0.5">
															<path
																d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
																fill=""
															/>
															<path
																d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
																fill=""
															/>
														</g>
													</svg>
												</span>
											</div>
										</div>

										<div className="mb-5">
											<button disabled={loading} className='w-full cursor-pointer rounded-lg border border-primary bg-primary 2xsm:p-4 sm:p-4 p-4 text-white transition hover:bg-opacity-90'>
												{
													loading ? (
														<span className='text-center'>
															<svg aria-hidden="true" role="status" className="w-full h-8 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
																<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
															</svg>
														</span>
													) : (
														<span className='text-lg font-medium'>Entrar</span>
													)
												}
											</button>
										</div>

										<div className="mt-6 text-center">
											<p>
												Ainda não tem uma conta?{' '}
												<Link href="/auth/signup" className="text-primary">
													Cadastre-se
												</Link>
											</p>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

