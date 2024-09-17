import { IoIosHeartDislike } from "react-icons/io";
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import FavoriteProduct from '../components/FavoriteProduct';
import { store } from '../lib/store';

const Favorite = () => {
  const { favoriteProduct } = store();
  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <div>
          <div className='border-b border-b-gray-300 pb-6'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Favorite Products
            </h2>
          </div>
          <div className='mt-6 flow-root px-4 sm:mt-10 sm:px-0'>
            <div className='-my-6 divide-y divide-gray-200 sm:-my-10'>
              {favoriteProduct?.map((product) => (
                <FavoriteProduct key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='h-96 flex flex-col gap-2 items-center justify-center py-5'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Nothing added to Favorite
          </h1>
          <div className='flex justify-between items-center gap-10'>
            <IoIosHeartDislike className='text-[100px]'/>
            <div>
              <p className='text-4xl max-w-[600px] text-gray-600 leading-10'>
                Nothing in your favorite list!
              </p>
              <p className='text-xl mt-3'>
                Why not adding something?!  
              </p>  
            </div>
          </div>
          <Link
            to={'/product'}
            className='bg-darkText text-whiteText px-8 py-4 rounded-full hover:bg-red-700 uppercase text-sm '
          >
            Add Products
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Favorite;