import MyModal from "../ui/MyModal";

import {
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";

import { LockOutlinedIcon } from "@mui/icons-material/LockOutlined";

import CssBaseline from "@mui/material/CssBaseline";
import { useAddMyTaskMutation } from "../../redux/fetures/api/baseApi";
import { useSelector } from "react-redux";

const AddTaskModal = ({ open, setOpen }) => {
  const { email, isLoading } = useSelector(state => state.userSlice);

  const [addTask, { data, error }] = useAddMyTaskMutation();

  const cancel = () => {
    setOpen(false);
  };
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // {acknowledged: true, insertedId: '650c60412dd208edfe2bbd10'}

    addTask({
      status: "pending",
      title: data.get("title"),
      description: data.get("description"),
      date: data.get("deadline"),
      assignTo: data.get("assignTo"),
      priority: data.get("priority"),
      assignEmail: email, 
    });

    cancel();
  };

  return (
    <MyModal open={open} setOpen={setOpen} title="ADD Your Task">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* title */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
    
        {/* description */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Description"
          type="text"
          id="description"
          autoComplete="description"
        />
        {/* deadline */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="deadline"
          // label="Date"
          type="date"
          id="deadline"
          autoComplete="deadline"
        />
        {/* assign to */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="assignTo"
          label="Assign To"
          type="text"
          id="assignTo"
          autoComplete="assignTo"
        />

        <label htmlFor="priority" className="label">
          <span className="label-text mt-5">Priority</span>
        </label>

        <Select id="priority" name="priority" defaultValue="high">
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>

        <Box
          sx={{
            display: "flex",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <Button
            type="button"
            variant="soft"
            onClick={() => cancel()}
            sx={{ mr: 5 }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="soft">
            Submit
          </Button>
        </Box>
      </Box>
    </MyModal>
  );
};

export default AddTaskModal;
