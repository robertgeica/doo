import React from "react";
import { Routes, Route } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { connect } from "react-redux";
const Layout = React.lazy(() => import("../layout/Layout"));
const LoginPage = React.lazy(() => import("../screens/auth/Login"));
const RegisterPage = React.lazy(() => import("../screens/auth/Register"));
const SendResetPassword = React.lazy(() =>
  import("../screens/auth/SendResetPassword")
);
const ResetPassword = React.lazy(() => import("../screens/auth/ResetPassword"));
const CollectionScreen = React.lazy(() => import("../screens/CollectionScreen"));
if (localStorage.token) setAuthToken(localStorage.token);

const AppRoutes = (props) => {
  const routes = props.user ? (
    <Layout>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/collection/:id" element={<CollectionScreen />} />
      </Routes>
    </Layout>
  ) : (
    <Routes>
      <Route exact path="/welcome" element={<WelcomeScreen />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/reset-password" element={<SendResetPassword />} />
      <Route exact path="/reset-password/:id/:id" element={<ResetPassword />} />
    </Routes>
  );
  return routes;
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(AppRoutes);
