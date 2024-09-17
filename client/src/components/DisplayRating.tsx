import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

// The object { rating: item?.rating } is not a number itself; it has a rating property that contains the number.
const DisplayRating = ({ rating }: { rating: number }) => {
	const fullStartNum = Math.floor(rating);
	const isHalfStar = rating % 1 >= 0.5;
	const maxStar = 5;

	return (
		<div className='text-base text-red-700 flex items-center'>
			{/* Loop to display full stars */}
			{[...Array(fullStartNum)].map((_, index) => (
				<FaStar key={index} />
			))}

			{/* Display half star if applicable */}
			{isHalfStar && <FaStarHalfAlt />}

			{/* Display remaining empty stars */}
			{[...Array(maxStar - fullStartNum - (isHalfStar ? 1 : 0))].map((_, index) => (
				<FaRegStar key={index} />
			))}
			<span className='text-xs text-lightText ml-1'>({rating})</span>
		</div>
	)
}

export default DisplayRating