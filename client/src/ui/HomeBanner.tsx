import React from 'react'
import Container from './Container'
import LinkButton from './LinkButton'
import { fetchHelper } from '../lib';
import { BannerProps } from '../../type';

const HomeBanner = () => {
	const banners = fetchHelper({props: 'banners'});
	console.log('banners:', banners)

  return (
	<Container className='py-5 relative overflow-hidden'>
			{banners.map((banner:BannerProps, index) => (
				<div key={index}>
					<div className='relative h-[800px]'>
						<img src={banner?.image} alt="" className='w-full h-full object-cover rounded-md'/>
						<div className='w-full h-full absolute top-0 left-0 bg-black/10'></div>
					</div>
					<div className='absolute inset-0 flex flex-col justify-center px-10'>
						<h2 className='text-xl md:text-4xl lg:text-6xl text-whiteText font-bold'>{banner?.name}</h2>
						<p className='text-base md:text-lg font-semibold leading-6 text-whiteText/90 max-w-[250px] mt-4'>{banner?.description}</p>
						<LinkButton className='w-44 flex items-center justify-center bg-whiteText text-darkText hover:bg-darkText hover:text-whiteText duration-200 mt-4' str='Shop Now' />
					</div>
				</div>
			))}
	</Container>
  )
}

export default HomeBanner