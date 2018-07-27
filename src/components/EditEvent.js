import React, { Component, PropTypes } from 'react'
import EditEventForm from './EditEventForm.js'
import { connect } from 'react-redux'
import {  editEvent } from '../actions/actions'
import { Redirect  } from 'react-router-dom'

class EditEvent extends React.Component {

   constructor(props) {
    super(props);
    this.state = {

        navigate:false,
    }
  }

   editEvent = (event) => {
      this.props.dispatch(editEvent(event))
      //this.setState({ navigate: true })
      //userdeg uildel //avmijlt messeage
   }
   render() {

      let {
        navigate,
      } = this.state

      if (navigate) {
        return <Redirect to="/eventlist" push={true} />
      }

      const { dispatch, selected_event } = this.props
      return (

         <div>
            {
               <EditEventForm 
                 key={selected_event.id}//i is this loop's iteration
                 {...selected_event}
                 editEvent = {this.editEvent}
               />
            }
         </div>

      )
   }
}

function select(state) {
   return {
      selected_event: state.events.selected_event
   }
}

export default connect(select)(EditEvent);
