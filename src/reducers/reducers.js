import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO,DELETE_EVENT, CHANGE_TODO, ADD_EVENT,SET_EVENT, EDIT_EVENT, SET_ALL_EVENT, 
          CHANGE_TITLE, CHANGE_START_AT, CHANGE_END_AT, CHANGE_COVER_URL, CHANGE_LOCATION, SHOWMAP, 
          EDIT_CHANGE_TITLE, EDIT_CHANGE_START_AT, EDIT_CHANGE_END_AT, EDIT_CHANGE_COVER_URL, EDIT_CHANGE_LOCATION, EDIT_SHOWMAP
        } from '../actions/actions'
import moment from 'moment';

var { Map, List,fromJS } = require('immutable');

const eventInitial = fromJS({
   events: [],
   add_event:{ title: 'hellos', start_at: moment(), end_at: moment(), cover_url: '', coordinate:{
        lat:47.78963221880257,
        lng:107.38140106201172,  
      }, showmap:false }, 
   selected_event: {},
})

function events(state = eventInitial, action) {
  switch (action.type) {
    case ADD_EVENT: {
      let events = state.get('events');
      events = events.push(action.event)
      return state.set('events', fromJS(events))
    } 

    case EDIT_EVENT: {
      let events = state.get('events')
      var index = events.findIndex((event) => {
        return event.get('_id') == action.event._id
      })
      return state.setIn(['events', index], fromJS(action.event));
    }

    case SET_EVENT: {
      let tmp = {showmap:false}
      let tmp1 = Object.assign(tmp, action.event);
      return state.set('selected_event',fromJS(tmp1))
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

    case CHANGE_TITLE: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.title =action.value;
      return state.set('add_event', fromJS(tmp));
    }

    case CHANGE_START_AT: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.start_at = action.value;
      return state.set('add_event', fromJS(tmp));
    }

    case CHANGE_END_AT: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.end_at = action.value;
      return state.set('add_event', fromJS(tmp));
    }

    case CHANGE_COVER_URL: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.cover_url = action.value;
      return state.set('add_event', fromJS(tmp));
    }

    case CHANGE_LOCATION: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.coordinate.lat = action.value.lat;
      tmp.coordinate.lng = action.value.lng;
      return state.set('add_event', fromJS(tmp));
    }

    case SHOWMAP: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.showmap = !tmp.showmap;
      return state.set('add_event', fromJS(tmp));
    }
    //---------Edit actions----------------
    case EDIT_CHANGE_TITLE: {
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.title =action.value;
      return state.set('selected_event', fromJS(tmp));
    }

    case EDIT_CHANGE_START_AT: {
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.start_at = action.value;
      return state.set('selected_event', fromJS(tmp));
    }

    case EDIT_CHANGE_END_AT: {
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.end_at = action.value;
      return state.set('selected_event', fromJS(tmp));
    }

    case EDIT_CHANGE_COVER_URL: {
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.cover_url = action.value;
      return state.set('selected_event', fromJS(tmp));
    }

    case EDIT_CHANGE_LOCATION: {
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.coordinate.lat = action.value.lat;
      tmp.coordinate.lng = action.value.lng;
      return state.set('selected_event', fromJS(tmp));
    }

    case EDIT_SHOWMAP: {
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.showmap = !tmp.showmap;
      return state.set('selected_event', fromJS(tmp));
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

const todoApp = combineReducers({
  todos,
  events,
})

export default todoApp