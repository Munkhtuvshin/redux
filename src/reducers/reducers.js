import { combineReducers } from 'redux'
import { DELETE_EVENT, ADD_EVENT,SET_EVENT, EDIT_EVENT, SET_ALL_EVENT, 
          CHANGE_TITLE, CHANGE_START_AT, CHANGE_END_AT, CHANGE_COVER_URL, CHANGE_LOCATION, SHOWMAP, 
          EDIT_CHANGE_TITLE, EDIT_CHANGE_START_AT, EDIT_CHANGE_END_AT, EDIT_CHANGE_COVER_URL, EDIT_CHANGE_LOCATION, EDIT_SHOWMAP
        } from '../actions/actions'
import moment from 'moment';

var { Map, List,fromJS } = require('immutable');

const eventInitial = fromJS({
  events: [],
  add_event:{ title: '', start_at: moment(), end_at: moment(), cover_url: '', 
              coordinate:{ lat:47.78963221880257,lng:107.38140106201172 }, showmap:false 
            },
  add_event_editor:{ allowZoomOut: false, position: { x: 0.5, y: 0.5 }, scale: 1, 
              rotate: 0, borderRadius: 0, preview: null, width: 300, height: 300,},
  selected_event: {},
})

function events(state = eventInitial, action) {
  switch (action.type) {

    //----------Event actions---------------
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

    //-----------addForm actions-------------
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

    //---------addFormEditor actions-------
    case 'addFormScale': {
      let tmp = state.getIn(['add_event_editor']).toJS();
      tmp.scale = action.scale;
      return state.set('add_event_editor', fromJS(tmp))
    }
    case 'position change': {
      let tmp = state.getIn(['add_event_editor']).toJS();
      tmp.position = action.position;
      return state.set('add_event_editor', fromJS(tmp))
    }
    case 'position x change': {
      let tmp = state.getIn(['add_event_editor']).toJS();
      tmp.position.x = action.x;
      return state.set('add_event_editor', fromJS(tmp))
    }
    case 'position y change': {
      let tmp = state.getIn(['add_event_editor']).toJS();
      tmp.position.y = action.y;
      return state.set('add_event_editor', fromJS(tmp))
    }
    case 'set Preview': {
      let tmp = state.getIn(['add_event_editor']).toJS();
      tmp.preview = action.preview;
      return state.set('add_event_editor', fromJS(tmp))
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
      console.log('fdsfcxzv')
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.showmap = !tmp.showmap;
      return state.set('selected_event', fromJS(tmp));
    }

    default:
      return state
   }
}

const todoApp = combineReducers({
  events,
})

export default todoApp