import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
import { Redirect  } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Preview from './Preview.jsx'
import AvatarEditor from 'react-avatar-editor'
import { Button, Checkbox, Form, Divider, Segment, Modal, Header, Icon, Image } from 'semantic-ui-react'
import './addEventForm.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import GMap from './GMap.jsx'
import qs from 'qs';
const concat = require("concat-stream")
var FormData = require('form-data');
var targetFile =null;

export default class AddEventForm extends React.Component {

  componentWillUpdate(){

  }
  constructor(props) {
    super(props);
  }

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()
    this.props.setPreview(
      {
        img,
        rect,
        scale: this.props.scale,
        width: this.props.width,
        height: this.props.height,
        borderRadius: this.props.borderRadius,
      },
    )
  }

  addevent = () => {
    let { title,  cover_url, start_at, end_at, coordinate } = this.props
    let event = { title, cover_url, start_at, end_at, coordinate };
    this.props.addEvent(event);
  }

  handleScale = e => {
    this.props.handleScale(e)
  }

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ 
      allowZoomOut 
    })
  }

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value)
    this.setState({
      borderRadius 
    })
  }

  handlePositionChange = position => {
    this.props.handlePositionChange(position)
  }

  handleXPosition = e => {
    this.props.handleXPosition(e)
  }

  handleYPosition = e => {
    this.props.handleYPosition(e)
  }

  handleWidth = e => {
    const width = parseInt(e.target.value)
    this.setState({
      width 
    })
  }

  handleHeight = e => {
    const height = parseInt(e.target.value)
    this.setState({
      height 
    })
  }

  logCallback(e) {
    console.log('callback', e)
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handleDrop = acceptedFiles => {
    this.setState({ 
      image: acceptedFiles[0] 
    })
  }

  onChanged (event) {
    switch(event.target.id) {
      case "tit": {
        this.props.onChanged(1, event.target.value)
      }
    }
  }

  uploadFile = (event) => {
    ReactDOM.findDOMNode(this.refs.myInput).click();
  }

  render() {
    // console.log('add event form');    
    return (
      <div className="addForm">
        <Form method="post" encType="multipart/form-data">
          <Form.Field>
            <label>Гарчиг</label>
            <input 
            ref = "title1"
            id = "tit"
            type='text'
            value={this.props.title}
            onChange={ ( event ) => this.onChanged( event ) }
            placeholder='Гарчиг' />
          </Form.Field>

          <Divider />

          <Form.Group widths='equal'>
            <label className='self' htmlFor="start_at" >Эхлэх хугацаа</label>
            <DatePicker
              readOnly={true}
              id = "start_at"
              selected={this.props.start_at}
              onChange={ (date) => this.props.onStartAtChanged(date) }
              dateFormat="LL" />
            <label className='marginLef'>Дуусах хугацаа</label>
            <DatePicker 
              readOnly= {true}
              id = "end_at"
              selected={this.props.end_at}
              onChange={ (date) => this.props.onEndAtChanged(date) }
              dateFormat="LL" />
          </Form.Group>
          <Divider />

          <Form.Field>
            <center>
              <Button onClick={this.props.showMap} >Байршил сонгох</Button> 
              {!!this.props.showmap && (
                 <GMap 
                  showmap={this.props.showmap}
                  showMap={this.props.showMap}
                  coordinate={this.props.coordinate}
                  addLocation={this.addLocation}
                  onLocationChanged = {this.props.onLocationChanged}
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
                style={{ width: this.props.width, height: this.props.height, marginBottom:'35px' }} >
                <div>
                  <AvatarEditor
                    ref={this.setEditorRef}
                    scale={parseFloat(this.props.scale)}
                    width={this.props.width}
                    height={this.props.height}
                    position={this.props.position}
                    onPositionChange={this.handlePositionChange}
                    borderRadius={this.props.width / (100 / this.props.borderRadius)}
                    onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                    onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                    onImageReady={this.logCallback.bind(this, 'onImageReady')}
                    image={this.props.cover_url}
                    className="editor-canvas"
                  />
                </div>
              </Dropzone>
            </Form.Field>

              <Form.Field>
              <Segment >
                <input name="newImage" type="file" id='file' ref = "myInput" className='displayNone' onChange={(event) => this.props.onCoverChanged(event.target.files[0]) } />
                <Button onClick={this.uploadFile} basic color='blue' content='Зураг сонгох' />
                <br/>
                <br/>
                <label className='inputLabel'>Zoom: </label>
                <br/>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min={this.props.allowZoomOut ? '0.1' : '1'}
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
                  onChange={this.props.handleXPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.props.position.x}
                />

                <br/>
                <br/>
                <label className='inputLabel'> Y Position: </label>
                <br/>

                <input
                  name="scale"
                  type="range"
                  onChange={this.props.handleYPosition}
                  min="0"
                  max="1"
                  step="0.01"
                  value={this.props.position.y}
                />

                <br/>
                <br/>
                
                <Button primary onClick={this.handleSave} content="Preview" />
                
                {!!this.props.preview && (
                  <img
                    className='previewImg'
                    src={this.props.preview.img}
                    style={{
                      borderRadius: `${(Math.min(
                        this.props.preview.height,
                        this.props.preview.width
                      ) +
                        10) *
                        (this.props.preview.borderRadius / 2 / 100)}px`,
                    }}
                  />
                )}
              </Segment>
            </Form.Field>

          </Form.Group>
            <Form.Field  className='cent'>
              <Link to="/eventlist"> <Button type='submit' primary className='center' onClick={this.addevent} content='Нэмэх'/> </Link>
          </Form.Field>

        </Form>
      </div>
    )
  }
}

