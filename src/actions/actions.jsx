import axios from 'axios';
import moment from 'moment';
export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const SET_EVENT = 'SET_EVENT'
export const SET_ALL_EVENT = 'SET_ALL_EVENT'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_START_AT = 'CHANGE_START_AT'
export const CHANGE_END_AT = 'CHANGE_END_AT'
export const CHANGE_COVER_URL = 'CHANGE_COVER_URL'
export const CHANGE_LOCATION = 'CHANGE_LOCATIOM'
export const SHOWMAP = 'SHOWMAP'

export const EDIT_CHANGE_TITLE = 'EDIT_CHANGE_TITLE'
export const EDIT_CHANGE_START_AT = 'EDIT_CHANGE_START_AT'
export const EDIT_CHANGE_END_AT = 'EDIT_CHANGE_END_AT'
export const EDIT_CHANGE_COVER_URL = 'EDIT_CHANGE_COVER_URL'
export const EDIT_CHANGE_LOCATION = 'EDIT_CHANGE_LOCATIOM'
export const EDIT_SHOWMAP = 'EDIT_SHOWMAP'

//---------------------EVENT actions-------------------
export function addEvent(event) {
  let formdata = new FormData();
  formdata.append('cover_url', event.cover_url);
  formdata.append('title', event.title);
  formdata.append('start_at', event.start_at);
  formdata.append('end_at', event.end_at);
  formdata.append('lat', event.coordinate.lat);
  formdata.append('lng', event.coordinate.lng);
  //console.log(data);
  return dispatch => {
    axios({
    method: 'post',
    url: 'http://localhost:8081/event',
    data: formdata,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        dispatch( {
          type: ADD_EVENT,
          event,
        })
    })
  } 
}

export function editEvent(event) {
  let formdata = new FormData();
  formdata.append('cover_url', event.cover_url);
  formdata.append('title', event.title);
  formdata.append('start_at', event.start_at);
  formdata.append('end_at', event.end_at);
  formdata.append('lat', event.coordinate.lat);
  formdata.append('lng', event.coordinate.lng);
  return dispatch => {
    axios({
    method: 'put',
    url: 'http://localhost:8081/event/'+event._id,
    data: formdata,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        dispatch( {
          type: EDIT_EVENT,
          event,
        })
    })
  } 
}

export function deleteEvent(id) {
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

export function setEvent(event) {
  return {
    type: SET_EVENT,
    event
  }
}

export function setAllEvent() {
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
//---------addEventForm actions--------
export function onChanged(type, value) {
  switch (type) {
    case 1: {
      return {
        type: CHANGE_TITLE,
        value
      }
    }
  }     
}

export function onStartAtChanged(value) {
  return {
    type: CHANGE_START_AT,
    value
  }
}

export function onEndAtChanged(value) {
  return {
    type: CHANGE_END_AT,
    value
  }
}

export function onLocationChanged(value) {
  return {
    type: CHANGE_LOCATION,
    value
  }
}

export function showMap() {
  return {
    type: SHOWMAP
  }
}

export function onCoverChanged(value) {
  return {
    type: CHANGE_COVER_URL,
    value
  }
}

//---------addFormEditor actions------
export function handleScale( e ) {
  let scale = parseFloat(e.target.value)
  return {
    type: 'addFormScale',
    scale
  }
}
export function handlePositionChange( position ) {
  return {
    type: 'position change',
    position
  }
}
export function handleXPosition( e ) {
  let x = parseFloat(e.target.value)
  return {
    type: 'position x change',
    x
  }
}
export function handleYPosition( e ) {
  let y = parseFloat(e.target.value)
  return {
    type: 'position y change',
    y
  }
}
export function setPreview( preview ) {
  return {
    type: 'set Preview',
    preview
  }
}

//------------EditForm actions------------
export function editOnChanged(type, value) {
  switch (type) {
    case 1: {
      return {
        type: EDIT_CHANGE_TITLE,
        value
      }
    }
  }     
}
export function editOnStartAtChanged(value) {
    console.log('actionn  :')
    console.log(value)
  return {
    type: EDIT_CHANGE_START_AT,
    value
  }
}

export function editOnEndAtChanged(value) {
  return {
    type: EDIT_CHANGE_END_AT,
    value
  }
}

export function editOnLocationChanged(value) {
  return {
    type: EDIT_CHANGE_LOCATION,
    value
  }
}

export function editShowMap() {
  return {
    type: EDIT_SHOWMAP
  }
}

export function editOnCoverChanged(value) {
  return {
    type: EDIT_CHANGE_COVER_URL,
    value
  }
}

//----------EditFormEditor actions---------
export function edit_handleScale( e ) {
  let scale = parseFloat(e.target.value)
  return {
    type: 'editFormScale',
    scale
  }
}
export function edit_handlePositionChange( position ) {
  return {
    type: 'edit_form image editor position change',
    position
  }
}
export function edit_handleXPosition( e ) {
  let x = parseFloat(e.target.value)
  return {
    type: 'edit_form image editor position x change',
    x
  }
}
export function edit_handleYPosition( e ) {
  let y = parseFloat(e.target.value)
  return {
    type: 'edit_form image editor position y change',
    y
  }
}
export function edit_setPreview( preview ) {
  return {
    type: 'edit_form image editor set Preview',
    preview
  }
}