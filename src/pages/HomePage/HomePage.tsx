import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Todo from "components/Todo/Todo";
import { useAppSelector, useAppDispatch } from "hooks";
import { todosSlice } from "store/slices/todosSlice";
import ModalForm from "components/ModalForm/ModalForm";

import { ButtonAddTask } from "./styles";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);

  const handleAddTask = () => {
    dispatch(todosSlice.actions.changeStatusModalForm());
  };

  return (
    <Container>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id}>
            <Todo infoTodo={todo} />
          </ListItem>
        ))}
      </List>

      <ButtonAddTask onClick={handleAddTask}>Add task</ButtonAddTask>

      <ModalForm />
    </Container>
  );
};

export default HomePage;
