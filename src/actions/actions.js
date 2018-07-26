export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'
export const ADD_EVENT = 'ADD_EVENT'


let nextTodoId = 0;
let eventId=0;
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
export function addEvent(event) {
   
   event.id=eventId++;
   return {
   	type: ADD_EVENT,
      event,
   };
}