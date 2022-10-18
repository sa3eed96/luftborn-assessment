import React from "react";
import ActionButton from "../common/ActionButton";
import CustomCheckBox from "../common/CheckBox";
import DateFormatter from "../common/DateFormatter";
import { useHistory } from "react-router";
import "./TodoItem.css";

function TodoItem(props) {
  const history = useHistory();

  return (
    <div className="todoItem">
      <div className="todoItemContent">
        <CustomCheckBox
          toggleCheck={async () => {
            await props.updateItem({ ...props.item, done: !props.item.done });
          }}
          checked={props.item.done}
        />
        <div className="itemContent">
          <h6>{props.item.name}</h6>
          <div>
            To do on: <DateFormatter date={props.item.day} />
          </div>
        </div>
      </div>
      <div className="todoItemControls">
        <ActionButton
          onClick={async () => {
            await props.deleteItem(props.item);
          }}
          color="red"
        >
          Delete
        </ActionButton>
        <ActionButton
          onClick={() =>
            history.push({ pathname: "/update", state: props.item })
          }
        >
          Update
        </ActionButton>
      </div>
    </div>
  );
}

export default TodoItem;
