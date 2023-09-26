import React, { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/joy";

import Swal from "sweetalert2";
import MyModal from "./../../ui/MyModal";
import {
  useAddCommentMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../../redux/fetures/api/baseApi";
import { Box, TextField } from "@mui/material";
import UpdateTask from "./UpdateTask";

const AllTaskModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = React.useState(false);
  const { data: tasks } = useGetTaskQuery();

  const { id } = useParams();
  const navigate = useNavigate();
  const [updateTask, { data, error, isSuccess }] = useUpdateTaskMutation();
  const [addComment, {data:dataComment,error: commentError, isSuccess : commentSuccess}] = useAddCommentMutation();

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
  } = detailTask || [];

  // modal Close
  const handleCloseModal = () => {
    setIsOpen(false);
    navigate("/allTask");
  };

  //  pending to running to done control function
  const handleUpdateTask = (id, updatedStatus) => {
    const data = {
      status: updatedStatus,
    };
    const options = {
      id: id,
      data: data,
    };
    updateTask(options);

    if (!isSuccess) {
      Swal.fire("Good job!", "You Update Your Task Status!", "success");
    }
    handleCloseModal();
  };
  // status style  dynamic
  let updatedStatus;
  if (detailTask?.status === "pending") {
    updatedStatus = "running";
  } else {
    updatedStatus = "done";
  }

  // update assign task by next dynamic button

  let next;
  if (detailTask?.status === "pending") {
    next = "running";
  } else if (detailTask?.status === "running") {
    next = "done";
  } else {
    next = "Good";
  }

  // admin comment in task by this Function
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const commentData = {
      comment : data.get("comment")
    }
    const options = {
      id: _id,
      data: commentData,
    };
   addComment(options)
  };

  return (
    <>
      <UpdateTask open={open} setOpen={setOpen}></UpdateTask>
      <MyModal
        open={isOpen}
        setIsOpen={setIsOpen}
        onClose={handleCloseModal}
        className="uppercase"
        title={title}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <div className="px-11">
            <p className="text-black">
              Description : {description ? description : "no details"}
            </p>

            <p
              className={`  uppercase my-3
   ${priority === "high" ? "text-red-500" : ""}
   ${priority === "medium" ? "text-yellow-500" : ""}
   ${priority === "low" ? "text-green-500" : ""}`}
            >
              Status: <span className="uppercase">{status}</span>
            </p>
            <p className="my-3">Assign Date:</p>
            <p className="my-3">DeadLine : {date}</p>
            <p className="my-3">Assign By : {assignTo} </p>
            <p className="my-3">Assign To : </p>

            <div className="form-control my-2">
              {/* Comment */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="comment"
                  label="Comment"
                  type="text"
                  id="comment"
                  autoComplete="comment"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  color="success"
                  variant="solid"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Comment
                </Button>
              </Box>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleUpdateTask(_id, updatedStatus)}
                  className={` 
                  ${status === "pending" ? "text-red-500" : ""}
                  ${status === "running" ? "text-yellow-500" : ""}
                  ${status === "done" ? "text-green-600" : ""}`}
                  disabled={status === "done"}
                >
                  {next}
                </Button>

                <Button
                  color="warning"
                  type="button"
                  variant="solid"
                  onClick={() => setOpen(true)}
                  sx={{}}
                >
                  Edit
                </Button>

                <Button
                  color="danger"
                  type="button"
                  variant="solid"
                  onClick={() => handleCloseModal()}
                  sx={{}}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>{" "}
        </Box>
      </MyModal>
    </>
  );
};

export default AllTaskModal;
