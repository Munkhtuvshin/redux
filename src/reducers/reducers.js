import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO,DELETE_EVENT, CHANGE_TODO, ADD_EVENT,SET_EVENT, EDIT_EVENT, SET_ALL_EVENT } from '../actions/actions'
var { Map, List,fromJS } = require('immutable');



function events(state = eventInitial, action) {
   switch (action.type) {

      case ADD_EVENT: {
         //console.log(action);

         let events = state.get('events')
         events = events.push(fromJS(action.event))
         //console.log(events);
         return state.set('events', events)

      } 
       case EDIT_EVENT: {

         let events = state.get('events')
         var index = events.findIndex((event) => {
            return event.get('id') == action.event.id
         })
         console.log('edit event');
         console.log(action.event);
         console.log(index);
         console.log(events);
         //events[index] = action.event
      //    console.log(action);
      //    var index = state.events.findIndex((event) => {
      //       return event.id == action.event.id
      //    })
      //    console.log(index);
      //    console.log(action.event);
      //    let events = state.events
      //    events[index] = action.event;

      //    state.events = [...events]
      console.log('setIn method: ');
      console.log(state.setIn(['events', index], fromJS(action.event)));
      //setIn();
      return state.setIn(['events', index], fromJS(action.event));
      }
      case SET_EVENT: {
         //state.selected_event = action.event
         // Object.assign(state.selected_event,
         //    action.event)
         // console.log(state)
         //console.log('set event');
         //console.log(events);
         //console.log(action.event);
         return state.set('selected_event',fromJS(action.event))
      }
      case DELETE_EVENT: {

         let events = state.get('events')
         var index = events.findIndex((event) => {
            return event.get('id') == action.id
         })
         // console.log(action);
         // var index = state.events.findIndex((event) => {
         //    return event.id == action.id
         // })
         
         // var events = Object.assign([], state.events)
         // events.splice(index, 1);

          return state.removeIn(['events', index])
      }
      case SET_ALL_EVENT: {
         //state.events = action.events
         // let events = []
         // events = events.concat(action.events)
         // state.events = events
         //console.log('set all');
         //console.log(action.events)
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