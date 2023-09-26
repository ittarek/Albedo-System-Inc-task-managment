import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./fetures/task/taskSlice";
import userSlice from "./fetures/task/userSlice";
import baseApi from "./fetures/api/baseApi";
import userApi from "./fetures/api/userApi";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    taskSlice: taskSlice,
    userSlice: userSlice,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
