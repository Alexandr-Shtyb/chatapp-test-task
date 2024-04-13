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

const ModalForm = () => {
  const dispatch = useAppDispatch();
  const isOpenModalForm = useAppSelector(state => state.todos.isOpenModalForm);
  const [titleTask, setTitleTask] = useState("");

  const handleCloseModalForm = () => {
    dispatch(todosSlice.actions.changeStatusModalForm());
  };

  const handleAddingTask = () => {
    dispatch(todosSlice.actions.addTask(titleTask));
    setTitleTask("");
  };

  const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTask(e.target.value);
  };

  return (
    <Dialog
      open={isOpenModalForm}
      onClose={handleCloseModalForm}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleAddingTask();
          handleCloseModalForm();
        },
      }}
    >
      <DialogTitle>Adding task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the name of the scheduled task
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
        <Button onClick={handleCloseModalForm}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
