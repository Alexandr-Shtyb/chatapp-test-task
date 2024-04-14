import { useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Todo from "components/Todo/Todo";
import { useAppSelector, useAppDispatch } from "hooks";
import { todosSlice } from "store/slices/todosSlice";
import ModalForm from "components/ModalForm/ModalForm";
import EditModalForm from "components/EditModalForm/EditModalForm";
import { SELECT_FILTERS_TODO } from "constants/todos";
import type { TodoFilters } from "types";
import { useSelectedFilter } from "hooks/useSelectedFilter";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";

import { ButtonAddTask, NoTasksPanel } from "./styles";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const filter = useAppSelector(state => state.todos.currentFilter);
  const [valueFilterTodos, setValueFilterTodos] = useState<TodoFilters>(filter);
  const filteredTodos = useSelectedFilter(todos, valueFilterTodos);

  const handleAddTask = () => {
    dispatch(todosSlice.actions.changeStatusModalForm());
  };

  const handleSelectFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilter = e.target.value as TodoFilters;
    setValueFilterTodos(selectedFilter);
    dispatch(todosSlice.actions.setFilterTodo(selectedFilter));
  };

  const handleOnDragEnd = (result: DropResult) => {
    dispatch(todosSlice.actions.onDragEnd(result));
  };

  const isFilteredTasks = filteredTodos.length > 0;

  return (
    <Container>
      <div>
        <TextField
          select
          label="Filter"
          defaultValue="All"
          helperText="Please select your todos"
          value={valueFilterTodos}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSelectFilter(e)
          }
        >
          {SELECT_FILTERS_TODO.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {isFilteredTasks ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="filteredTodos">
            {provided => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {provided => (
                      <ListItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Todo infoTodo={todo} />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <NoTasksPanel>No tasks</NoTasksPanel>
      )}

      <ButtonAddTask onClick={handleAddTask}>Add task</ButtonAddTask>

      <ModalForm />
      <EditModalForm />
    </Container>
  );
};

export default HomePage;
