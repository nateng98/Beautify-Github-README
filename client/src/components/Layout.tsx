import React from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<div className='flex-grow'>
				{children}
			</div>
			<Footer />
			<Toaster
				position='bottom-center'
				reverseOrder={false}
				gutter={8}
				containerClassName=''
				toastOptions={{
					style: {
						backgroundColor: '#b91c1c',
						color: 'white',
					},
				}}
			/>
		</div>
	)
}

export default Layout