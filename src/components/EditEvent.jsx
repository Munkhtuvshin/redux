import React, { Component, PropTypes } from 'react'
import EditEventForm from './EditEventForm.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect  } from 'react-router-dom'
import { editEvent, editonChanged, editonStartAtChanged, editonEndAtChanged, editonLocationChanged, editshowMap, editonCoverChanged } from '../actions/actions'

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
            editonChanged = {this.props.editonChanged }
            editonStartAtChanged = {this.props.editonStartAtChanged}
            editonEndAtChanged = {this.props.editonEndAtChanged}
            editonLocationChanged = {this.props.editonLocationChanged}
            editshowMap = {this.props.editshowMap}
            editonCoverChanged = {this.props.editonCoverChanged}
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
    editonChanged: bindActionCreators( editonChanged, dispatch ),
    editonStartAtChanged: bindActionCreators( editonStartAtChanged, dispatch ),
    editonEndAtChanged: bindActionCreators( editonEndAtChanged, dispatch ),
    editonLocationChanged: bindActionCreators( editonLocationChanged, dispatch),
    editshowMap: bindActionCreators(editshowMap, dispatch),
    editonCoverChanged: bindActionCreators(editonCoverChanged, dispatch)
  }
}

export default connect( select, mapDispatchToProps )( EditEvent, editEvent, editonChanged, editonStartAtChanged, editonEndAtChanged, editonLocationChanged, editshowMap, editonCoverChanged );

