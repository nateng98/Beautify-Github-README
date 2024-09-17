import { NewsProps } from '../../type'
import { fetchHelper } from '../lib'
import Container from './Container'
import Title from './Title'

const News = () => {
	const newsData = fetchHelper({props: 'news'})
	return (
		<Container className='mb-10 md:mb-20'>
			<Title text='Our News' className='text-center' />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-7'>
				{newsData.map((item: NewsProps) => (
					<div key={item?._id} className='group cursor-pointer'>
						<div>
							<img src={item?.image} alt="newsImage" className='w-full h-60 object-cover group-hover:scale-105 duration-300' />
						</div>
						<div className='mt-5'>
							<p className='text-sm uppercase font-medium text-gray-500'>{item?._base}</p>
							<p className='text-2xl font-bold line-clamp-2'>{item?.title}</p>
						</div>
					</div>
				))}
			</div>
		</Container>
	)
}

export default News