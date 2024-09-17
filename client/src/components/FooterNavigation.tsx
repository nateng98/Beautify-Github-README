import { Link } from 'react-router-dom'
import Container from './Container'

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
	<Container className='flex flex-col md:flex-row gap-10 text-whiteText'>
		<div className='flex flex-col md:flex-row basis-full mt-8'>
			{/* left side */}
			<div className='basis-1/2'>
				<h3 className='text-xl font-medium mb-2'>Customer Support</h3>
				<ul>
					{customerSupportLinks.map((csLink, index) => (
						<Link key={index} to={csLink?.href}>
							<li key={csLink?.name}>{csLink?.name}</li>
						</Link>
					))}
				</ul>
			</div>
			{/* right side */}
			<div className='basis-1/2'>
				<h3 className='text-xl font-medium mb-2 mt-5 md:mt-0'>About Us</h3>
				<ul>
					{aboutUstLinks.map((abLink, index) => (
						<Link key={index} to={abLink?.href}>
							<li key={abLink?.name}>{abLink?.name}</li>
						</Link>
					))}
				</ul>
			</div>
		</div>

		<div>
			<h3 className='text-xl font-medium mb-2 mt-8'>Sign up for emails</h3>
			<p>Sign up and be the first to hear about the hottest offers, new products, and exclusive sales</p>
			<p className='mb-4'>Email Address:</p>
			<div className='flex flex-row border p-1 rounded-full w-full md:w-11/12 mt-2'>
				<input type="text" placeholder='Enter email address' className='p-3 focus:outline-none flex-grow bg-transparent' />
				<button className='p-3 rounded-full bg-red-700 text-whiteText flex-shrink-0'>Submit</button>
			</div>
		</div>
	</Container>
  )
}

export default FooterNavigation