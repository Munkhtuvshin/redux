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

      return (
         <div>
            
            <img src='logo.png'/>
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

            <button >
               edit
            </button>
            <button >
               delete
            </button>
         </div>
      )
   }
}