const State = {
    todos: [],
};

//almacenar array de tares en el local storage

const saveTodos = () => {
    const todosAsString = JSON.stringify(State.todos);
    console.log(JSON);
};

//todos[] array vacío (de momento){}
//agregar nueva tarea

const addTodo = (text) => {
    //cremaos la tarea
    const newTodo = {
        text: text,
        done: false,
        date: new Date().toISOString(),
    };

    //puseamos tarea en el array.Utlizando "unshift" (ojo explicación David)
    State.todos.unshift(newTodo);
};
//eliminar todas las tareas
const deleteAllTodos = () => {
    State.todos = []; //array vacío
};
//marcar tarea como [ completada / no completada ] una tarea.
const toggleTodo = (index) => {
    const todo = State.todos[index];
    if (!todo) throw new Error('la tarea no existe.');
    todo.done = !todo.done;
};

//eliminamos tareas completadas

const cleanTodos = () => {
    State.todos = State.todos.filter((todo) => !todo.done);
};

//exportamos el objeto y las funciones

export { addTodo, deleteAllTodos, toggleTodo, cleanTodos };
export default State;
