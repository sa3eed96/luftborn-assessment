import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/identity/Login";
import Signup from "./components/identity/Signup";
import Layout from "./components/Layout";
import TodoHome from "./components/todo/TodoHome";
import Update from "./components/todo/Update";
import "./custom.css";
import UserContext from "./components/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    name: null,
    email: null,
  });

  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    var res = await fetch("/identity/checklogin");
    var data = await res.json();
    if (data.login == true) {
      setUser({
        isAuthenticated: true,
        name: data.user.name,
        email: data.user.email,
      });
    }
  };

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (user.isAuthenticated != true)
                  return <Redirect to="/login" />;
                else return <TodoHome />;
              }}
            />
            <Route
              path={"/login"}
              render={() => {
                if (user.isAuthenticated == true) return <Redirect to="/" />;
                else return <Login />;
              }}
            />
            <Route
              path={"/signup"}
              render={() => {
                if (user.isAuthenticated == true) return <Redirect to="/" />;
                else return <Signup />;
              }}
            />
            <Route
              path={"/update"}
              render={() => {
                if (user.isAuthenticated != true)
                  return <Redirect to="/update" />;
                else return <Update />;
              }}
            />
          </Switch>
        </Layout>
      </UserContext.Provider>
      <ToastContainer
        style={{ width: "400px" }}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
      />
    </>
  );
};

export default App;
