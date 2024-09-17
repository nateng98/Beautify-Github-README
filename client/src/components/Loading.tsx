import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
	return (
		<div className='w-full h-full bg-black/80 absolute top-0 left-0 flex flex-col gap-1 items-center justify-center'>
			<ColorRing
				visible={true}
				height="100"
				width="100"
				ariaLabel="color-ring-loading"
				wrapperStyle={{}}
				wrapperClass="color-ring-wrapper"
				colors={['#ece2029', '#d65e5e', '#e88b8b', '#8a8a8a', '#696969']}
			/>
			<p className='text-white text-2xl font-bold tracking-widest'>Loading...</p>
		</div>
	)
}

export default Loading