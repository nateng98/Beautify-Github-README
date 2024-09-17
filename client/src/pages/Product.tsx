import _ from 'lodash';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { config } from '../../config';
import { ProductProps } from '../../type';
import { productPayment } from '../assets';
import AddToCartBtn from '../components/AddToCartBtn';
import CategoryFilters from '../components/CategoryFilters';
import Container from '../components/Container';
import DisplayRating from '../components/DisplayRating';
import FormattedPrice from '../components/FormattedPrice';
import Loading from '../components/Loading';
import PriceTag from '../components/PriceTag';
import ProductCard from '../components/ProductCard';
import { getData } from '../lib';

const Product = () => {
	const [productData, setProductData] = useState<ProductProps | null>(null);
	const [allProducts, setAllProducts] = useState<ProductProps[]>([])
	const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [color, setColor] = useState('');

	const {id} = useParams();
	const endpoint = id ? `${config?.baseUrl}/products/${id}` : `${config?.baseUrl}/products/` 

	useEffect(() => {
		const fetchData = async() => {
			try {
				setLoading(true);
				const data = await getData(endpoint);
        if(id) {
          setProductData(data);
          setAllProducts([]);
        } else {
          setAllProducts(data);
          setProductData(null);
        }
			} catch (error) {
				console.error('Error fetching data', error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	},[id, endpoint]);

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images[0]);
      setColor(productData?.colors[0]);
    }
  }, [productData]);

	return (
		<div>
      {
        loading ? <Loading /> 
        : 
        <Container>
          {!!id && productData && _.isEmpty(allProducts) ? 
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-start'>
              <div>
                {productData?.images?.map((item, index) => (
                  <img key={index} src={item} alt='img' 
                    className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-100 
                    ${imgUrl === item && 'border border-gray-500 rounded-sm opacity-100'}`}
                    onClick={() => setImgUrl(item)}
                  />
                ))}
              </div>
              <div>
                <img src={imgUrl} alt='mainImage' className='w-[500px] h-[500px]' />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <h2 className='text-3xl font-bold'>{productData?.name}</h2>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <DisplayRating rating={productData?.rating} />
                  <p className='text-base font-semibold'>{`(${productData?.reviews} reviews)`}</p>
                </div>
                <PriceTag 
                  regularPrice={productData?.regularPrice}
                  discountedPrice={productData?.discountedPrice}
                  largeText='text-3xl'
                  smallText='text-xl'
                />
              </div>
              <p>
                You are saving{' '}
                <span className='text-base font-semibold text-green-500'>
                  <FormattedPrice
                    amount={
                      productData?.regularPrice! -
                      productData?.discountedPrice!
                    }
                  />
                </span>{' '}
                upon purchase
              </p>
              <div>
                {color && (
                  <p className='mb-2'>
                    Color:{' '}
                    <span
                      className='font-semibold capitalize'
                      style={{ color: color }}
                    >
                      {color}
                    </span>
                  </p>
                )}
                <div className='flex items-center gap-x-4'>
                  {productData?.colors.map((item) => (
                    <div
                      key={item}
                      className={`
                        ${item === color
                          ? 'border border-black p-0.5 rounded-full'
                          : 'border-transparent'
                        }`}
                    >
                      <div
                        className='w-7 h-7 rounded-full cursor-pointer'
                        style={{ backgroundColor: item }}
                        onClick={() => setColor(item)}
                      />
                    </div>
                  ))}
                </div>
                {color && (
                    <button
                      onClick={() => setColor('')}
                      className='font-semibold mt-1 flex items-center gap-1 hover:text-red-600 duration-200'
                    >
                      <IoClose /> Clear
                    </button>
                  )}
                </div>
                <p>
                  Brand:{' '}
                  <span className='font-medium'>{productData?.brand}</span>
                </p>
                <p>
                  Category:{' '}
                  <span className='font-medium'>{productData?.category}</span>
                </p>
                <AddToCartBtn
                  product={productData}
                  title='Buy now'
                  className='bg-darkText py-3 text-base text-whiteText hover:scale-100 hover:bg-red-700 duration-200'
                  showPrice={false}
                />
                <div className='bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2'>
                  <img
                    src={productPayment}
                    alt='payment'
                    className='w-auto object-cover'
                  />
                  <p className='font-semibold'>
                    Guaranteed safe & secure checkout
                  </p>
              </div>
            </div>
          </div>
          : 
          <div>
            <p className='text-4xl font-semibold mb-5 text-center'>Our Collection</p>
            <div className='flex items-start gap-10'>
              <CategoryFilters id={id}/>
              <div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                  {allProducts?.map((item:ProductProps) => (
                    <ProductCard key={item?._id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div> }
        </Container>
      }
    </div>
	)
}

export default Product