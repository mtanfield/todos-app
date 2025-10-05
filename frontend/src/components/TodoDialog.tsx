import React, { useState, useEffect } from 'react';
import type { Todo } from '../store/todosSlice';
import './TodoDialog.scss';

interface TodoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (todo: Todo) => void;
    todo?: Todo | null;
}

const TodoDialog = ({ isOpen, onClose, onSave, todo }: TodoDialogProps) => {
    const [title, setTitle] = useState(todo ? todo.title : '');
    const [description, setDescription] = useState(todo ? todo.description : '');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [todo]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: Todo = {
            title,
            description,
            completed: todo ? todo.completed : false
        };
        onSave(newTodo);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="todo-dialog">
            <div className="todo-dialog-backdrop" onClick={onClose} />
            <div className="todo-dialog-content">
                <div className="todo-dialog-header">
                    <h2 className="todo-dialog-title">{todo ? 'Edit' : 'Add'} Todo</h2>
                </div>
                <form className="todo-dialog-form" onSubmit={handleSave}>
                    <input type="text" className="todo-dialog-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="todo-dialog-textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button type="submit" className="todo-dialog-submit">{todo ? 'Save Changes' : 'Add Todo'}</button>
                </form>
            </div>
        </div>
    );
};

export default TodoDialog;
