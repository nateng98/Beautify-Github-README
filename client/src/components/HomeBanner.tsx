import React from 'react';
import { twMerge } from 'tailwind-merge';
import { BannerProps } from '../../type';
import { fetchHelper } from '../lib';
import Container from './Container';
import LinkButton from './LinkButton';

interface BiggerBlockProps {
	banner: BannerProps; // The entire BannerProps object as a single prop
}

const HomeBanner = () => {
	const banners = fetchHelper({ props: 'banners' });
	console.log('banners:', banners)

	return (
		<Container className='pt-8 md:pt-10 relative overflow-hidden'>
			<div className='mx-auto grid grid-flow-dense grid-cols-12 gap-4 md:gap-8'>
				<BiggerBlock banner={banners[0]} />
				<SmallerBlocks />
			</div>
		</Container>
	)
}

interface BlockProps {
	className?: string;
	children?: React.ReactNode[];
}

const Block = ({ className, children }: BlockProps) => {
	return (
		<div className={twMerge('col-span-4 rounded-lg', className)}>
			{children}
		</div>
	)
}

const BiggerBlock = ({ banner }: BiggerBlockProps) => (
	<Block className='col-span-12 row-span-2 md:col-span-9'>
		<div className='relative'>
			<img src={banner?.image} alt="" className='w-full h-full object-cover rounded-md filter brightness-50' />
			<div className='absolute inset-0 flex flex-col justify-center px-5 md:px-10'>
				<h2 className='text-3xl md:text-5xl lg:text-7xl text-whiteText font-bold'>{banner?.name}</h2>
				<p className='text-base md:text-lg font-semibold leading-6 text-whiteText/90 max-w-[250px] mt-4'>{banner?.description}</p>
				<LinkButton className='w-44 flex items-center justify-center bg-darkText hover:bg-red-700 text-whiteText duration-200 mt-4' str='Shop Now' />
			</div>
		</div>
		<div></div>
	</Block>
);

const SmallerBlocks = () => (
	<>
		<Block className='col-span-6 bg-red-700 md:col-span-3 min-h-48'>
			<div className='relative grid h-full place-content-center'>
				<div
					className='absolute inset-0 w-full h-full rounded-md'
					style={{
						backgroundImage: 'url(https://nypost.com/wp-content/uploads/sites/2/2022/08/back-to-school-sales.jpg?quality=75&strip=all)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						opacity: '0.5'
					}}
				/>
				<h3 className='text-center font-bold text-2xl text-whiteText z-10'>Back to School<br /><span className='text-6xl'>SALE!</span></h3>
			</div>
			<div></div>
		</Block>
		<Block className='col-span-6 bg-darkText md:col-span-3 min-h-48'>
			<div className='relative grid h-full place-content-center'>
				<div
						className='absolute inset-0 w-full h-full rounded-md'
						style={{
							backgroundImage: 'url(https://www.zdnet.com/a/img/resize/8b5a12b9b5fd58fd1943604699993f1e6469be19/2023/08/22/71f6e0b9-3405-43ea-972c-202a7c8bf615/best-phones-zdnet-thumb-image.jpg?auto=webp&fit=crop&height=675&width=1200)',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							opacity: '0.2'
						}}
					/>
					<h3 className='text-center text-xl lg:text-2xl text-whiteText z-10'>
						<span className='font-bold text-2xl'>
							AMAZING
						</span>
						<br/>smartphone offers
					</h3>
					<p className='text-center font-semibold text-xl lg:text-2xl text-red-700 mt-4 z-10'><span className='bg-whiteText font-bold p-2'>FROM $30</span></p>
				</div>
			<div></div>
		</Block>
	</>
);

export default HomeBanner