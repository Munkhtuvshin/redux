import React, { Component } from 'react';
import Event from './Event.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EventList extends Component {

   render() {

   	const { dispatch, events } = this.props
   	console.log('fdsfdsf');
      return (
         <div>
         	<Link to="/addevent" >Add</Link>

            {
               events.map((event, i) => (
                 <Event
                     key={i}//i is this loop's iteration
                     {...event}
                  />
               ))
            }
          </div>
      );
   }
}

function select(state) {
   return {
      events: state.events
   }
}

export default connect(select)(EventList);