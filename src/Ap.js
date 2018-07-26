import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { addTodo, deleteTodo, changeTodo } from './actions/actions'
import EventList  from './components/EventList.js'
import AddEvent from './components/AddEvent.js'

class Ap extends Component {
   render() {

      return (
         <Router>
            <Switch>
               <Route  path='/eventlist' component={EventList} />
               <Route  path='/addevent' component={AddEvent} />
            </Switch>
         </Router>
      )
   }
}

export default Ap;
