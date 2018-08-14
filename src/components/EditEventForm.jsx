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

export default class EditEventForm extends React.Component { 

  constructor(props) {
    super(props);
  }

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()
    this.props.edit_setPreview(
      {
        img,
        rect,
        scale: this.props.scale,
        width: this.props.width,
        height: this.props.height,
        borderRadius: this.props.borderRadius,
      }
    )
  }

  editevent = () => {
    let { _id, title,  cover_url, start_at, end_at, coordinate, beeco_start_at, beeco_end_at } = this.props
    let event = { _id, title, cover_url, start_at, end_at, coordinate, beeco_start_at, beeco_end_at };
    //console.log(event);
    this.props.editEvent(event);
  }

  handleScale = e => {
    this.props.edit_handleScale(e)
  }

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value)
    this.setState({
      borderRadius 
    })
  }

  handleXPosition = e => {
    this.props.edit_handleXPosition(e)
  }

  handleYPosition = e => {
    this.props.edit_handleYPosition(e)
  }

  logCallback(e) {
    //console.log('callback', e)
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    this.props.edit_handlePositionChange(position)
  }

  handleDrop = acceptedFiles => {
    // this.setState({ 
    //   image: acceptedFiles[0] 
    // })
  }

  onChanged (event) {
    switch(event.target.id) {
      case "tit": {
        this.props.editOnChanged(1, event.target.value)
      }
    }
  }

  uploadFile = (event) => {
    ReactDOM.findDOMNode(this.refs.myInput).click();
  }

  onStartAtChanged = (date) => {
    this.props.editOnStartAtChanged(date._d)
  }

  onEndAtChanged = (date) => {
    this.props.editOnEndAtChanged(date._d)
  }
  changeField = (field, value ) => {
    this.props.editchangeField(field, value)
  }

  render() {
    console.log(this.props)
    return (
      <div className="addForm">
        <Form method="post" encType="multipart/form-data" className='addform' >
          <Form.Field>
            <label>Гарчиг</label>
            <input 
            ref = "title1"
            id = "tit"
            type='text'
            value={this.props.title}
            onChange={ ( event ) => this.changeField( 'title', event.target.value ) }
            placeholder = 'Гарчиг' />
          </Form.Field>

          <Divider />

          <Form.Group widths = 'equal'>

             <div className='fullwidth'>
              <label className='self' htmlFor="start_at" >Эхлэх хугацаа
                <DatePicker
                  readOnly={true}
                  id = "start_at"
                  selected={moment(this.props.start_at)}
                  onChange={ ( date ) => this.changeField( 'start_at', date) }
                  dateFormat="LL"
                  minDate={moment()} />
              </label>  
              <label className='marginLef'>Дуусах хугацаа
                <DatePicker 
                  readOnly= {true}
                  id = "end_at"
                  selected={moment(this.props.end_at)}
                  onChange={ ( date ) => this.changeField( 'end_at', date ) }
                  dateFormat="LL"
                  minDate= {moment(this.props.start_at)} />
              </label>
              <span id='endAt' className='endAt' ></span>
            </div>

              <div className='fullwidth' >  
              <label className='self' htmlFor="start_at" >Beeco дээр тавих хугацаа
                <DatePicker
                  readOnly={true}
                  id = "start_at"
                  selected={moment(this.props.beeco_start_at)}
                  onChange={ ( date ) => this.changeField( 'beeco_start_at', date) }
                  dateFormat="LL"
                  minDate={moment()} />
              </label>  
              <label className='marginLef'>Beeco дээрээс устах хугацаа
                <DatePicker 
                  readOnly= {true}
                  id = "end_at"
                  selected={moment(this.props.beeco_end_at)}
                  onChange={ ( date ) => this.changeField( 'beeco_end_at', date ) }
                  dateFormat="LL"
                  minDate= {moment(this.props.beeco_start_at)} />
              </label>
              <span id='endAt' className='endAt' ></span>
            </div>

          </Form.Group>

          <Divider />

          <Form.Field>
            <center>
              <Button onClick={this.props.editShowMap} >Байршил сонгох</Button> 
              {!!this.props.showmap && (
                 <GMap 
                  showmap={this.props.showmap}
                  showMap={this.props.editShowMap}
                  coordinate={this.props.coordinate}
                  onLocationChanged = {this.props.editOnLocationChanged}
                />
              )}
            </center>
          </Form.Field>

          <Divider />

          <Form.Group widths='equal'>

              <Form.Field>
              <Segment >
                <input name="newImage" type="file" id='file' ref = "myInput" className='displayNone' onChange={(event) => this.props.editOnCoverChanged(event.target.files[0]) } />
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
                  onChange={this.handleXPosition}
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
                  onChange={this.handleYPosition}
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

          </Form.Group>
          <Form.Field  className='cent'>
            <Button type='submit' primary className='center' onClick={this.editevent} content='Засах'/>
          </Form.Field>

        </Form>
      </div>
    )
  }
}

