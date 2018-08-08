import React, { Component, PropTypes } from 'react'
import EditEventForm from './EditEventForm.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect  } from 'react-router-dom'
import { editEvent, editOnChanged, editOnStartAtChanged, editOnEndAtChanged, editOnLocationChanged, editShowMap, editOnCoverChanged } from '../actions/actions'

class EditEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navigate:false,
    }
  }

  editEvent = (event) => {
    this.props.editEvent(event)
    this.setState({ navigate: true })
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
            editOnChanged = {this.props.editOnChanged }
            editOnStartAtChanged = {this.props.editOnStartAtChanged}
            editOnEndAtChanged = {this.props.editOnEndAtChanged}
            editOnLocationChanged = {this.props.editOnLocationChanged}
            editShowMap = {this.props.editShowMap}
            editOnCoverChanged = {this.props.editOnCoverChanged}
          />
        }
      </div>
    )
   }
}

function select(state) {
  return {
    selected_event: state.events.getIn(['selected_event']).toJS(),
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
    editOnCoverChanged: bindActionCreators(editOnCoverChanged, dispatch)
  }
}

export default connect( select, mapDispatchToProps )( EditEvent, editEvent, editOnChanged, editOnStartAtChanged, editOnEndAtChanged, editOnLocationChanged, editShowMap, editOnCoverChanged );

