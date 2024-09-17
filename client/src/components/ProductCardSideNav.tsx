import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ProductProps } from '../../type';
import { store } from '../lib/store';

const ProductCardSideNav = ({ product }: { product?: ProductProps }) => {
	const { addToFavorite, favoriteProduct } = store();
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(
    null
  );

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = () => {
    if (product) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? `${product?.name.substring(0, 10)} removed from your favorite`
            : `${product?.name.substring(0, 10)} added to your favorite`
        );
      });
    }
  };
	return (
		<div className='absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300'>
			<span 
				onClick={handleFavorite}
				className='w-11 h-11 inline-flex text-darkText text-lg justify-center items-center rounded-full hover:text-whiteText hover:bg-red-700 duration-200'>
				{existingProduct ? <FaHeart /> : <FaRegHeart />}
			</span>
		</div>
	)
}

export default ProductCardSideNav