import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { IoClose, IoMenuSharp, IoSearchOutline } from 'react-icons/io5';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CategoryProps, ProductProps } from '../../type';
import { ehlogo } from '../assets';
import { fetchHelper } from '../lib';
import { store } from '../lib/store';
import Container from './Container';
import ProductCard from './ProductCard';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const categories = fetchHelper({ props: 'categories' });
  const products = fetchHelper({ props: 'products' });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartProduct, favoriteProduct, currentUser } = store();
  const [isMobile, setIsMobile] = useState(false);

  // Function to check screen size
  const checkScreenSize = () => {
    // Use matchMedia to check if the screen width is less than or equal to 768px (common mobile size)
    if (window.innerWidth <= 768) {
      setIsMobile(true);  // Set the boolean to true for mobile
    } else {
      setIsMobile(false); // Otherwise set it to false
    }
  };

  // Use useEffect to run the function on component mount and on window resize
  useEffect(() => {
    // Check screen size initially on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Empty dependency array to run only on mount/unmount

  useEffect(() => {
    const filtered = products.filter((item: ProductProps) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  return (
    <div className='w-full bg-darkText text-whiteText md:sticky md:top-0 z-50'>
      <div className='max-w-screen-xl mx-auto h-20 lg:h-24 flex items-center justify-between px-4 lg:px-0'>
        {/* logo */}
        <Link to='/'>
          <img src={ehlogo} alt='electrahublogo' className='lg:max-w-80 max-w-48' />
        </Link>

        <NavigationButtons />

        {/* menu bar */}
        <div className='flex items-center gap-x-5 lg:gap-x-6 text-2xl mr-3 lg:mr-0'>
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                alt='profileImg'
                className='w-10 h-10 rounded-full object-cover'
              />
            ) : (
              <FiUser className='hover:text-skyText duration-200 cursor-pointer' />
            )}
          </Link>
          {/* Favorite */}
          <Link to='/favorite'>
            <div className='relative block'>
              <MdOutlineFavoriteBorder className='hover:text-redText duration-200 cursor-pointer' />
              {/* h-4 so adding leading-4 (line-height) makes sure the text is center within the circle */}
              {favoriteProduct?.length > 0 ? (
                <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4 text-center leading-4'>
                  {favoriteProduct?.length}
                </span>
              ) : (
                <></>
              )}
            </div>
          </Link>
          {/* shopping cart */}
          <Link to='/cart'>
            <div className='relative block'>
              <FiShoppingCart className='hover:text-redText duration-200 cursor-pointer' />
              {/* h-4 so adding leading-4 (line-height) makes sure the text is center within the circle */}
              {cartProduct?.length > 0 ? (
                <span className='inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4 text-center leading-4'>
                  {cartProduct?.length}
                </span>
              ) : (
                <></>
              )}
            </div>
          </Link>
        </div>
      </div>
      <Container className='py-2 lg:max-w-4xl flex items-center gap-5 justify-between'>
        {/* category */}
        <CategorySection categories={categories} isMobile={isMobile} />
        {/* search bar */}
        <SearchBar searchText={searchText} setSearchText={setSearchText} filteredProducts={filteredProducts} />
      </Container>
    </div>
  )
}

// search bar
const SearchBar = ({ searchText, setSearchText, filteredProducts }: { searchText: string; setSearchText: (text: string) => void; filteredProducts: ProductProps[] }) => {
  return (
    <>
      <div className='inline-flex max-w-4xl w-full relative'>
        <input type='text'
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

      {searchText && (
        <div className='absolute left-0 lg:left-1/2 top-40 lg:-translate-x-1/2 w-1/2 mx-auto max-h-[500px] px-10 py-5 bg-white z-20 overflow-y-scroll text-black shadow-lg shadow-darkText/25 scrollbar-hide'>
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {filteredProducts?.map((item: ProductProps) => (
                <ProductCard
                  key={item?._id}
                  item={item}
                  setSearchText={setSearchText}
                />
              ))}
            </div>
          ) : (
            <div className='py-4 w-full flex items-center justify-center rounded-md'>
              <p className='font-normal'>
                Nothing matches with your search keywords{' '}
                <span className='underline underline-offset-2 decoration-[1px] text-red-500 font-semibold'>{`${searchText}`}</span>
              </p>
              . Please try again
            </div>
          )}
        </div>
      )}
    </>
  )
}

const navigationLink = [
  { title: 'Home', link: '/' },
  { title: 'Orders', link: '/orders' },
  { title: 'Cart', link: '/cart' },
  { title: 'Our Products', link: '/product' },
];

// navigation
const NavigationButtons = () => {
  return (
    navigationLink.map(({ title, link }) => (
      <Link key={title} to={link}>
        <p className='uppercase py-1 hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group'>
          {title}
          <span className='inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300'></span>
        </p>
      </Link>
    ))
  )
}

// define the correct type for CategoryProps: ensuring that CategoryProps describes the shape of a single category object, an array of CategoryProps
const CategorySection = ({ categories, isMobile }: { categories: CategoryProps[]; isMobile: boolean }) => {
  return (
    <>
      <Menu>
        {isMobile ? (
          <MenuButton className='inline-flex items-center justify-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-whiteText'>
            <IoMenuSharp />
          </MenuButton>
        ) : (
          <MenuButton className='w-52 inline-flex items-center justify-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-whiteText'>
            Select Category <FaChevronDown />
          </MenuButton>
        )}
        <Transition
          enter='transition ease-out duration-75'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <MenuItems anchor='bottom' className='w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50'>
            {categories.map((item: CategoryProps) => (
              <MenuItem key={item?._id}>
                <Link to={`category/${item?._base}`} className='flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide'>
                  <img src={item?.image} alt='categoryImage' className='w-6 h-6 rounded-md' />{item?.name}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </>
  )
}

export default Header