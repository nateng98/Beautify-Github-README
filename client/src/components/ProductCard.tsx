import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductProps } from '../../type';
import AddToCartBtn from './AddToCartBtn';
import DisplayRating from './DisplayRating';
import FormattedPrice from './FormattedPrice';
import ProductCardSideNav from './ProductCardSideNav';

interface Props {
	item: ProductProps;
	setSearchText?: any;
};

const ProductCard = ({item, setSearchText } : Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigation = useNavigate();
	const open = () => {
		setIsOpen(true);
	}
	const close = () => {
		setIsOpen(false);
	}
	const percentage = ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice)*100;
	const handleProduct = () => {
		navigation(`/product/${item?._id}`);
		setSearchText && setSearchText('');
	}

	return (
		<div className='border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer'>
			<div className='w-full h-60 relative p-2 group'>
				<span onClick={open} className='bg-red-700 text-whiteText absolute left-0 right-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10'>
					Save {percentage.toFixed(0)}%
				</span>
				<img 
					onClick={handleProduct}
					src={item?.images[0]}
          alt='productImage'
          className='w-full h-full rounded-md object-cover group-hover:scale-105 duration-300 z-0' />
				{/* sidebar on hover */}
				<ProductCardSideNav product={item}/>
			</div>
			<div className='flex flex-col gap-2 px-2 pb-2 z-10'>
				<h3 className='text-xs uppercase font-semibold text-lightText'>{item?.overView}</h3>
				<h2 className='text-lg font-bold line-clamp-2'>{item?.name}</h2>
				<DisplayRating rating={item?.rating} />
				<AddToCartBtn product={item} />
			</div>
			<Transition appear show={isOpen} >
				<Dialog
					as='div'
          className='relative z-10'
          onClose={close}
				>
					<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4'>
							<TransitionChild
								enter='ease-out duration-300'
                enterFrom='opacity-0 transform-[scale(95%)]'
                enterTo='opacity-100 transform-[scale(100%)]'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 transform-[scale(100%)]'
                leaveTo='opacity-0 transform-[scale(95%)]'
							>
								<DialogPanel className='w-full max-w-md rounded-xl bg-whiteText border-gray-300 border-4 backdrop-blur-3xl z-50 p-6'>
									<DialogTitle
										as='h3'
                    className='text-2xl font-medium text-darkText'
									>
										Don't miss this great deal!
									</DialogTitle>
									<p className='mt-2 text-sm/6 text-darkText/75'>
										You are going to save{' '}
										<span className='text-red-700 font-bold'>
											<FormattedPrice
												amount={item?.regularPrice - item?.discountedPrice}
											/>{' '}
										</span>
										from this product.
									</p>
									<p className='text-sm/6 text-darkText/75'>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, consequatur?
									</p>
									<div className='mt-4'>
										<Button
											className='inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[open]:bg-darkText data-[focus]:outline-1 data-[focus]:outline-white'
											onClick={close}
										>
											Got it, thanks!
										</Button>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default ProductCard