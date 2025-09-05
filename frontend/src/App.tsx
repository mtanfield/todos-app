import { TodosList } from './components';
import { useFetchTodosQuery } from './store/todosSlice';

import './App.css';

const App = () => {
  const {
    data: todos = [],
    error,
    isLoading
  } = useFetchTodosQuery();

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

  return (
    <>
      <div>
        To-Do App
      </div>
      <hr />
      <div>
        {isLoading && <div>Loading...</div>}
        {errorDisplay && <div>{errorDisplay}</div>}
        {!isLoading && !error && <TodosList todos={todos} />}
      </div>
    </>
  )
};

export default App;
