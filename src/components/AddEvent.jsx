import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addEvent, setAllEvent } from '../actions/actions'

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
      this.state= {
        h : function(eve){
        this.props.dispatch(addEvent(eve))
      }   
    }
    this.state.h = this.state.h.bind(this);
  }
  tr = (eve) => {
    this.props.addEvent(eve)
  }
  render() {
    const { dispatch, events } = this.props
    let{
      h
    }=this.state

    return (

      <div>
        {
          <AddEventForm 
            addEvent = {this.tr}
            setAllEvent = {(events) => dispatch(setAllEvent(events)) }
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

function mapDispatchToProps(dispatch) {
  return {
    addEvent: bindActionCreators(addEvent, dispatch),
  }
}

export default connect(select, mapDispatchToProps)(AddEvent);
