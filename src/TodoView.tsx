import React from "react";
import { Todo } from "./types";

// WEIRD WAY OF DEFINING A PROP BECUZ OF TS. ALTERNATIVE:
export type CustomInputInterface = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export default function TodoView({
  todo,
  toggleTodo,
  deleteTodo,
}: CustomInputInterface) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleDeleteTodo(e: React.MouseEvent<HTMLElement>) {
    deleteTodo(todo.id);
  }

  return (
    <div className="flex pb-2">
      <input
        type="checkbox"
        className="self-center"
        checked={todo.completed}
        onChange={handleTodoClick}
      />
      <div className="pl-2 self-center">{todo.text}</div>
      <button
        onClick={handleDeleteTodo}
        className="bg-red-500 text-white p-1 rounded-md ml-2 self-center"
      >
        {todo.trashed ? "Undo" : "Delete"}
      </button>
    </div>
  );
}
