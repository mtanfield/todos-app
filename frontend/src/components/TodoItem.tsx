import './Todo.scss';

type TodoItemProps = {
    title: string;
    description: string;
    completed: boolean;
};

const TodoItem = ({ title, description, completed }: TodoItemProps) => {
    const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`${title} completed: ${e.target.checked}`);
    }

    return (
        <div className="todo-item">
            <h3>{title}</h3>
            <p>{description}</p>
            <input type="checkbox" checked={completed} onChange={handleCompletedChange} />
        </div>
    );
};

export default TodoItem;
