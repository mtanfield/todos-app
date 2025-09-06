import { useState } from 'react';

import type { Todo } from '../store/todosSlice';
import { TodoItem, TodoDialog } from '.';
import {
    useFetchTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
} from '../store/todosSlice';

import './TodosList.scss';

const TodosList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const {
        data: todos = [],
        error,
        isLoading
    } = useFetchTodosQuery();

    const [createTodo] = useCreateTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    const handleToggleDialog = (isOpen?: boolean) => {
        setIsDialogOpen(isOpen !== undefined ? isOpen : !isDialogOpen);
        if (!isOpen) {
            setEditingTodo(null);
        }
    };

    const handleAddTodo = () => {
        setEditingTodo(null);
        handleToggleDialog(true);
    };

    const handleSaveTodo = (todo: Todo) => {
        if (editingTodo) {
            // Update existing todo
            updateTodo({ id: editingTodo.id, ...todo });
        } else {
            // Create new todo
            createTodo(todo);
        }
    }

    const handleToggleCompleted = (id?: string, completed?: boolean) => {
        if (!id || completed === undefined) return;

        const todo = todos.find(t => t.id === id);
        if (todo) {
            updateTodo({ ...todo, completed });
        }
    }

    const errorDisplay =
        error
            ? ('status' in error
                ? `${String(error.status)} ${JSON.stringify(error.data)}`
                : 'error' in error && typeof error.error === 'string'
                    ? error.error
                    : typeof error === 'string'
                        ? error
                        : 'Unknown error')
            : null;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {errorDisplay}</div>;

    return (
        <div className="todos-list">
            <div className='todos-list-items'>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} {...todo} onToggleCompleted={(completed) => handleToggleCompleted(todo.id, completed)} />
                ))}
            </div>
            <div className='todos-list-footer'>
                <button className='todos-list-add-button' onClick={handleAddTodo}>Add Todo</button>
            </div>

            <TodoDialog
                isOpen={isDialogOpen}
                onClose={() => { handleToggleDialog(false) }}
                onSave={(todo) => { handleSaveTodo(todo) }}
            />
        </div>
    );
};

export default TodosList;
