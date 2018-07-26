import React, { Component, PropTypes } from 'react'

export default class AddList extends React.Component {
   // shouldComponentUpdate(nextProps, nextState) {
   //   if(nextProps.completed != this.props.completed) return true
   //   return false;
   // }
   componentDidUpdate(prevProps, prevState) {
      console.log('Here is update = ' + this.props.id)  
   }

   render() {
      return (
         <div>
            <label>Title</label>
            <input type = 'text' ref = 'input' /><br></br>

            <label>Photo</label>
            <input type="file" /><br></br>
            
            <label>Start time</label>
            <input type="date" /><br></br>
            
            <label>End time</label>
            <input type="date" /><br></br>
            
            <label>Location</label>
            <input type="text" />
         </div>
      )
   }
}
