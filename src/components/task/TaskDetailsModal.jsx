import React, { useState } from "react";
import MyModal from "../ui/MyModal";

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/joy";
import {
  useGetTaskQuery,

} from "../../redux/fetures/api/baseApi";

import { Box } from "@mui/material";

const TaskDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: tasks } = useGetTaskQuery();

  const { id } = useParams();
  const navigate = useNavigate();


  const detailTask = tasks?.find(item => item._id == id);
  const {
    _id,
    title,
    description,
    status,
    assignDate,
    date,
    assignBy,
    priority,
    assignTo,
    comment
  } = detailTask || [];

  // modal Close 
  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };


 



  return (
    <>
      <MyModal
        open={isOpen}
        setIsOpen={setIsOpen}
        onClose={closeModal}
   
        title={title}
      >
        <Box sx={{   
              bgcolor: 'background.paper',}}>

     
        <div className="px-11">
          <p className="text-black">
          Description :  {description ? description : "no details"}
          </p>

          <p   className={`  uppercase my-3
   ${priority === "high" ? "text-red-500" : ""}
   ${priority === "medium" ? "text-yellow-500" : ""}
   ${priority === "low" ? "text-green-500" : ""}`}
                    >
            Status: <span className="uppercase">{status}</span>
          </p>
          <p  className="my-3">Assign Date:</p>
          <p className="my-3">DeadLine : {date}</p>
          <p className="my-3">Assign By : {assignTo} </p>
          <p className="my-3">Assign To : </p>
          <p className="my-3">Comment : {comment} </p>
          <form>
            <div className="form-control my-2">
             
     
              <div className="">
             
                <Button
                  color="danger"
                  type="button"
                  variant="solid"
                  onClick={() => closeModal()}
                  sx={{}}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>   </Box>
      </MyModal>
    </>
  );
};

export default TaskDetailsModal;
