import React from "react";
import ActionButton from "../common/ActionButton";
import { useHistory } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const history = useHistory();
  return (
    <>
      <div className="todoHeader">
        <h1>My List</h1>
        <div className="HeaderControls">
          <ActionButton
            onClick={() => history.push({ pathname: "/update", state: {} })}
            color="green"
          >
            Create
          </ActionButton>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {};

export default Header;
