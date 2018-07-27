import React, { Component, PropTypes } from 'react'
import { Redirect, Link  } from 'react-router-dom'
import AvatarEditor from 'react-avatar-editor'


export default class Event extends React.Component {
   // shouldComponentUpdate(nextProps, nextState) {
   //   if(nextProps.completeddasthis.props.completed) return true
   //   return false;
   // }

   render() {
      

      return (
         <div>
            
            <img
            src={this.props.cover_url}/>

            <h3>
              {this.props.title}
            </h3>
            
            <label style={{
                     marginRight: '30px'
                   }}>
              {this.props.start_at}
            </label>
            
            <label style={{
                     marginRight: '30px'
                   }}>
              {this.props.end_at}
            </label>
            
            <label style={{
                     marginRight: '20px'
                   }}>
              {this.props.location}
            </label>

            <button onClick = {() => this.props.setEvent(this.props)} >
               edit
            </button>
            <button onClick = {() => this.props.deleteEvent(this.props.id)} >
               delete
            </button>
         </div>
      )
   }
}