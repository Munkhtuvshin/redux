import React, { Component } from 'react';
import Event from './Event.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { deleteEvent, setEvent } from '../actions/actions'

class EventList extends Component {

   constructor(props) {
    super(props);
    this.state = {

        navigate:false,
    }
  }

   setEvent = (event) => {
      this.props.dispatch(setEvent(event))
      this.setState({ navigate: true })
      //userdeg uildel //avmijlt messeage
   }

   render() {

      let {
        navigate,
      } = this.state

      if (navigate) {
        return <Redirect to="/editevent" push={true} />
      }

   	const { dispatch, events } = this.props
      return (
         <div>
         	<Link to="/addevent" >Add</Link>

            {
               events.map((event) => (
                 <Event
                     key={event.id}//i is this loop's iteration
                     {...event}
                     deleteEvent = {(id) => dispatch(deleteEvent(id))}
                     setEvent={this.setEvent}
                  />
               ))
            }
          </div>
      );
   }

}

function select(state) {
   return {
      events: state.events.events
   }
}

export default connect(select)(EventList);