import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Redirect  } from 'react-router-dom'

export default class AddEventForm extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      title: '',
      cover_url: '',
      start_at: '2015-05-08',
      end_at: '2015-08-09',
      location: '',
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
        navigate
      } = this.state
      
      if (navigate) {
        return <Redirect to="/eventlist" push={true} />
      }

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

        <button onClick={this.addevent}> Add </button>
      </div>

      )
   }
   addevent = () => {
      let {
        title,
        cover_url,
        start_at,
        end_at,
        location
      } = this.state

      this.props.addEvent({
            title,
            cover_url,
            start_at,
            end_at,
            location
      })
      this.setState({ navigate: true })
      // eturn <Redirect to="/eventlist" push={true} />
      //browserHistory.push('/eventlists')

   }
}