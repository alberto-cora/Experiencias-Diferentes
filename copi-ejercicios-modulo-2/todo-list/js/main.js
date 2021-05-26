/**
 * <ul class="todo-list">
 *
 *      <li data-index="0">
 *          <input type="checkbox" />
 *          <p>Texto de la tarea</p>
 *          <time datetime="fecha-en-iso">18/11/2020 - 21:47</time>
 *      </li>
 *
 *      <li data-index="1">
 *          <input type="checkbox" checked />
 *          <p>Texto de la tarea</p>
 *          <time datetime="fecha-en-iso">18/11/2020 - 21:47</time>
 *      </li>
 *
 * </ul>
 */
import State, {
    addTodo,
    deleteAllTodos,
    toggleTodo,
    cleanTodos,
} from './state.js';

const todoForm = document.querySelector('form.todo-form'); //devuelve un formulario
const todoList = document.querySelector('ul.todo-list');
const todoClear = document.querySelector('button.todo-clean');
const todoEmpty = document.querySelector('button.todo-empty');

//necetiamos lugar donde almacenar estos todos

addTodo('comprar azúcar');
addTodo('estudiar la piramide 4');
addTodo('acariciar a las gatitas');

toggleTodo(1);

cleanTodos();

console.log(State.todos);
