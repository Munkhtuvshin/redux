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
               events.map((event) => (
                 <Event
                     //key = {event.id}
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
// EventList.defaultProps = {
//    id:1,
//    text:'etete',
//    completed:false,
// }
export default connect(select)(EventList);