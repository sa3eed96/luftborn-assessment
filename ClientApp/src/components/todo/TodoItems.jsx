import React from "react";
import ActionButton from "../common/ActionButton";
import "./TodoItems.css";

function TodoItems(props) {
  return (
    <>
      <div className="todoItemsContainer">{props.children}</div>
      <div className="todoItemsPaging">
        <ActionButton disabled={props.page == 1} onClick={props.prevPage}>
          {"<"}
        </ActionButton>
        {props.pagesCount == 0 ? 0 : props.page} of {props.pagesCount}
        <ActionButton
          disabled={props.pagesCount == props.page || props.pagesCount == 0}
          onClick={props.nextPage}
        >
          {">"}
        </ActionButton>
      </div>
    </>
  );
}

export default TodoItems;
