import todosRouter from './todos.js';

const todosRoutes = (app) => {
    app.use('/api/todos', todosRouter);
};

export default todosRoutes;