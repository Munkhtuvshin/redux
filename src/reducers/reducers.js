import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO,DELETE_EVENT, CHANGE_TODO, ADD_EVENT,SET_EVENT, EDIT_EVENT, SET_ALL_EVENT } from '../actions/actions'
var { Map, List,fromJS } = require('immutable');

function events(state = eventInitial, action) {
  switch (action.type) {

    case ADD_EVENT: {
      let events = state.get('events')
      console.log(action.event);
      events = events.push(fromJS(action.event))
         //console.log(events);
      return state.set('events', events)
    } 

    case EDIT_EVENT: {
      let events = state.get('events')
      var index = events.findIndex((event) => {
        return event.get('_id') == action.event._id
      })
      return state.setIn(['events', index], fromJS(action.event));
    }

    case SET_EVENT: {
      return state.set('selected_event',fromJS(action.event))
    }

    case DELETE_EVENT: {
      let events = state.get('events')
      var index = events.findIndex((event) => {
        return event.get('_id') == action.id
      })
      return state.removeIn(['events', index])
    }

    case SET_ALL_EVENT: {
      return state.set('events', fromJS(action.events.data));
    }

    default:
      return state

   }

}

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

       //console.log(state)
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

const eventInitial = fromJS({
   events: [],
   selected_event: {},
})

const todoApp = combineReducers({
   todos,
   events,
})

export default todoApp