import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UserTypes } from '../../type';
import { auth } from '../lib/firebase';
import Container from './Container';

const UserInfo = ({ currentUser }: UserTypes) => {
  console.log(currentUser);

  return (
    <Container className=' text-darkText'>
      <div className='relative isolate overflow-hidden bg-neutral-100 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16'>
        <div className='flex flex-col sm:flex-row items-center gap-5 sm:gap-10'>
          <img
            src={
              currentUser?.avatar
                ? currentUser?.avatar
                : 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'
            }
            alt='userImage'
            className='w-60 h-60 rounded-full border border-red-700 object-cover p-1'
          />
          <div className='text-start flex-1'>
            <h2 className='text-xl font-bold tracking-tight sm:text-6xl'>
              Welcome back, {' '}
              <span className=' decoration-[1px] font-medium'>
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </h2>
            <p className='text-start *:mt-6 max-w-3xl text-2xl mt-3 leading-6 text-gray-500'>
              N/A
            </p>
          </div>
        </div>
        <div className='mt-10 flex flex-col lg:flex-row items-center gap-3 px-4 justify-end'>
          <Link
            to={'/orders'}
            className='rounded-full bg-darkText px-8 py-2.5 text-sm font-semibold  text-whiteText hover:bg-red-700 duration-300'
          >
            Your Orders
          </Link>
          <button
            onClick={() =>
              toast.error('Currently not available')
            }
            className='rounded-full bg-darkText px-8 py-2.5 text-sm font-semibold  text-whiteText hover:bg-red-700 duration-300'
          >
            Edit profile
          </button>
          <button
            onClick={() => auth.signOut()}
            className='rounded-full bg-darkText px-8 py-2.5 text-sm font-semibold  text-whiteText hover:bg-red-700 duration-300'
          >
            Logout
          </button>
        </div>
      </div>
    </Container>
  );
};

export default UserInfo;