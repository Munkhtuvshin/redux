import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Redirect  } from 'react-router-dom'
import AvatarEditor from 'react-avatar-editor'

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
      //console.log(event.target.files[0])
      var reader = new FileReader()
      debugger
      reader.onload = function(e) {
        console.log(e.target)
      }
      reader.readAsDataUrl(event.target.files[0])
      
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
        <AvatarEditor
              image="https://image.ibb.co/m5hVYo/Workspace_1_039.png"
              width={250}
              height={250}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
            />

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