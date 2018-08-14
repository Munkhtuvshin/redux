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


export default class AddEventForm extends Component {

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
    let { title,  cover_url, start_at, end_at, coordinate, beeco_start_at, beeco_end_at } = this.props
    let event = { title, cover_url, start_at, end_at, coordinate, beeco_end_at, beeco_start_at };
    let counter = 0;
    var re = new RegExp('@|#');
   
    if(re.test(title) | title.length < 4) {
      document.getElementById('title').innerHTML=' Хэт богино эсвэл хориотой тэмдэгт орсон байна.';
      document.getElementById('title').style.color='red';
      counter++;
    }
    else{
      document.getElementById('title').innerHTML='';
    }
    if( moment(start_at).format('LLL')==moment(end_at).format('LLL') ) {
      document.getElementById('endAt').innerHTML = ' Эхлэх хугацаа Дуусах хугацаа хоёр давхцсан байна'
      document.getElementById('endAt').style.color = 'red'
      counter++;
    }
    else{
      document.getElementById('endAt').innerHTML = ''
    }
    if( cover_url == ''){
      document.getElementById('coverUrl').innerHTML = ' Зураг оруулна уу'
      document.getElementById('coverUrl').style.color = 'red'
      counter++;
    }
    else{
      document.getElementById('coverUrl').innerHTML = ''
    }
    if( coordinate.lat==47.78963221880257 & coordinate.lng==107.38140106201172 ) {
      document.getElementById('location').innerHTML = ' Байршил оруулна уу'
      document.getElementById('location').style.color = 'red'
      counter++;
    }
    else{
      document.getElementById('location').innerHTML = ''
    }
    if(counter==0) {
      this.props.addEvent(event);
      document.getElementById('addConfirm').click()
    }
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

  uploadFile = (event) => {
    ReactDOM.findDOMNode(this.refs.myInput).click();
  }

  changeField = (field, value) =>{
    // switch(field) {
    //   case 'title': {
    //     let re = new RegExp('@|#');
    //     if(!re.test(value) & value.length < 4 ){
    //       document.getElementById('title').innerHTML='хэт богино гарчиг';
    //       document.getElementById('title').style.color='red';
    //     }
    //     else{
    //       document.getElementById('title').innerHTML='';
    //     }
    //     this.props.changeField(field, value)
    //     return
    //   }
    //   case 'start_at': {
    //     if( moment(this.props.start_at).format('LLL') <= moment(this.props.end_at).format('LLL') ) {
    //       this.props.changeField('end_at', moment(value) )
    //     }
    //     this.props.changeField(field, value)
    //     return
    //   }
    //   default: return this.props.changeField(field, value)
    // }

    this.props.changeField(field, value)

  }

  render() {   
    return (
      <div className="addForm">
        <Form method="post" encType="multipart/form-data" className='addform' >
          <Form.Field>
            <label>Гарчиг</label>
            <input 
            ref = "title1"
            id = "tit"
            type='text'
            className='ad'
            value={this.props.title}
            onChange={ ( event ) => this.changeField( 'title', event.target.value ) }
            placeholder='Гарчиг'
            />
            <span id='title' className='titlespan' ></span>
          </Form.Field>

          <Divider />

          <Form.Group widths='equal'>
            <div className='fullwidth'>
              <label className='self' htmlFor="start_at" >Эхлэх хугацаа
                <DatePicker
                  readOnly={true}
                  id = "start_at"
                  selected={this.props.start_at}
                  onChange={ ( date ) => this.changeField( 'start_at', date) }
                  dateFormat="LL"
                  />
              </label>  
              <label className='marginLef'>Дуусах хугацаа
                <DatePicker 
                  readOnly= {true}
                  id = "end_at"
                  selected={this.props.end_at}
                  onChange={ ( date ) => this.changeField( 'end_at', date ) }
                  dateFormat="LL"
                  />
              </label>
              <span id='endAt' className='endAt' ></span>
            </div>

            <div className='fullwidth' >  
              <label className='self' htmlFor="start_at" >Beeco дээр тавих хугацаа
                <DatePicker
                  readOnly={true}
                  id = "start_at"
                  selected={this.props.beeco_start_at}
                  onChange={ ( date ) => this.changeField( 'beeco_start_at', date) }
                  dateFormat="LL"
                   />
              </label>  
              <label className='marginLef'>Beeco дээрээс устах хугацаа
                <DatePicker 
                  readOnly= {true}
                  id = "end_at"
                  selected={this.props.beeco_end_at}
                  onChange={ ( date ) => this.changeField( 'beeco_end_at', date ) }
                  dateFormat="LL"
                     />
              </label>
              <span id='endAt' className='endAt' ></span>
            </div>

          </Form.Group>

          <Divider />

          <Form.Field>
            <Button onClick={ this.props.showMap } >Байршил сонгох</Button> 
            <span className='marleft' >{ this.props.coordinate.addressName }</span> 
            <span id='location' className='locationspan' ></span>
            {!!this.props.showmap && (
               <GMap 
                showmap={this.props.showmap}
                showMap={this.props.showMap}
                onClose={this.props.showMap}
                coordinate={this.props.coordinate}
                addLocation={this.addLocation}
                onLocationChanged = {this.props.onLocationChanged}
              />
            )}
            
          </Form.Field>
          <Divider />

          <Form.Group widths='equal'>
            
              <Form.Field>
              <Segment >
                <input name="newImage" type="file" id='file' ref = "myInput" accept=".gif, .jpg, .png" className='displayNone' 
                  onChange={ ( e ) => this.changeField( 'cover_url', e.target.files[0] ) } />
                <Button onClick={this.uploadFile} basic color='blue' content='Зураг сонгох' />
                <span id='coverUrl' className='fnt'></span>
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
            <Form.Field >
              <Button type='submit' primary className='center' onClick={this.addevent} content='Нэмэх'/>
              <Link to='/eventlist' id='addConfirm' ></Link>
          </Form.Field>

        </Form>
      </div>
    )
  }
}

