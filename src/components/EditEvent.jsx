import React, { Component, PropTypes } from 'react'
import EditEventForm from './EditEventForm.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect  } from 'react-router-dom'
import { editEvent, editOnChanged, editOnStartAtChanged, editOnEndAtChanged, editOnLocationChanged, editShowMap, editOnCoverChanged,
          edit_handleScale, edit_handlePositionChange, edit_handleXPosition, edit_handleYPosition, edit_setPreview,
          editchangeField
        } from '../actions/actions'

class EditEvent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, selected_event, edit_event_editor } = this.props

    return (
      <div>
         {
          <EditEventForm 
            key={selected_event.id}//i is this loop's iteration
            {...selected_event}
            {...edit_event_editor}
            editEvent = {this.props.editEvent}
            editOnChanged = {this.props.editOnChanged }
            editOnStartAtChanged = {this.props.editOnStartAtChanged}
            editOnEndAtChanged = {this.props.editOnEndAtChanged}
            editOnLocationChanged = {this.props.editOnLocationChanged}
            editShowMap = {this.props.editShowMap}
            editOnCoverChanged = {this.props.editOnCoverChanged}
            edit_handleScale = {this.props.edit_handleScale}
            edit_handlePositionChange = {this.props.edit_handlePositionChange}
            edit_handleXPosition = {this.props.edit_handleXPosition}
            edit_handleYPosition = {this.props.edit_handleYPosition}
            edit_setPreview = {this.props.edit_setPreview}
            editchangeField = {this.props.editchangeField}
          />
        }
      </div>
    )
   }
}

function select(state) {
  return {
    selected_event: state.events.getIn(['selected_event']).toJS(),
    edit_event_editor: state.events.getIn(['edit_event_editor']).toJS()
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    editEvent: bindActionCreators( editEvent, dispatch ),
    editOnChanged: bindActionCreators( editOnChanged, dispatch ),
    editOnStartAtChanged: bindActionCreators( editOnStartAtChanged, dispatch ),
    editOnEndAtChanged: bindActionCreators( editOnEndAtChanged, dispatch ),
    editOnLocationChanged: bindActionCreators( editOnLocationChanged, dispatch),
    editShowMap: bindActionCreators(editShowMap, dispatch),
    editOnCoverChanged: bindActionCreators(editOnCoverChanged, dispatch),
    edit_handleScale: bindActionCreators(edit_handleScale, dispatch),
    edit_handlePositionChange: bindActionCreators(edit_handlePositionChange, dispatch),
    edit_handleXPosition: bindActionCreators(edit_handleXPosition, dispatch),
    edit_handleYPosition: bindActionCreators(edit_handleYPosition, dispatch),
    edit_setPreview: bindActionCreators(edit_setPreview, dispatch),
    editchangeField: bindActionCreators(editchangeField, dispatch),
  }
}

export default connect( select, mapDispatchToProps )( EditEvent, editEvent, editOnChanged, editOnStartAtChanged, editOnEndAtChanged, editOnLocationChanged, editShowMap, editOnCoverChanged, 
                        edit_handleYPosition, edit_handleXPosition, edit_handlePositionChange,editchangeField, edit_handleScale, edit_setPreview
                      );

