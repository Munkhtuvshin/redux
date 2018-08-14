import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import { Button, Modal, Header, Icon, Image } from 'semantic-ui-react'
import './Gmap.css';

const CustomMarker = ({ text, }) => (<div className='klass' >{text}</div>)

export default class EditGMap extends React.Component {
  
	constructor(props) {
	  super(props);
	  this.state=this.props.coordinate
	}

	changeMarker = (value) => {
  	this.setState({ lat:value.lat, lng:value.lng})
  }

  render(){
  	let g = this.props.coordinate
  	console.log(g);
    return (
		  <Modal open={this.props.showmap} onClose={ this.props.showMap } >
	      <Modal.Header>Байршил сонгох</Modal.Header>
	      <Modal.Content >
	        <Modal.Description>
	        	<div style={{ height: '100vh', width: '100%' }}>
		          <GoogleMap
		            bootstrapURLKeys={{ key:'AIzaSyAGitiN41FPl8mcC3zBN7yC9Av9y5CJxEc' }}
			        	center= { this.props.coordinate }
			        	zoom={8}
			        	onClick={ (value) => this.shangeMaeker(value) }>
						    <CustomMarker
						      lat={ this.state.lat }
							  	lng={ this.state.lng }
						      text=" ">
					      </CustomMarker>
			      	</GoogleMap>
		    		</div>
	        </Modal.Description>
	      </Modal.Content>

	      <Modal.Actions>
	        <Button primary onClick={this.addLocation}>
	          Өөрчлөх <Icon name='right chevron' />
	        </Button>
	      </Modal.Actions>
	    </Modal>
		)
  }

  addLocation = () =>{
    this.props.onLocationChanged(this.state)
  }

}