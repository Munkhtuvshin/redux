import React, { Component, PropTypes } from 'react'
import Todo from './Todo.jsx'

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.todos.map((todo) => (
            <Todo
              key = {todo.id}
              {...todo}
              deleteTodo={this.props.deleteTodo}
              changeTodo={this.props.changeTodo}
            />
          ))
        }
      </ul>
    )
  }
}