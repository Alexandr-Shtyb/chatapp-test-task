import type { FC } from "react";
import type { Todo } from "types";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "hooks";
import { todosSlice } from "store/slices/todosSlice";

import { WrapperTodo } from "./styles";

interface TodoProps {
  infoTodo: Todo;
}

const Todo: FC<TodoProps> = ({ infoTodo }) => {
  const dispatch = useAppDispatch();
  const { id, title, status } = infoTodo;

  const handleStatusChange = () => {
    dispatch(todosSlice.actions.setStatus(id));
  };

  const handleDeleteTodo = () => {
    dispatch(todosSlice.actions.deleteTodo(id));
  };

  return (
    <WrapperTodo>
      <Button onClick={handleStatusChange}>
        <Checkbox checked={status} color="success" />
        <span>{title}</span>
      </Button>

      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteTodo}
      >
        Delete
      </Button>
    </WrapperTodo>
  );
};

export default Todo;
