import React, { useEffect, Suspense } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import Loader from "./layout/utils/Loader";
import { loadUser } from "./actions/userActions";
import "./app.scss";
const AppRoutes = React.lazy(() => import("./routes/routes"));
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());

    if(!localStorage.token) {
      navigate('/welcome');
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes></AppRoutes>
    </Suspense>
  );
};

export default App;
