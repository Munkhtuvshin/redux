import React, { Component } from 'react';
import axios from 'axios';
import Event from './Event.jsx'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { deleteEvent, setEvent, setAllEvent } from '../actions/actions'
import 'semantic-ui-css/semantic.min.css'
import './eventList.css';
import { bindActionCreators } from 'redux'
import { Button, Table } from 'semantic-ui-react'
import ShowEventList from './ShowEventList'

var { Map, List, fromJS } = require('immutable');

class EventList extends Component {

  componentWillMount() {
    this.initStore()
  }

  constructor(props) {
    super(props);
    this.state = {
      navigate:false,
    }
  }

  initStore =  () =>{
    this.props.setAllEvent()
  }

  setEvent = (event) => {
    this.props.setEvent(event)
  }

  deleteEvent = (id) => {
    this.props.deleteEvent(id)   
  }

  render() {
   	const { dispatch, events } = this.props
    return (
      <ShowEventList
        events={events}
        setEvent={this.setEvent}
        deleteEvent={this.deleteEvent}
      />
    );
  }
}

function select(state) {
  return {
    events: state.events.getIn(['events']).toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEvent: bindActionCreators(deleteEvent, dispatch),
    setAllEvent: bindActionCreators(setAllEvent, dispatch),
    setEvent: bindActionCreators(setEvent, dispatch),   
  }
}

export default connect(select, mapDispatchToProps)(EventList);