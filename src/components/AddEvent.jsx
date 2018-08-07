import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addEvent, onChanged, onStartAtChanged, onEndAtChanged, onLocationChanged, showMap, onCoverChanged } from '../actions/actions'

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
  }

  addEvent = (eve) => {
    this.props.addEvent(eve)
  }

  render() {
    const { add_event } = this.props
    // console.log(this.props);
    return (
      <div>
        {
          <AddEventForm 
            addEvent = {this.addEvent}
            onChanged = {this.props.onChanged }
            onStartAtChanged = {this.props.onStartAtChanged}
            onEndAtChanged = {this.props.onEndAtChanged}
            onLocationChanged = {this.props.onLocationChanged}
            showMap = {this.props.showMap}
            onCoverChanged = {this.props.onCoverChanged}
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
    onChanged: bindActionCreators( onChanged, dispatch ),
    onStartAtChanged: bindActionCreators( onStartAtChanged, dispatch ),
    onEndAtChanged: bindActionCreators( onEndAtChanged, dispatch ),
    onLocationChanged: bindActionCreators( onLocationChanged, dispatch),
    showMap: bindActionCreators(showMap, dispatch),
    onCoverChanged: bindActionCreators(onCoverChanged, dispatch)
  }
}

export default connect( select, mapDispatchToProps )( AddEvent, addEvent, onChanged, onStartAtChanged, onEndAtChanged, onLocationChanged, showMap, onCoverChanged );
