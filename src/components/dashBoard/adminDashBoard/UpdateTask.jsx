import MyModal from "../../ui/MyModal";
import { Box, TextField } from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import {
  useGetTaskQuery,
  useUpdateTaskByAdminMutation,
} from "../../../redux/fetures/api/baseApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateTask = ({ open, setOpen }) => {
  const { email, isLoading } = useSelector(state => state.userSlice);

  
  const { id } = useParams();
  const [update, { data, error }] = useUpdateTaskByAdminMutation();
  const { data: tasks } = useGetTaskQuery();
  const cancel = () => {
    setOpen(false);
  };

  const detailTask = tasks?.find(item => item._id == id);

  
  const {
    _id,
    title,
    description,
    status,
    assignDate,
    date,
    priority,
    assignBy,
    assignTo,
    assignEmail
  } = detailTask || [];
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // {acknowledged: true, insertedId: '650c60412dd208edfe2bbd10'}
   const newData = {
      status: "pending",
      title: data.get("title"),
      description: data.get("description"),
      date: data.get("deadline"),
      assignTo: data.get("assignTo"),
      priority: data.get("priority"),
      assignEmail
    };

    const options = {
      id: _id,
      data: newData,
    };

    update(options);

    cancel();
  };

  return (
    <div>
      <MyModal open={open} setOpen={setOpen} title="Update Task">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {/* title */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            defaultValue={title}
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
            defaultValue={description}
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
            defaultValue={date}
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
            defaultValue={assignTo}
            autoComplete="assignTo"
          />

          <label htmlFor="priority" className="label">
            <span className="label-text mt-5">Priority</span>
          </label>

          <Select id="priority" name="priority" defaultValue={priority}>
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
            <Button type="submit" variant="soft" color="success" sx={{ mr: 5 }}>
              Submit
            </Button>
            <Button
              type="button"
              variant="solid"
              color="danger"
              onClick={() => cancel()}
              
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </MyModal>
    </div>
  );
};

export default UpdateTask;
