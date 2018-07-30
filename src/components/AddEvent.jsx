import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { connect } from 'react-redux'
import { addEvent } from '../actions/actions'

class AddEvent extends React.Component {

   render() {

      const { dispatch, events } = this.props
      return (

         <div>
            {
               <AddEventForm 
                  addEvent = {(event) => dispatch(addEvent(event))}
               />
            }
         </div>

      )
   }
}

function select(state) {
   return {
      events: state.events
   }
}

export default connect(select)(AddEvent);
