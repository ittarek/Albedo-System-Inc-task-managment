import React from "react";
// import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetTaskQuery } from "../../../redux/fetures/api/baseApi";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Chart = () => {
  const { data: tasksData, isLoading } = useGetTaskQuery();
  const pendingTAsk = tasksData?.filter(p => p.status === "pending");
  const runningTask = tasksData?.filter(p => p.status === "running");
  const doneTask = tasksData?.filter(p => p.status === "done");

  // if(isLoading){
  //   return <p>Loading.....</p>
  // }
  console.log("data", tasksData);

  console.log("pending Task", pendingTAsk?.length);

  let pending = pendingTAsk?.length;
  console.log("pending", pending);

  let running = runningTask?.length;
  let done = doneTask?.length;
  const data01 = [
    { name: "Pending", value:  pending  },
    { name: "Running", value: running },
    { name: "Done", value: done },
  ];
  const data02 = [
    { name: "Pending", value:  pending  },
    { name: "Running", value: running },
    { name: "Done", value: done },
  ];

  return (
    <div className="lg:grid items-center justify-center sm:col-auto ">
      <div className="col-span-10 mb-10   ">
        {" "}
        <h1 className=" text-purple-300  ">Task Information</h1>
      </div>
      <div className="col-start-1 col-end-3 ">
        <table className=" border  ">
          <thead className="border-spacing-6">
            <tr className="border border-violet-800 p-4">
              <th className="p-2 ">#</th>
              <th className="p-4">Task Progress</th>
              <th className="p-2">Quantity</th>
            </tr>
          </thead>
          <tbody className="border border-purple-600">
            <tr>
              <td className=" p-2">01</td>
              <td className="">Pending </td>
              <td className="">{pending}</td>
            </tr>
            <tr>
              <td className="p-2">02</td>
              <td>Running</td>
              <td>{running}</td>
            </tr>
            <tr>
              <td className="p-2">03</td>
              <td>Done</td>
              <td>{done}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <div className="col-end-7 col-span-2">
        {" "}
        <PieChart width={450} height={250} data={data01}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
      
            outerRadius={80}
            fill="#8884d8"
          />
          <Tooltip />

          <Pie
            data={data02}
            dataKey="value"
        
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>{" "}
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Chart;
