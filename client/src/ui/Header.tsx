import React, { useState } from 'react'
import { ehlogo } from '../assets'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Container from './Container';
import { FaChevronDown } from 'react-icons/fa6';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  return (
	<div className='w-full bg-whiteText'>
    <div className='max-w-screen-xl mx-auto h-20 lg:h-24 flex items-center justify-between px-4 lg:px-0'>
      {/* logo */}
      <img src={ehlogo} alt="electrahublogo" className='lg:max-w-80 max-w-48'/>
      {/* search bar */}
      <div className='hidden md:inline-flex max-w-3xl w-full relative'>
        <input type="text" 
          // useState to set searchText and set value for input box 
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}

          placeholder='Search products' 
          className='w-full flex-1 rounded-full text-gray-900 text-lg 
          placeholder:text-base placeholder:tracking-wide 
          placeholder:font-normal
          shadow-sm
          ring-1 ring-inset ring-gray-300
          sm:text-sm px-4 py-2'/>

        {!searchText ? (
          <IoSearchOutline className='absolute top-2.5 right-4 text-xl' />
        ) : (
          <IoClose 
            onClick={() => setSearchText('')}
            className='absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200' />
        )} 
      </div>
      {/* menu bar */}
      <div className='flex items-center gap-x-5 lg:gap-x-6 text-2xl mr-3 lg:mr-0'>
        <FiUser className='hover:text-blueText duration-200 cursor-pointer' />
        {/* Favorite */}
        <div className='relative block'>
          <MdOutlineFavoriteBorder className='hover:text-blueText duration-200 cursor-pointer' />
          {/* h-4 so adding leading-4 (line-height) makes sure the text is center within the circle */}
          <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4 text-center leading-4'>0</span>
        </div>
        {/* shopping cart */}
        <div className='relative block'>
          <FiShoppingCart className='hover:text-blueText duration-200 cursor-pointer' />
          {/* h-4 so adding leading-4 (line-height) makes sure the text is center within the circle */}
          <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4 text-center leading-4'>0</span>
        </div>
      </div>
    </div>
    {/* category */}
    <CategorySection />
  </div>
  )
}

const navigationLink = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
];

const CategorySection = () => {
 return (
  <div className='w-full bg-darkText text-whiteText'>
    <Container className='py-2 max-w-4xl flex items-center gap-5 justify-between'>
      <p className='flex items-center gap-1'>Select Category <FaChevronDown /></p>
      {
        navigationLink.map(({title, link}) => (
          <p key={title} className='uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group'>
            {title}
            <span className='inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300'></span>
          </p>
        ))
      }
    </Container>
  </div>
 )
}

export default Header