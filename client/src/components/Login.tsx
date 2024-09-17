import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../lib/firebase';
import Label from './Label';
import Loading from './Loading';

const Login = ({ setLogin }: { setLogin: any }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.target);
      const { email, password }: any = Object.fromEntries(formData);

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Email or Password not matched';
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
    <div className='bg-neutral-100 rounded-lg'>
      <form
        onSubmit={handleLogin}
        className='max-w-5xl mx-auto pt-10 px-10 lg:px-0 text-darkText'
      >
        <div className='border-b border-b-white/10 pb-5'>
          <h2 className='text-lg font-semibold uppercase leading-7'>
            Sign In
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-500'>
            Please sign in with your email
          </p>
        </div>
        <div className='border-b border-b-white/10 pb-5'>
          <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <Label title='Email address' htmlFor='email' />
              <input
                type='email'
                name='email'
                className='block w-full rounded-md border-0 bg-whiteText py-1.5 px-4 outline-none text-darkText shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 mt-2'
              />
            </div>
            <div className='sm:col-span-3'>
              <Label title='Password' htmlFor='password' />
              <input
                type='password'
                name='password'
                className='block w-full rounded-md border-0 bg-whiteText py-1.5 px-4 outline-none text-darkText shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 mt-2'
              />
            </div>
          </div>
        </div>
        {errMsg && (
          <p className=' text-red-700 text-center py-1 rounded-md tracking-wide font-semibold'>
            {errMsg}
          </p>
        )}
        <button
          //   disabled={loading}
          type='submit'
          className='mt-5 bg-darkText w-full py-2 uppercase text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-red-700 duration-200'
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p className='text-sm leading-6 text-gray-400 text-center -mt-2 py-10'>
        Does not have an Account?{' '}
        <button
          onClick={() => setLogin(false)}
          className='text-gray-500 font-semibold underline underline-offset-2 decoration-[1px] hover:text-red-700 duration-200'
        >
          Register
        </button>
      </p>
      {loading && <Loading />}
    </div>
  );
};

export default Login;