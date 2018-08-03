import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Redirect  } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Preview from './Preview.jsx'
import AvatarEditor from 'react-avatar-editor'
import { Button, Checkbox, Form, Divider, Segment } from 'semantic-ui-react'
import './editEventForm.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import GMap from './GMap.jsx'

export default class EditEventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props._id,
      title: this.props.title,
      coordinate: this.props.coordinate,
      start_at: moment(this.props.start_at),
      end_at: moment(this.props.end_at),
      location: this.props.location,
      navigate:false,
      showMap:false,
      image: 'avatar.jpg',
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      borderRadius: 0,
      preview: null,
      width: 300,
      height: 300,
      }
  }

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()
    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
    })
  }

  handleXPosition = e => {
    const x = parseFloat(e.target.value)
    this.setState({  
      position: { ...this.state.position, x } 
    })
  }

  handleYPosition = e => {
    const y = parseFloat(e.target.value)
    this.setState({  
      position: { ...this.state.position, y } 
    })
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

  onStartAtChanged = (date) => {
    this.setState({
      start_at: date
    })
  }

  onEndAtChanged = (date) => {
    this.setState({
      end_at: date
    })
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  uploadFile = (event) => {
    ReactDOM.findDOMNode(this.refs.myInput).click();
  }

  showMap = () =>{
    this.setState({
      showMap:true
    });
  }

  addLocation = (coordinate) => {
    this.setState({
      coordinate:{
        lat:coordinate.lat,
        lng:coordinate.lng
      }
    });
  }

  render() {
    let {
      title,
      cover_url,
      start_at,
      end_at,
      coordinate,
      showMap
    } = this.state
        
    return (
      <div className="addForm">
        <Form>
          <Form.Field>
            <label>Гарчиг</label>
            <input 
            type='text'
            value={title}
            onChange={this.onTitleChanged}
            placeholder='Гарчиг' />
          </Form.Field>
          <Divider />

          <Form.Group widths='equal'>
            <label className='self' >Эхлэх хугацаа</label>
            <DatePicker 
              selected={start_at}
              onChange={this.onStartAtChanged}
              dateFormat="LL" />
            <label className='marginLef'>Дуусах хугацаа</label>
            <DatePicker 
              selected={end_at}
              onChange={this.onEndAtChanged}
              dateFormat="LL" />
          </Form.Group>
          <Divider />

          <Form.Field>
            <center>
              <Button onClick={this.showMap} >Байршил өөрчлөх</Button> 
              {!!this.state.showMap && (
                 <GMap 
                  showMap={showMap}
                  coordinate={coordinate}
                  addLocation={this.addLocation}
                />
              )}
            </center>
          </Form.Field>
          <Divider />

          <Form.Group widths='equal'>
            <Form.Field>
              <Dropzone
                onDrop={this.handleDrop}
                disableClick
                multiple={false}
                style={{ width: this.state.width, height: this.state.height, marginBottom:'35px' }} >
                <div>
                  <AvatarEditor
                    ref={this.setEditorRef}
                    scale={parseFloat(this.state.scale)}
                    width={this.state.width}
                    height={this.state.height}
                    position={this.state.position}
                    onPositionChange={this.handlePositionChange}
                    image={this.state.image}
                    className="editor-canvas"
                  />
                </div>
              </Dropzone>
            </Form.Field>

            <Form.Field>
              <Segment >
                <input name="newImage" type="file" id='file' ref = "myInput" className='displayNone' onChange={this.handleNewImage} />
                <Button onClick={this.uploadFile} basic color='blue' content='Зураг сонгох' />
                <br/>
                <br/>
                <label className='inputLabel'>Zoom: </label>
                <br/>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min={this.state.allowZoomOut ? '0.1' : '1'}
                  max="2"
                  step="0.01"
                  defaultValue="1"
                />

                <br/>
                <br/>
                <label className='inputLabel' >X Position: </label><br/>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleXPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.position.x}
                />

                <br/>
                <br/>
                <label className='inputLabel'> Y Position: </label>
                <br/>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleYPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.state.position.y}
                />

                <br/>
                <br/>
                
                <Button primary onClick={this.handleSave} content="Preview" />
                
                {!!this.state.preview && (
                  <img
                    className='previewImg'
                    src={this.state.preview.img}
                    style={{
                      borderRadius: `${(Math.min(
                        this.state.preview.height,
                        this.state.preview.width
                      ) +
                        10) *
                        (this.state.preview.borderRadius / 2 / 100)}px`,
                    }}
                  />
                )}
              </Segment>
            </Form.Field>
          </Form.Group>
          
          <Form.Field  className='cent'>
            <Button type='submit' primary className='center' onClick={this.editevent} content='Засах'/>
          </Form.Field>
            
        </Form>
      </div>
    )
  }

  editevent = () => {
    let {
      _id,
      title,
      coordinate,
      start_at,
      end_at,
      location
    } = this.state
    this.props.editEvent({
      _id,
      title,
      coordinate,
      start_at,
      end_at,
      location
    })
  }
}