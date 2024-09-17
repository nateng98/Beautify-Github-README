import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Loading from '../components/Loading';
import { db } from '../lib/firebase';
import { store } from '../lib/store';

const Success = () => {
  const { currentUser, cartProduct, resetCart } = store();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!sessionId) {
      navigate('/');
    } else if (cartProduct.length > 0) {
      const saveOrder = async () => {
        try {
          setLoading(true);
          const orderRef = doc(db, 'orders', currentUser?.email!);
          const docSnap = await getDoc(orderRef);
          if (docSnap.exists()) {
            // Document exists, update the orderItems array
            await updateDoc(orderRef, {
              orders: arrayUnion({
                userEmail: currentUser?.email,
                paymentId: sessionId,
                orderItems: cartProduct,
                paymentMethod: 'stripe',
                userId: currentUser?.id,
              }),
            });
          } else {
            // Document doesn't exist, create a new one
            await setDoc(orderRef, {
              orders: [
                {
                  userEmail: currentUser?.email,
                  paymentId: sessionId,
                  orderItems: cartProduct,
                  paymentMethod: 'stripe',
                },
              ],
            });
          }
          toast.success('Payment accepted successfully & order saved!');
          resetCart();
        } catch (error) {
          toast.error('Error saving order data');
        } finally {
          setLoading(false);
        }
      };
      saveOrder();
    }
  }, [sessionId, navigate, currentUser, cartProduct]);

  return (
    <Container>
      {loading && <Loading />}
      <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
        <h2 className='text-2xl md:text-5xl font-bold text-center'>
          {loading
            ? 'Your order payment is processing'
            : 'Your Payment Accepted by ElectraHub'}
        </h2>
        <p className='text-lg'>
          {loading ? 'Once done' : 'Now'} you can view your Orders or continue
          Shopping with us
        </p>
        <div className='flex flex-col lg:flex-row items-center gap-5'>
          <Link to={'/orders'}>
            <button className='bg-darkText text-whiteText w-52 h-12 rounded-full text-base font-semibold hover:bg-red-700 duration-300'>
              View Your Orders
            </button>
          </Link>
          <Link to={'/'}>
            <button className='bg-darkText text-whiteText w-52 h-12 rounded-full text-base font-semibold hover:bg-red-700 duration-300'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;