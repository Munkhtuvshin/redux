import React, { Component, PropTypes } from 'react'

export default class List extends React.Component {
   // shouldComponentUpdate(nextProps, nextState) {
   //   if(nextProps.completed != this.props.completed) return true
   //   return false;
   // }

   componentDidUpdate(prevProps, prevState) {
      console.log('Here is update = ' + this.props.id)  
   }

   render() {
      return (
         <li>
            <label>
            
            {this.props.text}
            
            </label> 

            <button >
               delete
            </button>
         </li>
      )
   }
}