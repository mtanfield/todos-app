import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import './TodoItem.scss';

type TodoItemProps = {
    title: string;
    description: string;
    completed: boolean;
    onToggleCompleted?: (completed: boolean) => void;
    onAction?: (action: 'edit' | 'delete') => void;
};

const TodoItem = ({ title, description, completed, onToggleCompleted, onAction }: TodoItemProps) => {
    const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onToggleCompleted) {
            onToggleCompleted(e.target.checked);
        }
    };

    const handleAction = (action: 'edit' | 'delete') => {
        if (onAction) {
            onAction(action);
        }
    };

    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <div>
                <input
                    type="checkbox"
                    className="todo-item-checkbox"
                    checked={completed}
                    onChange={handleCompletedChange}
                />
            </div>
            <div className="todo-item-title">{title}</div>
            <div className="todo-item-description">{description}</div>
            <div className="todo-item-actions">
                <button className="todo-item-button" title="Edit" onClick={() => handleAction('edit')}>
                    <EditIcon />
                </button>
                <button className="todo-item-button" title="Delete" onClick={() => handleAction('delete')}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
