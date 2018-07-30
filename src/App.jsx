import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, deleteTodo, changeTodo } from './actions/actions'
import AddTodo from './components/AddTodo.jsx'
import './App.css';
import TodoList from './components/TodoList.jsx'

class App extends Component {
   render() {
      const { dispatch, visibleTodos } = this.props
      
      return (
         <div>
            <AddTodo onAddClick={(text) => dispatch(addTodo(text))} />
            <TodoList 
               todos = {visibleTodos}
               deleteTodo = {(id) => dispatch(deleteTodo(id))}
               changeTodo = {(id) => dispatch(changeTodo(id))}
            />
         </div>
      )
   }
}
function select(state) {
   return {
      visibleTodos: state.todos
   }
}
export default connect(select)(App);
