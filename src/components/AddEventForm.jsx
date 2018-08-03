import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, NavLink } from 'react-router-dom';
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

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cover_url: null,
      start_at: moment(),
      end_at: moment(),
      navigate:false,

      coordinate:{
        lat:47.78963221880257,
        lng:107.38140106201172,  
      },

      image: 'avatar.jpg',
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 300,
      height: 300,
      showMap:false,
    }
  }

  
  handleNewImage = e => {
    targetFile= e.target.files[0] ;
    this.setState({
      cover_url: ''
    })
    this.setState({
      image: e.target.files[0] 
    })
   // console.log(document.getElementById('file').files[0]);
    //console.log(e.target.files[0]);
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

  addevent = () => {
    let {
      title,
      cover_url,
      start_at,
      end_at,
      coordinate
    } = this.state
    var event = {
      title,
      cover_url,
      start_at,
      end_at,
      coordinate
    };
    //this.props.addEvent(event);
    // console.log('jhnkj');
    // console.log(targetFile);
    //  let dta = new FormData();

    // dta.append('action', 'ADD');
    // dta.append('param', 0);
    // dta.append('secondParam', 0);
    // dta.append('thirdParam', document.getElementById('file').files[0]);
    //const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    // dta.pipe(concat(data => {
    //   axios.post("localhost:8081/upload", data, {
    //     headers: dta.getHeaders()
    //   })
    // }))
    // return axios.post('http://localhost:8081/upload', {
    //             "UploadCommand": data
    //           }, config);

    // let request = new XMLHttpRequest();
    // request.open('POST', 'HTTP://localhost:8081/upload');
    // request.send(dta);

    var data = new FormData();
    //console.log(document.getElementById('file').files[0]);
    data.append('app','dsfsd');
    data.append('cover', targetFile);
    //console.log(data);
    axios({
    method: 'post',
    url: 'http://localhost:8081/upload',
    data: data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })

    //  var config = {
    //   onUploadProgress: function(progressEvent) {
    //     var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    //   }
    // };
    // axios.post('localhost:8081/upload', co_data, config)
    //   .then(function (res) {
    //     console.log('uploaded');
    //   })
    
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({
      scale 
    })
  }

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ 
      allowZoomOut 
    })
  }

  rotateLeft = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90,
    })
  }

  rotateRight = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90,
    })
  }

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value)
    this.setState({
      borderRadius 
    })
  }

  handleXPosition = e => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { 
      ...this.state.position, x } 
    })
  }

  handleYPosition = e => {
    const y = parseFloat(e.target.value)
    this.setState({  
      position: { ...this.state.position, y } 
    })
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

  handlePositionChange = position => {
    this.setState({  
      position  
    })
  }

  handleDrop = acceptedFiles => {
    this.setState({ 
      image: acceptedFiles[0] 
    })
  }

  onTitleChanged = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  onCoverChanged = (e) => {
    this.setState({ 
      cover_url: e.target.files[0] 
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
  
  showMap = () =>{
    this.setState({
      showMap:true
    });
  }

  uploadFile = (event) => {
    ReactDOM.findDOMNode(this.refs.myInput).click();
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
  var tr =false;
  let {
    title,
    cover_url,
    start_at,
    end_at,
    navigate,
    coordinate,
    showMap,
  } = this.state
  
  if (navigate) {
    return <Redirect to="/eventlist" push={true} />
  }

  return (
    <div className="addForm">
      <Form method="post" encType="multipart/form-data">
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
            readOnly={true}
            selected={start_at}
            onChange={this.onStartAtChanged}
            dateFormat="LL" />
          <label className='marginLef'>Дуусах хугацаа</label>
          <DatePicker 
            readOnly= {true}
            selected={end_at}
            onChange={this.onEndAtChanged}
            dateFormat="LL" />
        </Form.Group>
        <Divider />

        <Form.Field>
          <center>
            <Button onClick={this.showMap} >Байршил сонгох</Button> 
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
                  rotate={parseFloat(this.state.rotate)}
                  borderRadius={this.state.width / (100 / this.state.borderRadius)}
                  onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                  onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                  onImageReady={this.logCallback.bind(this, 'onImageReady')}
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
              <Button type='submit' primary className='center' onClick={this.addevent} content='Нэмэх'/>
          </Form.Field>

        </Form>
      </div>
      )
   }


   
}

