import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { OrderTypes, ProductProps } from '../../type';
import Container from '../components/Container';
import FormattedPrice from '../components/FormattedPrice';
import Loading from '../components/Loading';
import { db } from '../lib/firebase';
import { store } from '../lib/store';

const Orders = () => {
  const { currentUser } = store();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'orders', currentUser?.email!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const orderData = docSnap?.data()?.orders;
          setOrders(orderData);
        } else {
          console.log('No orders yet!');
        }
      } catch (error) {
        console.log('Data fetching error', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : orders?.length > 0 ? (
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-4xl font-bold mb-2'>Customer order details</h2>
          <p className='text-gray-600'>
            Customer Name:{' '}
            <span className='text-red-700 font-semibold'>
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
          </p>
          <p className='text-gray-600'>
            Total Orders:{' '}
            <span className='font-semibold text-red-700'>{orders?.length}</span>
          </p>
          <p className='text-sm max-w-[600px] tracking-wide text-gray-500'>
            Shipping Date: N/A
          </p>
          <div className='flex flex-col gap-3'>
            <div className='space-y-6 divide-y divide-gray-900/10'>
              {orders?.map((order: OrderTypes) => {
                const totalAmt = order?.orderItems.reduce(
                  (acc, item) =>
                    acc + (item?.discountedPrice * 1.12 * item?.quantity || 0),
                  0
                );
                return (
                  <Disclosure as='div' key={order?.paymentId} className='pt-6'>
                    {({ open }) => (
                      <>
                        <dt>
                          <DisclosureButton className='flex w-full items-center justify-between text-left text-gray-900'>
                            <p className='text-base font-semibold leading-7 break-words'>
                              Tracking number:{' '}
                              <span className='font-normal'>
                                {order?.paymentId.substring(0, 20)}...
                              </span>
                            </p>
                            <span className='text-2xl'>{open ? <FaChevronUp /> : <FaChevronDown />}</span>
                          </DisclosureButton>
                        </dt>
                        <DisclosurePanel as='dd' className='mt-5'>
                          <div className='flex flex-col gap-2 bg-[#f4f4f480] p-5 border border-gray-200'>
                            <p className='text-base font-semibold break-words'>
                              Your order{' '}
                              <span className='text-skyText underline text-red-700'>
                                #{order?.paymentId}
                              </span>{' '}
                              has been shipped.
                            </p>
                            <div className='flex flex-col gap-1'>
                              <p className='text-gray-600'>
                                Order Item Count:{' '}
                                <span className='text-black font-medium'>
                                  {order?.orderItems?.length}
                                </span>
                              </p>
                              <p className='text-gray-600'>
                                Payment Status:{' '}
                                <span className='text-black font-medium'>
                                  Paid by Stripe
                                </span>
                              </p>
                              <p className='text-gray-600'>
                                Order Amount:{' '}
                                <span className='text-black font-medium'>
                                  <FormattedPrice amount={totalAmt} />
                                </span>
                              </p>
                            </div>
                            {order?.orderItems?.map((item: ProductProps) => (
                              <div
                                key={item?._id}
                                className='flex space-x-6 border-b border-gray-200 py-3'
                              >
                                <Link
                                  to={`/product/${item?._id}`}
                                  className='h-20 w-20 flex-none sm:h-40 sm:w-40 rounded-lg bg-gray-100 border border-gray-300 hover:border-skyText overflow-hidden'
                                >
                                  <img
                                    src={item?.images[0]}
                                    alt='productImg'
                                    className='h-full w-full object-cover object-center hover:scale-110 duration-300'
                                  />
                                </Link>
                                <div className='flex flex-auto flex-col'>
                                  <div>
                                    <Link
                                      to={`/product/${item?._id}`}
                                      className='font-medium text-gray-900'
                                    >
                                      {item?.name}
                                    </Link>
                                    <p className='mt-2 text-sm text-gray-900 lg:inline-block hidden'>
                                      {item?.description}
                                    </p>
                                  </div>
                                  <div className='mt-6'>
                                    <dl className='flex flex-col lg:flex-row divide-x divide-gray-200 text-sm lg:space-x-6 gap-y-1'>
                                      <div className='flex'>
                                        <dt className='font-medium text-gray-900'>
                                          Quantity:
                                        </dt>
                                        <dd className='lg:ml-2 text-gray-700'>
                                          {item?.quantity}
                                        </dd>
                                      </div>
                                      <div className='flex lg:pl-6'>
                                        <dt className='text-black font-bold'>
                                          Price:
                                        </dt>
                                        <dd className='lg:ml-2 text-gray-700'>
                                          <span className='text-black font-bold'>
                                            <FormattedPrice
                                              amount={item?.discountedPrice * 1.12}
                                            />
                                          </span>
                                        </dd>
                                      </div>
                                      <div className='flex lg:pl-6'>
                                        <dt className='font-medium text-gray-900'>
                                          SubTotal:
                                        </dt>
                                        <dd className='lg:ml-2 text-gray-700'>
                                          <span className='text-black font-bold'>
                                            <FormattedPrice
                                              amount={
                                                item?.discountedPrice * 1.12 * item?.quantity
                                              }
                                            />
                                          </span>
                                        </dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <p className='text-2xl lg:text-4xl font-semibold'>No orders yet</p>
          <p>You did not create any purchase from us</p>
          <Link
            to={'/product'}
            className='mt-2 bg-darkText text-gray-100 px-6 py-2 rounded-full hover:bg-red-700 hover:text-white duration-200'
          >
            Go to Shopping
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Orders;