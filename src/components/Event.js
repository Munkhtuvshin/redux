import React, { Component, PropTypes } from 'react'

export default class Event extends React.Component {
   // shouldComponentUpdate(nextProps, nextState) {
   //   if(nextProps.completeddasthis.props.completed) return true
   //   return false;
   // }

   componentDidUpdate(prevProps, prevState) {
      console.log('Here is update = ' + this.props.id)  
   }

   render() {
      console.log(this.props.title);
      return (
         <div>
            <label>
            
            {this.props.title}
            
            </label> 

            <button >
               delete
            </button>
         </div>
      )
   }
}