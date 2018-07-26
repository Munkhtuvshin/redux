import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { addTodo, deleteTodo, changeTodo } from './actions/actions'
import EventList  from './components/EventList.js'
import AddList  from './components/AddList.js'

class Ap extends Component {
   render() {

      return (
         <Router>
            <Switch>
               <Route  path='/eventlists' component={EventList} />
               <Route  path='/addlist' component={AddList} />
            </Switch>
         </Router>
      )
   }
}

export default Ap;
