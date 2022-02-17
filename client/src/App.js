import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import HomeScreen from "./screens/HomeScreen";
import Loader from "./layout/utils/Loader";
import { loadUser } from "./actions/userActions";
import "./app.scss";
const AppRoutes = React.lazy(() => import("./routes/routes"));
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <AppRoutes>

        </AppRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
