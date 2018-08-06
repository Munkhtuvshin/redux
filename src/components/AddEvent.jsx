import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addEvent, onTitleChanged } from '../actions/actions'

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
    // this.state= {
    //   h : function(eve){
    //   this.props.dispatch(addEvent(eve))
    //   }   
    // }
    //this.state.h = this.state.h.bind(this);
  }

  addEvent = (eve) => {
    this.props.addEvent(eve)
  }
  onTitleChanged = (value) => {
    this.props.onTitleChanged(value)
  }
  render() {
    const { add_event } = this.props
    // console.log('addEvent ajilsan');
    // console.log(this.props);
    return (
      <div>
        {
          <AddEventForm 
            addEvent = {this.addEvent}
            onTitleChanged = {this.onTitleChanged }
            {...add_event}
          />
        }
      </div>
    )
   }
}

function select( state ) {
  return {
    add_event: state.events.getIn(['add_event']).toJS()
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addEvent: bindActionCreators( addEvent, dispatch ),
    onTitleChanged: bindActionCreators( onTitleChanged, dispatch ),
  }
}

export default connect( select, mapDispatchToProps )( AddEvent, onTitleChanged );
