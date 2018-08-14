import React, { Component, PropTypes } from 'react'
import { Redirect, Link  } from 'react-router-dom'
import AvatarEditor from 'react-avatar-editor'
import { Table, Button, Icon, Image } from 'semantic-ui-react'
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css'
import './event.css';

export default class Event extends React.Component {
   // shouldComponentUpdate(nextProps, nextState) {
   //   if(nextProps.completeddasthis.props.completed) return true
   //   return false;
   // }
  constructor(props) {
    super(props);
    this.state = {
      no:this.props.id
    }
  }

  render() {
    let {
      rowNumber
    } = this.props
    var clr=''
    console.log( this.props ) 
    if(moment()< moment(this.props.end_at) & moment()>moment(this.props.start_at) ) {
      clr = 'warning'
    }
    else if( moment() < moment(this.props.start_at) ) {
      clr = 'positive'
    }
    else if( moment() > moment(this.props.end_at) ) {
      clr = 'negative'
    }
    return (
      <Table.Row className={clr} >
        <Table.Cell>{rowNumber}</Table.Cell>
        <Table.Cell><Image src={this.props.cover_url} width='30' height='30'/></Table.Cell>
        <Table.Cell>{this.props.title}</Table.Cell>
        <Table.Cell>{ moment(moment.utc(this.props.start_at)).format('LL') }</Table.Cell>
        <Table.Cell>{moment.utc(this.props.end_at).format('LL')}</Table.Cell>
        <Table.Cell>{moment.utc(this.props.beeco_start_at).format('LL')}</Table.Cell>
        <Table.Cell>{moment.utc(this.props.beeco_end_at).format('LL')}</Table.Cell>
        <Table.Cell>{this.props.coordinate.lat}, {this.props.coordinate.lng}</Table.Cell>
        
        <Table.Cell>
          <center>
            <Link to='/editevent'>
            <div className='onhovr'>
               <Icon onClick = { () => this.props.setEvent(this.props)} className='borderRadius' bordered  name='edit' color="teal"  />
            </div>
            </Link>
          </center>
        </Table.Cell>

        <Table.Cell>
          <center>
            <div className='onhovr'>
              <Icon onClick = {() => this.props.deleteEvent(this.props._id)} className='borderRadius' bordered  name='delete' color="orange"  />
            </div>
          </center>
        </Table.Cell>      
      </Table.Row>
    )
  }
}