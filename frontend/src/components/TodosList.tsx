import type { Todo } from '../store/todosSlice';
import TodoItem from './TodoItem';

import './Todo.scss';

const TodosList = ({ todos }: { todos: Todo[] }) => {
    return (
        <div className="todos-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </div>
    );
};

export default TodosList;
    