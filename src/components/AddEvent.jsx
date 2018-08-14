import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import { connect } from 'react-redux'
import { addEvent, showMap, onLocationChanged,
         handleScale, handlePositionChange, handleXPosition, handleYPosition, setPreview, changeField, getAddressName
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

    return (
      <div>
        {
          <AddEventForm 
            addEvent = {this.addEvent}
            onLocationChanged = {this.props.onLocationChanged}
            changeField = { this.props.changeField }
            showMap = {this.props.showMap}
            handleScale = {this.props.handleScale}
            handlePositionChange = {this.props.handlePositionChange}
            handleXPosition = {this.props.handleXPosition}
            handleXPosition = {this.props.handleXPosition}
            handleYPosition = {this.props.handleYPosition}
            setPreview = {this.props.setPreview}
            getAddressName = { this.props.getAddressName }
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
    showMap: bindActionCreators(showMap, dispatch),
    handleScale: bindActionCreators(handleScale, dispatch),
    handlePositionChange: bindActionCreators(handlePositionChange, dispatch),
    handleXPosition: bindActionCreators(handleXPosition, dispatch),
    handleYPosition: bindActionCreators(handleYPosition, dispatch),
    setPreview: bindActionCreators(setPreview, dispatch),
    onLocationChanged: bindActionCreators(onLocationChanged, dispatch),
    changeField: bindActionCreators(changeField, dispatch),
    getAddressName: bindActionCreators(getAddressName, dispatch)
  }
}

export default connect( select, mapDispatchToProps )( AddEvent, addEvent, onLocationChanged, showMap, 
                        handleScale, handlePositionChange, handleXPosition, handleYPosition, setPreview, changeField, getAddressName );
