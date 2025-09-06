import './TodoItem.scss';

type TodoItemProps = {
    title: string;
    description: string;
    completed: boolean;
    onToggleCompleted?: (completed: boolean) => void;
};

const TodoItem = ({ title, description, completed, onToggleCompleted }: TodoItemProps) => {
    const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onToggleCompleted) {
            onToggleCompleted(e.target.checked);
        }
    };

    return (
        <div className={`todo-item todos-list-row ${completed ? 'completed' : ''}`}>
            <div className="todos-list-cell">
                <input
                    type="checkbox"
                    className="todo-item-checkbox"
                    checked={completed}
                    onChange={handleCompletedChange}
                />
            </div>
            <div className="todos-list-cell todo-item-title">{title}</div>
            <div className="todos-list-cell todo-item-description">{description}</div>
        </div>
    );
};

export default TodoItem;
