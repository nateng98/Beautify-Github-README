import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import CheckoutBtn from '../components/CheckoutBtn';
import Container from '../components/Container';
import FormattedPrice from '../components/FormattedPrice';
import { store } from '../lib/store';

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState({regular:0, discounted: 0})
  const { cartProduct } = store();
  const shippingAmt = 35;
  const taxPercent = 12;

  useEffect(() => {
    const totals = cartProduct.reduce(
      (sum, product) => {
        sum.regular += product?.regularPrice * product?.quantity;
        sum.discounted += product?.discountedPrice * product?.quantity;
        return sum;
      },
      { regular: 0, discounted: 0 }
    );
    setTotalAmount(totals);
  }, [cartProduct]);

  const taxAmount = totalAmount?.discounted * taxPercent/100;
  // console.log(taxAmount)

  return (
	<Container>
    {cartProduct.length > 0 ? (
      <>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart</h1>
        <div className='mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <section className='lg:col-span-7'>
            <div className='divide-y divide-gray-200 border-b border-t border-gray-200'>
              {cartProduct.map((product) => (
                <CartProduct product={product} key={product?._id}/>
              ))}
            </div>
          </section>
          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            <dl className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>Subtotal</dt>
                <dd className='text-sm font-medium text-gray-900'>
                  <FormattedPrice amount={totalAmount?.regular} />
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>

                    <FaQuestionCircle
                      className="h-5 w-5 text-gray-400 ml-2"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {totalAmount?.discounted > 35 ? (
                      <span>Free</span>
                    ) : (
                      <FormattedPrice amount={shippingAmt} />
                    )}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>

                    <FaQuestionCircle
                      className="h-5 w-5 text-gray-400 ml-2"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    <FormattedPrice amount={taxAmount} />
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Total Discount
                  </dt>
                  <dd className="text-base font-medium text-gray-500">
                    <FormattedPrice
                      amount={totalAmount?.regular - totalAmount?.discounted}
                    />
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-lg font-bold text-gray-900">
                    {totalAmount?.discounted > 35 ? (
                      <FormattedPrice
                      amount={totalAmount?.discounted + taxAmount}
                    />
                    ) : (
                      <FormattedPrice
                      amount={totalAmount?.discounted + shippingAmt + taxAmount}
                    />
                    )}
                  </dd>
                </div>
            </dl>

            <CheckoutBtn products={cartProduct} />
          </section>
        </div>
      </>
    ) : (
    <div className='h-96 flex flex-col gap-2 items-center justify-center py-5'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart</h1>
      <div className='flex justify-between items-center gap-10'>
        <FiShoppingCart className='text-[100px]'/>
        <div>
          <p className='text-4xl max-w-[600px] text-gray-600 leading-10'>
            Looks like your cart is empty!
          </p>
          <p className='text-xl mt-3'>
            Why not adding something?!  
          </p>  
        </div>
      </div>
      <Link to={'/product'} className='bg-darkText text-whiteText px-8 py-4 rounded-full hover:bg-red-700 uppercase text-sm '>Go to shopping</Link>
    </div>
    )}
  </Container>
  )
}

export default Cart