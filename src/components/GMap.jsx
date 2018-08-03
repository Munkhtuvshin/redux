import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import { Button, Modal, Header, Icon, Image } from 'semantic-ui-react'
import './Gmap.css';

const CustomMarker = ({ text, }) => (<div className='klass' >{text}</div>)

export default class GMap extends React.Component {
  
constructor(props) {
  super(props);
  this.state = {
    coordinate:this.props.coordinate,
    showMap: this.props.showMap,
  }
}

  onMapClick = (event) => {
  	this.setState({
      coordinate: {
        lat: event.lat,
        lng: event.lng
      },
  	})
  }

  render(){
  	let {
      coordinate,
      showMap,
    } = this.state

    return (
		  <Modal open={showMap}>
	      <Modal.Header>Байршил сонгох</Modal.Header>
	      <Modal.Content >
	        <Modal.Description>
	        	<div style={{ height: '100vh', width: '100%' }}>
	          <GoogleMap
	            bootstrapURLKeys={{ key:'AIzaSyAGitiN41FPl8mcC3zBN7yC9Av9y5CJxEc' }}
		        center={coordinate}
		        zoom={8}
		        onClick={this.onMapClick}
		      >

			    <CustomMarker
			      lat={this.state.coordinate.lat}
				  lng={this.state.coordinate.lng}
			      text=" "
			    >
			    </CustomMarker>
		       
		      </GoogleMap>
		    </div>
	        </Modal.Description>
	      </Modal.Content>

	      <Modal.Actions>
	        <Button primary onClick={this.addLocation}>
	          Proceed <Icon name='right chevron' />
	        </Button>
	      </Modal.Actions>
	    </Modal>
		)
  }

  addLocation = (coordinate) =>{
    this.setState({showMap:false});
		this.props.addLocation(this.state.coordinate)
  }

}