import { Link } from 'react-router-dom';
import Container from '../components/Container';

const Cancel = () => {
  return (
    <Container>
      <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
        <h2 className='text-2xl md:text-5xl font-bold text-center'>
          Your payment has been cancelled
        </h2>
        <p className='text-lg'>
          Please try again by going to your cart or continue shopping
        </p>
        <div className='flex flex-col lg:flex-row items-center gap-5'>
          <Link to={'/cart'}>
            <button className='bg-darkText text-whiteText w-52 h-12 rounded-full text-base font-semibold hover:bg-red-700 duration-300'>
              View Your Cart
            </button>
          </Link>
          <Link to={'/'}>
            <button className='bg-darkText text-whiteText w-52 h-12 rounded-full text-base font-semibold hover:bg-red-700 duration-300'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cancel;