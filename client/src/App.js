import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

export const routes = [
  {
    name: "home",
    path: "/",
    isPrivate: false,
    isAdmin: false,
    component: Home,
    isExact: true
  },
  {
    name: "login",
    path: "/login",
    isPrivate: false,
    isAdmin: false,
    component: Login
  },
  {
    name: "register",
    path: "/register",
    isPrivate: false,
    isAdmin: false,
    component: Register
  },
  {
    name: "profile",
    path: "/profile",
    isPrivate: true,
    isAdmin: false,
    component: Profile
  },
  {
    name: "admin",
    path: "/admin-dashboard",
    isPrivate: true,
    isAdmin: true,
    component: AdminDashboard
  }
];

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        {routes.map((value, index) =>
          value.isExact ? (
            value.isPrivate ? (
              <PrivateRoute
                path={value.path}
                exact
                component={value.component}
              />
            ) : value.isAdmin ? (
              <AdminRoute path={value.path} exact component={value.component} />
            ) : (
              <Route path={value.path} exact component={value.component} />
            )
          ) : value.isPrivate ? (
            <PrivateRoute path={value.path} component={value.component} />
          ) : value.isAdmin ? (
            <AdminRoute path={value.path} component={value.component} />
          ) : (
            <Route path={value.path} component={value.component} />
          )
        )}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
