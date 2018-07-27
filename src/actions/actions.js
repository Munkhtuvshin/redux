export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'
export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const SET_EVENT = 'SET_EVENT'


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
   event.id=eventId++
   return {
   	type: ADD_EVENT,
      ,//id:eventId++,
      event,
   };
}

export function deleteEvent(id){

   return {
      type: DELETE_EVENT,
      id,
   }

}

export function editEvent(event){

   return {
      type: EDIT_EVENT,
      event
   }

}

export function setEvent(event){

   return {
      type: SET_EVENT,
      event
   }

}