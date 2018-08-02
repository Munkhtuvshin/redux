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
    axios.post('http://localhost:8081/event', event)
    .then( (response) =>{
      console.log(response);
      dispatch({
        type: ADD_EVENT,
        event: event,
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
   console.log(event);
  return dispatch => {
    axios.put('http://localhost:8081/event/'+event._id, event)
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