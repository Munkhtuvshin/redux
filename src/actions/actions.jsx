import axios from 'axios';



export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'
export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const SET_EVENT = 'SET_EVENT'
export const SET_ALL_EVENT = 'SET_ALL_EVENT'

let nextTodoId = 0;
let eventId=2;
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
   return dispatch => {   
      //console.log(event);
      axios.post('http://localhost:8081/event', event)
       .then( (response) =>{
         //event.id=response.data.event_id
         dispatch({
           type: ADD_EVENT,
           event: response.data.event,
         })
      })
   }
}

export function deleteEvent(id){
  return dispatch => {
   axios.delete('http://localhost:8081/event/'+id)
     .then( (response) =>{
      dispatch({
        type: DELETE_EVENT,
         id,
       })
     })
   }
}

export function editEvent(event){

   return dispatch => {
      axios.put('http://localhost:8081/event/'+event.id, event)
       .then( (response) =>{
         dispatch( {
           type: EDIT_EVENT,
           event,
         })
      })
   }

}

export function setEvent(event){

   return {
      type: SET_EVENT,
      event
   }
}
export function setAllEvent(){

   return dispatch => {
      axios.get('http://localhost:8081/event')
         .then( (events) =>{           
            dispatch({
              type: SET_ALL_EVENT,
              events,
            })
         })
      }
}