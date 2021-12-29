import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { Todo } from "./types";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const todoNameRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch("http://localhost:8080/todo-items")
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          setTodos([]);
          return;
        }
        setTodos(data);
      });
  }

  function handleAddTodo(e: React.MouseEvent<HTMLElement>) {
    const text = todoNameRef!.current!.value;
    fetch("http://localhost:8080/todo-items", {
      method: "POST",
      body: JSON.stringify({ text: text, completed: false }),
    }).then(fetchTodos);
    todoNameRef.current!.value = "";
  }

  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    ) as Todo[];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id: string) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo!.completed = !todo!.completed;
    // NEED TO DO A POST API REQUEST TO UPDATE THE TODO IN BACKEND
    setTodos(newTodos);
  }

  function deleteTodo(id: string) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo!.trashed = !todo?.trashed;
    // NEED TO DO A DELETE API REQUEST TO UPDATE THE TODO IN BACKEND
    fetch(`http://localhost:8080/todo-items/${id}`, {
      method: "POST",
      body: JSON.stringify({ trashed: todo?.trashed }),
    }).then(fetchTodos);
  }

  return (
    <main className="container mx-auto flex justify-center">
      <div className="mt-4">
        <div className="font-bold text-2xl">CVWO TO-DO LIST</div>
        <div className="mt-8">
          <div className="font-semibold mt">Active</div>
          <TodoList
            todos={todos.filter((todo) => !todo.completed && !todo.trashed)}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
          <div>
            <input
              ref={todoNameRef}
              type="text"
              className="border-2 rounded-md border-black p-1 mr-2"
            />
            <button
              onClick={handleAddTodo}
              className="bg-green-500 text-white p-1 rounded-md"
            >
              Add
            </button>
            <div>
              Number of unchecked tasks{" "}
              {todos.filter((todo) => todo.completed === false).length}
            </div>
          </div>

          <div className="mt-8">
            <div className="font-semibold">Completed</div>
            <TodoList
              todos={todos.filter((todo) => todo.completed && !todo.trashed)}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>

          <div className="mt-8">
            <div className="font-semibold">Trashed</div>
            <TodoList
              todos={todos.filter((todo) => todo.trashed)}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
