import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Todo = {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
};

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/todos" }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        fetchTodos: builder.query<Todo[], void>({
            query: () => '',
            providesTags: ['Todos'],
        }),
        fetchTodo: builder.query<Todo, string>({
            query: (id) => `/${id}`,
            providesTags: ['Todos'],
        }),
        createTodo: builder.mutation({
            query: (newTodo) => ({
                url: '',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation({
            query: (updatedTodo) => ({
                url: `/${updatedTodo.id}`,
                method: 'PUT',
                body: updatedTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
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