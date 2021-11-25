import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import { loadUser } from './actions/userActions';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser());
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomeScreen />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;