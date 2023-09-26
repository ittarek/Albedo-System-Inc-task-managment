import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import { useGetTaskQuery } from "../../../redux/fetures/api/baseApi";
import { Button } from "@mui/joy";

const AllTaskManage = () => {
  const { data: tasks } = useGetTaskQuery();
  return (
    <div>
      <TableContainer component={Paper} className="mt-5">
        <Table sx={{ minWidth: "800px" }} aria-label="simple table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Deadline</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"> Created By</TableCell>
              <TableCell align="left">Tag</TableCell>
 
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks?.map(
              ({
                _id,
                title,
                description,
                status,
                assignTo,
                date,
                priority,
              }) => (
                <>
                <TableRow
                  key={_id}
                  component={Link}
                  to={`/allTaskModal/${_id}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <h2
                      className={`  uppercase 
   ${priority === "high" ? "text-red-500" : ""}
   ${priority === "medium" ? "text-yellow-500" : ""}
   ${priority === "low" ? "text-green-500" : ""}`}
                    >
                      {" "}
                      {title}
                    </h2>
                  </TableCell>
                  <TableCell align="left">{date}</TableCell>
                  <TableCell align="left">
                    <h2
                      className={`uppercase 
   ${priority === "high" ? "text-red-500" : ""}
   ${priority === "medium" ? "text-yellow-500" : ""}
   ${priority === "low" ? "text-green-500" : ""}`}
                    >
                      {" "}
                      {status}
                    </h2>
                  </TableCell>
                  <TableCell align="left">{assignTo}</TableCell>
                  <TableCell align="left">{description}</TableCell>
   
                </TableRow> 
            </>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllTaskManage;
