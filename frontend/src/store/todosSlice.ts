import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export type Todo = {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
};

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        fetchTodos: builder.query<Todo[], void>({
            query: () => '/api/todos/',
            providesTags: ['Todos'],
        }),
        fetchTodo: builder.query<Todo, string>({
            query: (id) => `/api/todos/${id}`,
            providesTags: ['Todos'],
        }),
        createTodo: builder.mutation({
            query: (newTodo) => ({
                url: '/api/todos/',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation({
            query: (updatedTodo) => ({
                url: `/api/todos/${updatedTodo.id}`,
                method: 'PUT',
                body: updatedTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/api/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
});

export const {
    useFetchTodosQuery,
    useFetchTodoQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApi;