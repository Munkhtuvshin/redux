import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO,DELETE_EVENT, CHANGE_TODO, ADD_EVENT } from '../actions/actions'

function todo(state, action) {
   switch (action.type) {
      case ADD_TODO:
         return {
            id: action.id,
            text: action.text,
         }
      default:
         return state
   }
}
function todos(state = [], action) {
   switch (action.type) {
      case ADD_TODO: {
         //console.log(state);
         return state.concat([{
            id: action.id,
            text: action.text,
            completed: false,  
         }])
      }
      case CHANGE_TODO: {
         
         var selectedTodo = state.find((todo) => {
            return todo.id == action.id
         })

         var index = state.findIndex((todo) => {
            return todo.id == action.id
         })

         var changedTodo = Object.assign( selectedTodo, {
           completed: !selectedTodo.completed,
         });

         console.log(state)
         return state
      }
      case DELETE_TODO: {

         var index = state.findIndex((todo) => {
            return todo.id == action.id
         })

         state.splice(index, 1);
         return [...state];
      }  

      default:
         return state
   }
}

function events(state = [], action) {
   switch (action.type) {

      case ADD_EVENT: {
         console.log(action.event);
         return state.concat([
            action.event
         ])
      } 
      case DELETE_EVENT: {
         
         var index = state.findIndex((event) => {
            return event.id == action.id
         })

         state.splice(index, 1);

         return [...state]


      } 
      default:
         return state
   }
}

const todoApp = combineReducers({
   todos,
   events,
})

export default todoApp