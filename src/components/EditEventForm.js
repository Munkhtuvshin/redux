import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Redirect  } from 'react-router-dom'

export default class EditEventForm extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      id: this.props.id,
      title: this.props.title,
      cover_url: this.props.cover_url,
      start_at: this.props.start_at,
      end_at: this.props.end_at,
      location: this.props.location,
      navigate:false,
  }
}

onLocationChanged = (event) => {
      this.setState({
            location: event.target.value
      })
}
onTitleChanged = (event) => {
      this.setState({
            title: event.target.value
      })
}

onCoverChanged = (event) => {
      this.setState({
            cover_url: event.target.value
      })
}
onStartAtChanged = (event) => {
      this.setState({
            start_at: event.target.value
      })
}
onEndAtChanged = (event) => {
      this.setState({
            end_at: event.target.value
      })
}

render() {

      let {
        title,
        cover_url,
        start_at,
        end_at,
        location,
      } = this.state


   return (
      <div>

        <label>Title</label>
        <input 
          type='text'
          value={title}
          onChange={this.onTitleChanged}
        /><br></br>

        <label>Photo</label>
        <input 
          type="file"
          value={cover_url}
          onChange={this.onCoverChanged}
        /><br></br>

        <label>Start time</label>
        <input 
          type="date" 
          value={start_at}
          onChange={this.onStartAtChanged}
        /><br></br>

        <label>End time</label>
        <input 
          type="date"
          value={end_at}
          onChange={this.onEndAtChanged}
        /><br></br>

        <label>Location</label>
        <input 
          type="text" 
          value={location}
          onChange={this.onLocationChanged}
        />

        <Link to="/eventlist" ><button onClick={this.editevent}> Edit </button></Link>
      </div>

      )
   }
   editevent = () => {
      let {
        id,
        title,
        cover_url,
        start_at,
        end_at,
        location
      } = this.state

      this.props.editEvent({
        id,
        title,
        cover_url,
        start_at,
        end_at,
        location
      })
      //this.setState({ navigate: true })
      // eturn <Redirect to="/eventlist" push={true} />
      //browserHistory.push('/eventlists')

   }
}