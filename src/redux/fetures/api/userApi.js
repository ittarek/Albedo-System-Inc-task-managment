import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


const userApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
       baseUrl: "https://task-management-serber.vercel.app" 
  //  baseUrl: "http://localhost:5000/"
      
      }),
    // tagTypes: ["Users"],
    endpoints: builder => ({
        
    getUser: builder.query({
      query: () => "/users",
    //   providesTags: ["Users"],
    }),


  }),
});

export const { useGetUserQuery } = userApi;

export default userApi;
