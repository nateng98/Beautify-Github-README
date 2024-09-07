import React, { useState } from 'react'
import { ehlogo } from '../assets'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import Container from './Container';
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { fetchHelper } from '../lib';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { CategoryProps } from '../../type';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const categories = fetchHelper({props: 'categories'});

  return (
	<div className='w-full bg-whiteText md:sticky md:top-0 z-50'>
    <div className='max-w-screen-xl mx-auto h-20 lg:h-24 flex items-center justify-between px-4 lg:px-0'>
      {/* logo */}
      <Link to='/'>
        <img src={ehlogo} alt="electrahublogo" className='lg:max-w-80 max-w-48'/>
      </Link>
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
        <Link to='/profile'>
          <FiUser className='hover:text-blueText duration-200 cursor-pointer' />
        </Link>
        {/* Favorite */}
        <Link to='/favorite'>
          <div className='relative block'>
            <MdOutlineFavoriteBorder className='hover:text-blueText duration-200 cursor-pointer' />
            {/* h-4 so adding leading-4 (line-height) makes sure the text is center within the circle */}
            <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4 text-center leading-4'>0</span>
          </div>
        </Link>
        {/* shopping cart */}
        <Link to='/cart'>
          <div className='relative block'>
            <FiShoppingCart className='hover:text-blueText duration-200 cursor-pointer' />
            {/* h-4 so adding leading-4 (line-height) makes sure the text is center within the circle */}
            <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4 text-center leading-4'>0</span>
          </div>
        </Link>
      </div>
    </div>
    {/* category */}
    <CategorySection categories={categories} />
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

// define the correct type for CategoryProps: ensuring that CategoryProps describes the shape of a single category object, an array of CategoryProps
const CategorySection = ({categories}:{categories: CategoryProps[]}) => {
 return (
  <div className='w-full bg-darkText text-whiteText'>
    <Container className='py-2 max-w-4xl flex items-center gap-5 justify-between'>
      <Menu>
        <MenuButton className='w-52 inline-flex items-center justify-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-whiteText'>
          Select Category <FaChevronDown />
        </MenuButton>
        <Transition 
          enter='transition ease-out duration-75'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <MenuItems anchor='bottom' className='w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50'>
            {categories.map((item:CategoryProps) => (
              <MenuItem key={item?._id}>
                <Link to={`categories/${item?._base}`} className='flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide'>
                  <img src={item?.image} alt="categoryImage" className='w-6 h-6 rounded-md'/>{item?.name}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
      {
        navigationLink.map(({title, link}) => (
          <Link key={title} to={link}>
            <p className='uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group'>
            {title}
            <span className='inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300'></span>
          </p>
          </Link>
        ))
      }
    </Container>
  </div>
 )
}

export default Header