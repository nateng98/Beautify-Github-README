'use client';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ProductProps } from '../../type';
import { fetchHelper } from '../lib';
import ProductCard from './ProductCard';

interface ItemsProps {
  currentItems: ProductProps[];
}

const Items = ({ currentItems }: ItemsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {currentItems &&
        currentItems?.map((item: ProductProps) => (
          <ProductCard key={item?._id} item={item} />
        ))}
    </div>
  );
};

const Pagination = () => {
	const products = fetchHelper({props: 'products'});
	// console.log('products', products);

	const itemsPerPage = 5;
	const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
	
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart = newOffset + 1;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    setItemStart(newStart);
		console.log(itemStart)
  };

	return (
		<>
			<Items currentItems={currentItems} />
			<div className='flex flex-col md:flex-row justify-center md:justify-between items-center'>
				<ReactPaginate 
				nextLabel='' 
				onPageChange={handlePageClick} 
				pageRangeDisplayed={3} 
				marginPagesDisplayed={2} 
				pageCount={pageCount}
				previousLabel=''
				pageLinkClassName='w-9 h-9 duration-300 flex justify-center items-center'
				pageClassName='mx-3 md:ml-0 md:mr-6 rounded-full bg-black text-white hover:bg-red-700 duration-300'
				containerClassName='flex text-base font-semibold py-10'
				activeClassName='bg-red-700 text-white'
			/>
				<p>Showing {Math.min(endOffset, products?.length)}{" "} of {products?.length} products</p>
			</div>
		</>
	)
}

export default Pagination