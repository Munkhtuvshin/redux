import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Redirect  } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Preview from './Preview.jsx'
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

      image: 'avatar.jpg',
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      height: 200,
  }
}

handleNewImage = e => {
    this.setState({cover_url: this.editor.getImageScaledToCanvas().toDataURL()})

    this.setState({ image: e.target.files[0] })
  }

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    //alert(img);
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

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut })
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
    this.setState({ borderRadius })
  }

  handleXPosition = e => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = e => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = e => {
    const width = parseInt(e.target.value)
    this.setState({ width })
  }

  handleHeight = e => {
    const height = parseInt(e.target.value)
    this.setState({ height })
  }

  logCallback(e) {
    // eslint-disable-next-line
    console.log('callback', e)
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] })
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

onCoverChanged = (e) => {
      
    this.setState({ cover_url: e.target.files[0] })
      
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

        <div>
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          multiple={false}
          style={{ width: this.state.width, height: this.state.height, marginBottom:'35px' }}
        >
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
        <br />
        New File:
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        {'Allow Scale < 1'}
        <input
          name="allowZoomOut"
          type="checkbox"
          onChange={this.handleAllowZoomOut}
          checked={this.state.allowZoomOut}
        />
        <br />
        Border radius:
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="50"
          step="1"
          defaultValue="0"
        />
        <br />
        Avatar Width:
        <input
          name="width"
          type="number"
          onChange={this.handleWidth}
          min="50"
          max="400"
          step="10"
          value={this.state.width}
        />
        <br />
        Avatar Height:
        <input
          name="height"
          type="number"
          onChange={this.handleHeight}
          min="50"
          max="400"
          step="10"
          value={this.state.height}
        />
        <br />
        X Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleXPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.x}
        />
        <br />
        Y Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleYPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.y}
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft}>Left</button>
        <button onClick={this.rotateRight}>Right</button>
        <br />
        <br />
        <input type="button" onClick={this.handleSave} value="Preview" />
        <br />
        {!!this.state.preview && (
          <img
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
        {!!this.state.preview && (
          <Preview
            width={
              this.state.preview.scale < 1
                ? this.state.preview.width
                : this.state.preview.height * 478 / 270
            }
            height={this.state.preview.height}
            image="avatar.jpg"
            rect={this.state.preview.rect}
          />
        )}
      </div>

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
    //this.setState({cover_url: this.state.preview.img})
      let {
        title,
        cover_url,
        start_at,
        end_at,
        location,
        image
      } = this.state

      this.props.addEvent({
            title,
            cover_url,
            start_at,
            end_at,
            location,
      })
      this.setState({ navigate: true })

   }
}