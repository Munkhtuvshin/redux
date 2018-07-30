import React, { Component } from 'react';
import Event from './Event.jsx'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { deleteEvent, setEvent } from '../actions/actions'
import 'semantic-ui-css/semantic.min.css'
import './eventList.css';
import { Button, Table } from 'semantic-ui-react'

class EventList extends Component {

   constructor(props) {
    super(props);
    this.state = {

        navigate:false,
    }
  }

   setEvent = (event) => {
      this.props.dispatch(setEvent(event))
      this.setState({ navigate: true })

   }

   render() {

      let {
        navigate,
      } = this.state

      if (navigate) {
        return <Redirect to="/editevent" push={true} />
      }

   	const { dispatch, events } = this.props

    //alert(events.length)
      return (

        <div className='tableMargin'>
          <Link to="/addevent" >    <Button primary className='rightButton'>Add</Button> </Link>

          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Зураг</Table.HeaderCell>
                <Table.HeaderCell>Гарчиг</Table.HeaderCell>
                <Table.HeaderCell>Эхлэх хугацаа</Table.HeaderCell>
                <Table.HeaderCell>Дуусах хугацаа</Table.HeaderCell>
                <Table.HeaderCell>Байршил</Table.HeaderCell>
                <Table.HeaderCell>Засах</Table.HeaderCell>
                <Table.HeaderCell>Устгах</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                events.map((event) => (
                    //m =event.id
                    //console.log(event)
                    //event.id=m+1
                  <Event
                    key={event.id}//i is this loop's iteration
                    {...event}
                    deleteEvent = {(id) => dispatch(deleteEvent(id))}
                    setEvent={this.setEvent}  />
                  ))
                }
            </Table.Body>
          </Table>
        </div>

      );
   }

}

function select(state) {
   return {
      events: state.events.events
   }
}

export default connect(select)(EventList);