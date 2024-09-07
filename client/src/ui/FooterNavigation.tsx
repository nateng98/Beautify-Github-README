import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'

const FooterNavigation = () => {
	const customerSupportLinks = [
		{name: 'Contact Us', href: '*'},
		{name: 'Help Center', href: '*'},
		{name: 'Return & Exchanges', href: '*'},
		{name: 'About ElectraHub Market', href: '*'},
	]

	const aboutUstLinks = [
		{name: 'Careers', href: '*'},
		{name: 'Corporate Information', href: '*'},
		{name: 'Newsroom', href: '*'},
	]

  return (
	<Container className='flex flex-col md:flex-row gap-10'>
		<div className='flex flex-col md:flex-row basis-full'>
			{/* left side */}
			<div className='basis-1/2'>
				<h3 className='text-xl font-medium text-gray-900 mb-2'>Customer Support</h3>
				<ul>
					{customerSupportLinks.map((csLink) => (
						<Link to={csLink?.href}>
							<li key={csLink?.name}>{csLink?.name}</li>
						</Link>
					))}
				</ul>
			</div>
			{/* right side */}
			<div className='basis-1/2'>
				<h3 className='text-xl font-medium text-gray-900 mb-2'>About Us</h3>
				<ul>
					{aboutUstLinks.map((abLink) => (
						<Link to={abLink?.href}>
							<li key={abLink?.name}>{abLink?.name}</li>
						</Link>
					))}
				</ul>
			</div>
		</div>

		<div>
			<h3 className='text-xl font-medium text-gray-900 mb-2'>Sign up for emails</h3>
			<p>Sign up and be the first to hear about the hottest offers, new products, and exclusive sales</p>
			<p>Email Address:</p>
			<div className='flex flex-row border p-1 rounded-full w-full md:w-11/12 mt-2'>
				<input type="text" placeholder='Enter email address' className='p-3 focus:outline-none flex-grow' />
				<button className='p-3 rounded-full bg-darkText text-whiteText flex-shrink-0'>Submit</button>
			</div>
		</div>
	</Container>
  )
}

export default FooterNavigation