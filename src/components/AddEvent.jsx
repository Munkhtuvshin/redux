import React, { Component, PropTypes } from 'react'
import AddEventForm from './AddEventForm.jsx'
import { connect } from 'react-redux'
import { addEvent, setAllEvent } from '../actions/actions'

class AddEvent extends React.Component {

   constructor(props) {
     super(props);
     this.state= {
      h : function(eve){

         this.props.dispatch(addEvent(eve))
      }   
     }
     this.state.h = this.state.h.bind(this);
     this.tr =this.tr.bind(this);

   }
   tr(eve){
         this.props.dispatch(addEvent(eve))

   }
   render() {

      const { dispatch, events } = this.props

      let{
         h
      }=this.state

      return (

         <div>
            {
               <AddEventForm 
                  addEvent = {this.tr}
                  setAllEvent = {(events) => dispatch(setAllEvent(events)) }
               />
            }
         </div>

      )
   }
}

function select(state) {
   return {
      events: state.events
   }
}

export default connect(select)(AddEvent);
