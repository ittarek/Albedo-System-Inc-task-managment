import { createSlice } from "@reduxjs/toolkit"




const initialState = {
  task:[
    {
      id:1,
      assignTo:"Md kabir Islam",
      status:"pending",
      deadline:"2023/9/8",
      description:"new year new me task here",
      priority:"low",
      title:"new task"

    },
    {
      id:2,
      assignTo:"Md tarikul Islam",
      status:"pending",
      deadline:"2023/9/8",
      description:"new year new me task here",
      priority:"low",
      title:"second task"

    }
  ],
  userSpecificTask:[],

}

const taskSlice = createSlice({
    name:"taskSlice",
    initialState,
    reducers:{
       addTask : (state,{payload})=>{
        if(state.task.length === 0){
        state.task.push({id:1 ,status:"pending", ...payload});

        }else{

         const lastElement = state.task.at(-1)
         state.task.push({id: lastElement.id + 1 ,status:"pending", ...payload});

        }

       },
       removeTask: (state, {payload})=>{
        state.task =  state.task.filter(item => item.id !== payload)
       },
       updateStatus: (state,{payload})=>{
       const target =  state.task.find(item=>item.id === payload.id);

       target.status = payload.status
       },
       userTask : (state,{payload})=>{
         state.userSpecificTask = state.task.filter(item => item.assign === payload)
       }
    }
})


export const { addTask,removeTask,updateStatus,userTask} =  taskSlice.actions;

export default taskSlice.reducer