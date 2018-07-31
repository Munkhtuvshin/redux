import React, { Component } from 'react';
import axios from 'axios';
import Event from './Event.jsx'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { deleteEvent, setEvent, setAllEvent } from '../actions/actions'
import 'semantic-ui-css/semantic.min.css'
import './eventList.css';
import { Button, Table } from 'semantic-ui-react'
var { Map, List, fromJS } = require('immutable');

class EventList extends Component {

   componentWillMount() {
      this.initStore()
   }
   constructor(props) {
    super(props);
    this.state = {

        navigate:false,
    }
    //this.initStore()
  }
  initStore =  () =>{

    axios.get('http://localhost:8081/event')
      .then( (response) =>{
        //console.log(response.status);
        this.props.dispatch(setAllEvent(response.data))
      })
  }
   setEvent = (event) => {
      this.props.dispatch(setEvent(event))
      this.setState({ navigate: true })
   }
   deleteEvent = (id) => {
      axios.delete('http://localhost:8081/event/'+id)
      .then( (response) =>{
        console.log(response.status);
        this.props.dispatch(deleteEvent(id))
      })
   }

   render() {

      let {
        navigate,
      } = this.state

      if (navigate) {
        return <Redirect to="/editevent" push={true} />
      }

   	const { dispatch, events } = this.props
    console.log(events);
    //alert(events.length)***************************
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
                events.map((event, i) => (
                    //m =event.id
                    //console.log(event)
                    //event.id=m+1
                  <Event
                    key={event.id}//i is this loop's iteration
                    rowNumber={i + 1}
                    {...event}
                    deleteEvent = {this.deleteEvent}
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
      events: state.events.getIn(['events']).toJS()
   }
}

export default connect(select)(EventList);


