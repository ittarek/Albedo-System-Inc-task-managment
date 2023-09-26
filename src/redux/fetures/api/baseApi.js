import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-management-serber.vercel.app",
    // baseUrl: "http://localhost:5000",
   
  }),
  tagTypes: ["Tasks"],

  endpoints: builder => ({
    getTask: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    getUser: builder.query({
      query: () => "/users",
    
    }),

    addMyTask: builder.mutation({
      query: task => ({
        url: "/addTask",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    // make admin
    makeAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/users/admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    // make user
    makeUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    // add comment
    addComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskByAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetUserQuery,
  useAddMyTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskByAdminMutation,
  useAddCommentMutation,
  useGetAdminQuery,
  useMakeAdminMutation,
  useMakeUserMutation,
} = baseApi;

export default baseApi;
