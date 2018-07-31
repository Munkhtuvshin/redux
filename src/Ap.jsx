import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { addTodo, deleteTodo, changeTodo } from './actions/actions'
import EventList  from './components/EventList.jsx'
import AddEvent from './components/AddEvent.jsx'
import EditEvent from './components/EditEvent.jsx'
import ShowApi from './showApi.js'

class Ap extends Component {
   render() {

      return (
         <Router>
            <Switch>
               <Route  path='/eventlist' component={EventList} />
               <Route  path='/addevent' component={AddEvent} />
               <Route  path='/editevent' component={EditEvent} />
               <Route  path='/showApi' component={ShowApi} />
            </Switch>
         </Router>
      )
   }
}

export default Ap;
