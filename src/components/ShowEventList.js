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

export default class ShowEventList extends Component {

   constructor(props) {
    super(props);
    this.state = {
      navigate:false,
    }
  }

   render() {
   	let { 
      events
    } = this.props

      return (
        <div className='tableMargin'>
          <Link to="/addevent" >    <Button primary className='addButton'>Add</Button> </Link>

          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Зураг</Table.HeaderCell>
                <Table.HeaderCell>Гарчиг</Table.HeaderCell>
                <Table.HeaderCell>Эхлэх хугацаа</Table.HeaderCell>
                <Table.HeaderCell>Дуусах хугацаа</Table.HeaderCell>
                <Table.HeaderCell>Beeco-д тавих хугацаа</Table.HeaderCell>
                <Table.HeaderCell>Beeco-д устах хугацаа</Table.HeaderCell>
                <Table.HeaderCell>Байршил</Table.HeaderCell>
                <Table.HeaderCell>Засах</Table.HeaderCell>
                <Table.HeaderCell>Устгах</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                events.map((event, i) => (
                  <Event
                    key={i}//i is this loop's iteration
                    rowNumber={i + 1}
                    {...event}
                    deleteEvent = {this.props.deleteEvent}
                    setEvent={this.props.setEvent}  />
                  )
                )
              }
            </Table.Body>
          </Table>
        </div>
      );
   }
}



