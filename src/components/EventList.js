import React, { Component } from 'react';
import List from './List.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EventList extends Component {

   render() {

   	const { dispatch, events } = this.props
   	console.log(events);
      return (
         <div>
         	<Link to="/addlist">Ad</Link>

            {
               events.map((event) => (
                 <List
                     key = {event.id}
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
EventList.defaultProps = {
   id:1,
   text:'etete',
   completed:false,
}
export default connect(select)(EventList);