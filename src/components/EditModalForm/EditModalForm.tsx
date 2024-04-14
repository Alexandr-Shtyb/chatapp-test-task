import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector, useAppDispatch } from "hooks";
import { todosSlice } from "store/slices/todosSlice";

const EditModalForm = () => {
  const dispatch = useAppDispatch();
  const isOpenEditModalForm = useAppSelector(
    state => state.todos.isOpenEditModalForm,
  );
  const idEditedTask = useAppSelector(state => state.todos.idEditedTask);
  const [titleTask, setTitleTask] = useState("");

  const handleCloseEditModalForm = () => {
    dispatch(todosSlice.actions.changeStatusEditModalForm());
  };

  const handleEditTask = () => {
    dispatch(
      todosSlice.actions.editTask({ id: idEditedTask, title: titleTask }),
    );
    setTitleTask("");
  };

  const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.target.value);
  };

  return (
    <Dialog
      open={isOpenEditModalForm}
      onClose={handleCloseEditModalForm}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleEditTask();
          handleCloseEditModalForm();
        },
      }}
    >
      <DialogTitle>Edit task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can change the title of the task
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Title task"
          label="Title task"
          type="text"
          fullWidth
          variant="standard"
          value={titleTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTextField(e)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditModalForm}>Cancel</Button>
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModalForm;
