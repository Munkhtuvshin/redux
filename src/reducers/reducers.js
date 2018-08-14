import { combineReducers } from 'redux'
import { DELETE_EVENT, ADD_EVENT,SET_EVENT, EDIT_EVENT, SET_ALL_EVENT, 
         CHANGE_TITLE, CHANGE_START_AT, CHANGE_END_AT, CHANGE_COVER_URL, CHANGE_LOCATION, SHOWMAP, 
         EDIT_CHANGE_TITLE, EDIT_CHANGE_START_AT, EDIT_CHANGE_END_AT, EDIT_CHANGE_COVER_URL,
         EDIT_CHANGE_LOCATION, EDIT_SHOWMAP, FIELD_CHANGED, GET_ADDRESS, EDIT_FIELD_CHANGED
        } from '../actions/actions'
import moment from 'moment';

var { Map, List,fromJS } = require('immutable');

const eventInitial = fromJS({
  events: [],
  add_event:{ title: '', beeco_start_at:moment(), beeco_end_at:moment(), start_at: moment(), end_at: moment(), cover_url: '', 
              coordinate:{ lat:47.920659,lng:106.917636, addressName:'Prime Minister A.Amar St 29, Ulaanbaatar 14200, Mongolia' }, showmap:false 
            },
  add_event_editor:{ allowZoomOut: false, position: { x: 0.5, y: 0.5 }, scale: 1, 
              rotate: 0, borderRadius: 0, preview: null, width: 300, height: 534,},
  edit_event_editor:{ allowZoomOut: false, position: { x: 0.5, y: 0.5 }, scale: 1, 
                rotate: 0, borderRadius: 0, preview: null, width: 300, height: 534,},
  selected_event: {},
})

function events(state = eventInitial, action) {
  switch (action.type) {

    //----------Event actions---------------
    case FIELD_CHANGED: {
      return state.setIn(['add_event', action.field], fromJS(action.value) )
    }
    case EDIT_FIELD_CHANGED: {

      return state.setIn(['selected_event', action.field], fromJS(action.value) )
    }
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
      console.log('edit event vent')
      console.log(index)
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
    case CHANGE_LOCATION: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.coordinate.lat = action.value.lat;
      tmp.coordinate.lng = action.value.lng;
      tmp.coordinate.addressName = action.address_name;
      console.log(action.address_name);
      return state.set('add_event', fromJS(tmp));
    }
    case SHOWMAP: {
      let tmp = state.getIn(['add_event']).toJS();
      tmp.showmap = !tmp.showmap;
      return state.set('add_event', fromJS(tmp));
    }
    case GET_ADDRESS: {
      return state.add_event.setIn(['coordinate', 'addressName'], fromJS( action.formatted_address ) )
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
      tmp.coordinate.addressName = action.value.addressName;
      return state.set('selected_event', fromJS(tmp));
    }
    case EDIT_SHOWMAP: {
      console.log('fdsfcxzv')
      let tmp = state.getIn(['selected_event']).toJS();
      tmp.showmap = !tmp.showmap;
      return state.set('selected_event', fromJS(tmp));
    }
    //---------editFormEditor actions-------
    case 'editFormScale': {
      let tmp = state.getIn(['edit_event_editor']).toJS();
      tmp.scale = action.scale;
      return state.set('edit_event_editor', fromJS(tmp))
    }
    case 'edit_form image editor position change': {
      let tmp = state.getIn(['edit_event_editor']).toJS();
      tmp.position = action.position;
      return state.set('edit_event_editor', fromJS(tmp))
    }
    case 'edit_form image editor position x change': {
      let tmp = state.getIn(['edit_event_editor']).toJS();
      tmp.position.x = action.x;
      return state.set('edit_event_editor', fromJS(tmp))
    }
    case 'edit_form image editor position y change': {
      let tmp = state.getIn(['edit_event_editor']).toJS();
      tmp.position.y = action.y;
      return state.set('edit_event_editor', fromJS(tmp))
    }
    case 'edit_form image editor set Preview': {
      let tmp = state.getIn(['edit_event_editor']).toJS();
      tmp.preview = action.preview;
      return state.set('edit_event_editor', fromJS(tmp))
    }
    
    default:
      return state
   }
}

const todoApp = combineReducers({
  events,
})

export default todoApp