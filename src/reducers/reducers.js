import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO,DELETE_EVENT, CHANGE_TODO, ADD_EVENT,SET_EVENT, EDIT_EVENT } from '../actions/actions'

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

const eventInitial = {
   events: [],
   selected_event: {},
}

function events(state = eventInitial, action) {
   switch (action.type) {

      case ADD_EVENT: {
        
         let events = state.events
         events = events.concat([{
            id:action.id,
            title:action.event.title,
            cover_url:action.event.cover_url,
            start_at: action.event.start_at,
            end_at: action.event.end_at,
            location:action.event.location,
         }])
         //console.log(events)
         state.events = events
          //console.log(state);
         //console.log(state.events);
         return state
      } 
      case EDIT_EVENT: {
         console.log(action);
         var index = state.events.findIndex((event) => {
            return event.id == action.event.id
         })
         console.log(index);
         console.log(action.event);
         let events = state.events
         events[index] = action.event;

         state.events = [...events]
         return state
      }
      case SET_EVENT: {
         //state.selected_event = action.event
         Object.assign(state.selected_event,
            action.event)
         console.log(state)
         return state
      }
      case DELETE_EVENT: {
         //console.log(action);
         var index = state.events.findIndex((event) => {
            return event.id == action.id
         })
         
         var events = Object.assign([], state.events)
         events.splice(index, 1);

         return Object.assign({}, state, { events })
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