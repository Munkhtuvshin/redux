import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addEvent, onChanged, onStartAtChanged, onEndAtChanged, onLocationChanged, showMap, onCoverChanged,
         handleScale, handlePositionChange, handleXPosition, handleYPosition, setPreview 
       } from '../actions/actions'

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
  }

  addEvent = (eve) => {
    this.props.addEvent(eve)
  }

  render() {
    const { add_event, add_event_editor } = this.props
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
            handleScale = {this.props.handleScale}
            handlePositionChange = {this.props.handlePositionChange}
            handleXPosition = {this.props.handleXPosition}
            handleXPosition = {this.props.handleXPosition}
            handleYPosition = {this.props.handleYPosition}
            setPreview = {this.props.setPreview}
            {...add_event}
            {...add_event_editor}
          />
        }
      </div>
    )
  }
}

function select( state ) {
  return {
    add_event: state.events.getIn(['add_event']).toJS(),
    add_event_editor: state.events.getIn(['add_event_editor']).toJS()
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
    onCoverChanged: bindActionCreators(onCoverChanged, dispatch),
    handleScale: bindActionCreators(handleScale, dispatch),
    handlePositionChange: bindActionCreators(handlePositionChange, dispatch),
    handleXPosition: bindActionCreators(handleXPosition, dispatch),
    handleYPosition: bindActionCreators(handleYPosition, dispatch),
    setPreview: bindActionCreators(setPreview, dispatch)
  }
}

export default connect( select, mapDispatchToProps )( AddEvent, addEvent, onChanged, onStartAtChanged, onEndAtChanged, onLocationChanged, showMap, onCoverChanged, 
                        handleScale, handlePositionChange, handleXPosition, handleYPosition, setPreview );
