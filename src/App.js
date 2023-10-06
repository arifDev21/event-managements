import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Homepage } from './pages/homepage';
import Redirect from './pages/redirect';
import { EventDetail } from './pages/eventDetail';
import Register from './pages/register';
import { SimpleCard } from './pages/login';
import Navbar from './components/navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { types } from './redux/reducers/types';
import { Dashboard } from '../src/pages/dashboard';

function App({ searching }) {
  const location = useLocation();

  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('auth'));
    // setUsers(local ? JSON.parse(local) : users);
    console.log(local);
    if (local) {
      dispatch({
        type: types.login,
        payload: { ...local },
      });
    } else if (local) {
      dispatch({
        type: types.logout,
        payload: { ...local },
      });
    }

    console.log(userSelector);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  console.log('search :>> ');

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar search={searching} />
      )}{' '}
      <Routes>
        <Route path="home" element={<Homepage />} />
        <Route path="event-detail/:eventId" element={<EventDetail />} />
        <Route path="" element={<Redirect />} />
        <Route path="login" element={<SimpleCard />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
export default App;
