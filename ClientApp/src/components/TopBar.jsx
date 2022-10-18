import React, { useContext } from "react";
import ActionButton from "./common/ActionButton";
import "./TopBar.css";
import UserContext from "./UserContext";
import { toast } from "react-toastify";
import ToastBody from "./common/ToastBody";

const TopBar = (props) => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    const res = await fetch(`/identity/logout`);
    if (!res.ok) {
      toast(
        <ToastBody text={"An error has occurred, please try again later"} />,
        {
          className: "errorToast",
        }
      );
      return;
    }
    setUser({
      isAuthenticated: false,
      name: null,
      email: null,
    });
  };
  return (
    <div className="topBar">
      <div className="logoCont">
        <img className="logo" src="/images/logo.webp" />
      </div>
      <div className="btnCont">
        <ActionButton onClick={logout} color="red">
          Sign out
        </ActionButton>
      </div>
    </div>
  );
};

export default TopBar;
