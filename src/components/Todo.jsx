import React, { Component, PropTypes } from 'react'

export default class Todo extends React.Component {
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
        <label onClick={() => this.props.changeTodo(this.props.id)}  
          style={{
            textDecoration: this.props.completed ? 'line-through' : 'none'
          }}
        >
          {this.props.text}
        </label> 

        <button onClick = {() => this.props.deleteTodo(this.props.id)}>
           delete
        </button>
      </li>
    )
  }
}