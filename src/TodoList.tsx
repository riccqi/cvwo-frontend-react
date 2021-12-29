import React from "react";
import TodoView from "./TodoView";
import { Todo } from "./types";

type TodoListInterface = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: TodoListInterface) {
  return (
    // MUST BE IN FRAGMENTS SINCE TS only returns JSX.Element of which an array is not valid.
    <>
      {todos!.map((todo) => {
        return (
          <TodoView
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </>
  );
}
