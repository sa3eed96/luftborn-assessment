import React, { useState, useEffect } from "react";
import Header from "./Header";
import TodoItems from "./TodoItems";
import "./TodoHome.css";
import TodoItem from "./TodoItem";

const TodoHome = (props) => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoItemsCount, setTodoItemsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getItems();
  }, [page]);

  const getItems = async () => {
    const res = await fetch(`/todoitems?page=${page}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setTodoItems(data.items);
    setTodoItemsCount(data.count);
  };

  const deleteItem = async (item) => {
    const res = await fetch(`/todoitems/delete/${item.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      return;
    }
    if (todoItems.length - 1 == 0 && todoItemsCount - 1 > 0) {
      if (page > 1) {
        setPage(page - 1);
        setTodoItems([]);
        setTodoItemsCount(0);
      } else getItems();
    } else {
      let temp = [...todoItems];
      temp = temp.filter((x) => x.id != item.id);
      setTodoItems(temp);
      setTodoItemsCount(todoItemsCount - 1);
    }
  };

  const updateItem = async (item) => {
    const res = await fetch(`/todoitems/update`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      return;
    }
    const temp = [...todoItems];
    const ind = temp.findIndex((x) => x.id == item.id);
    temp[ind].name = item.name;
    temp[ind].day = item.day;
    temp[ind].done = item.done;
    setTodoItems(temp);
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="todoHome">
      <div className="todoContainer">
        <Header />
        <TodoItems
          nextPage={nextPage}
          prevPage={prevPage}
          page={page}
          pagesCount={Math.ceil(todoItemsCount / 8)}
        >
          {todoItemsCount > 0 &&
            todoItems.map((item) => (
              <TodoItem
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            ))}
          {todoItemsCount == 0 && (
            <div className="empty">
              <img src="/images/noth.webp" />
            </div>
          )}
        </TodoItems>
      </div>
    </div>
  );
};

export default TodoHome;
