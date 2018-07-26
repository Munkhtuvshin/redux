import React, { Component } from 'react';
import Event from './Event.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EventList extends Component {

   render() {

   	const { dispatch, events } = this.props
      return (
         <div>
         	<Link to="/addevent" >Add</Link>

            {
               events.map((event) => (
                 <Event
                     key={event.id}//i is this loop's iteration
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