import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
import { auth, db } from '../lib/firebase';
import upload from '../lib/upload';
import Label from './Label';
import Login from './Login';

const Registration = () => {
	const [login, setLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('')
	const [avatar, setAvatar] = useState({
		file: null,
		url: '',
	});

	const handleAvatar = (e: any) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleRegistraion = async (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { firstName, lastName, email, password }: any = Object.fromEntries(formData);
		try {
			setLoading(true);
			const res = await createUserWithEmailAndPassword(auth, email, password);
			let imageUrl = null;
			if(avatar && avatar?.file) {
				imageUrl = await upload(avatar?.file);
			}

			await setDoc(doc(db, 'users', res.user.uid), {
        firstName,
        lastName,
        email,
        avatar: imageUrl,
        id: res.user.uid,
      });
			setLogin(true);
		} catch (error: any) {
			let errorMessage;
			switch (error.code) {
				case 'auth/invalid-email':
					errorMessage = 'Please enter a valid email.';
					break;
				case 'auth/missing-password':
					errorMessage = 'Please enter a password.';
					break;
				case 'auth/email-already-in-use':
					errorMessage = 'This email is already in use. Try another email.';
					break;
				// Add more cases as needed
				default:
					errorMessage = 'An error occurred. Please try again.';
			}
			console.log('Error', error);
			setErrMsg(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{login ? (
				<Login setLogin={setLogin} />
			) : (
				<div className='bg-neutral-100 rounded-lg'>
					<form
						onSubmit={handleRegistraion}
						className='max-w-5xl mx-auto pt-10 px-10 lg:px-0 text-darkText'>
						<div className='border-b border-b-white/10 pb-5'>
							<h2 className='text-lg font-semibold uppercase leading-7'>
								Registration Form
							</h2>
							<p className='mt-1 text-sm leading-6 text-gray-500'>
								You need to provide required information to get register with
								us.
							</p>
						</div>

						<div className='border-b border-b-white/10 pb-5 flex flex-col lg:flex-row lg:justify-between lg:gap-10'>
							<div className='mt-5 flex flex-col gap-y-4 lg:w-1/2 w-full'>
								<div>
									<Label title='First name' htmlFor='firstName' />
									<input
										type='text'
										name='firstName'
										placeholder='First name'
										className='block w-full rounded-md border-0 bg-whiteText py-1.5 px-4 outline-none text-darkText shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 mt-2'
									/>
								</div>
								<div>
									<Label title='Last name' htmlFor='lastName' />
									<input
										type='text'
										name='lastName'
										placeholder='Last name'
										className='block w-full rounded-md border-0 bg-whiteText py-1.5 px-4 outline-none text-darkText shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 mt-2'
									/>
								</div>
								<div>
									<Label title='Email address' htmlFor='email' />
									<input
										type='email'
										name='email'
										placeholder='Email'
										className='block w-full rounded-md border-0 bg-whiteText py-1.5 px-4 outline-none text-darkText shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 mt-2'
									/>
								</div>
								<div>
									<Label title='Password' htmlFor='password' />
									<input
										type='password'
										name='password'
										placeholder='Password'
										className='block w-full rounded-md border-0 bg-whiteText py-1.5 px-4 outline-none text-darkText shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 mt-2'
									/>
								</div>
							</div>

							<div className='lg:w-1/2 w-full'>
								<div className='mt-2 flex items-center gap-x-3'>
									<div className='flex-1'>
										<Label title='Profile picture' />
										<div className='mt-2 flex justify-center rounded-lg border border-dashed border-darkText/25 px-6 py-4'>
											<div className='flex flex-col items-center text-center'>
												<div className='w-40 h-40 border border-gray-400 rounded-full p-2'>
													{avatar?.url ? (
														<img
															src={avatar?.url}
															alt='userImage'
															className='w-full h-full rounded-full object-cover'
														/>
													) : (
														<MdPhotoLibrary className='mx-auto h-full w-full text-gray-500' />
													)}
												</div>

												<div className='mt-4 flex items-center mb-1 text-sm leading-6 text-gray-400'>
													<label htmlFor='file-upload'>
														<span className='relative cursor-pointer rounded-md px-2 py-1 bg-gray-900/50 font-semibold text-gray-200 hover:bg-gray-800/75'>
															Upload a file
														</span>
														<input
															type='file'
															name='file-upload'
															id='file-upload'
															className='sr-only'
															onChange={handleAvatar}
														/>
													</label>
													<p className='pl-1'>or drag and drop</p>
												</div>
												<p className='text-xs leading-5 text-gray-400'>
													PNG, JPG, GIF up to 10MB
												</p>

											</div>
										</div>
									</div>
								</div>
							</div>

						</div>

						{errMsg && (
							<p className='text-red-700 text-center py-1 rounded-md tracking-wide font-semibold'>{errMsg}</p>
						)}
						<button disabled={loading} type='submit' className={`bg-darkText mt-5 w-full py-2 uppercase text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-red-700 duration-200 ${
                loading ? 'bg-gray-600 hover:bg-gray-700' : 'bg-darkText'}`}>Sign Up</button>

					</form>

					<p className='text-sm leading-6 text-gray-500 text-center -mt-2 py-10'>
						Already have an Account?{' '}
						<button
							onClick={() => setLogin(true)}
							className='text-gray-500 font-semibold underline underline-offset-2 decoration-[1px] hover:text-red-700 duration-200'
						>
							Login
						</button>
					</p>

				</div>
			)}
		</div>
	)
}

export default Registration