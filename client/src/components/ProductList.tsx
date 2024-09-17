import { Link } from 'react-router-dom'
import Container from './Container'
import Pagination from './Pagination'
import Title from './Title'

const ProductList = () => {
	return (
		<Container>
			<div className='mb-10'>
				<div className='flex items-center justify-between'>
					<Title text='Top Sellers'/>
					<Link to={'/product'}>
						View All Products
					</Link>
				</div>
				<div className='w-full h-[1px] bg-gray-200 mt-3' />
			</div>
			{/* Pagination */}
			<Pagination />
		</Container>
	)
}

export default ProductList