import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import Container from '../components/Container';
import Loading from '../components/Loading';
import Registration from '../components/Registration';
import UserInfo from '../components/UserInfo';
import { auth } from '../lib/firebase';
import { store } from '../lib/store';

const Profile = () => {
  const { currentUser, getUserInfo, isLoading } = store();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [getUserInfo]);
  return (
    <Container>
      {currentUser ? <UserInfo currentUser={currentUser} /> : <Registration />}

      {isLoading && <Loading />}
    </Container>
  );
};

export default Profile;