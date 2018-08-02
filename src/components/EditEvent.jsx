import React, { Component, PropTypes } from 'react'
import EditEventForm from './EditEventForm.jsx'
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
    this.setState({ navigate: true })
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
      //console.log(selected_event);
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
    selected_event: state.events.getIn(['selected_event']).toJS()
  }
}

export default connect(select)(EditEvent);
