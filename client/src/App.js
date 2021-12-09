import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import HomeScreen from "./screens/HomeScreen";
import Loader from "./components/utils/Loader";
import { loadUser } from "./actions/userActions";
import './app.scss';

const LoginPage = React.lazy(() => import('./screens/auth/Login'));
const RegisterPage = React.lazy(() => import('./screens/auth/Register'));
if (localStorage.token) setAuthToken(localStorage.token);


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
