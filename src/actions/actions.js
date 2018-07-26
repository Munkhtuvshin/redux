export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'

let nextTodoId = 0;

export function addTodo(text) {
   return {
      type: ADD_TODO,
      id: nextTodoId++,
      text
   };
}

export function deleteTodo(id) {
   return {
      type: DELETE_TODO,
      id,
   };
}
export function changeTodo(id) {
   return {
   	  type: CHANGE_TODO,
      id,
   };
}