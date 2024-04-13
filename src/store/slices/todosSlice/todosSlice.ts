import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "types";

interface TodosState {
  todos: Todo[];
  isOpenModalForm: boolean;
}

const initialState: TodosState = {
  todos: [
    { id: "11", title: "Task1", status: false },
    { id: "2222", title: "Task2", status: true },
  ],
  isOpenModalForm: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      const todoId = action.payload;
      const todoToUpdate = state.todos.find(todo => todo.id === todoId);

      if (todoToUpdate) {
        todoToUpdate.status = !todoToUpdate.status;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const todoId = action.payload;

      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
    addTask(state, action: PayloadAction<string>) {
      const titleTodo = action.payload;

      const newTodo = {
        id: uuidv4(),
        title: titleTodo,
        status: false,
      };

      state.todos.push(newTodo);
    },
    changeStatusModalForm(state) {
      state.isOpenModalForm = !state.isOpenModalForm;
    },
  },
});
