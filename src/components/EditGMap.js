import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import { Button, Modal, Header, Icon, Image } from 'semantic-ui-react'
import './Gmap.css';

const CustomMarker = ({ text, }) => (<div className='klass' >{text}</div>)

export default class EditGMap extends React.Component {
  
	constructor(props) {
	  super(props);
	}

  render(){
  	let g = this.props.coordinate
  	console.log(g);
    return (
		  <Modal open={this.props.showmap}>
	      <Modal.Header>Байршил сонгох</Modal.Header>
	      <Modal.Content >
	        <Modal.Description>
	        	<div style={{ height: '100vh', width: '100%' }}>
		          <GoogleMap
		            bootstrapURLKeys={{ key:'AIzaSyAGitiN41FPl8mcC3zBN7yC9Av9y5CJxEc' }}
			        	center= { this.props.coordinate }
			        	zoom={8}
			        	onClick={(value) => this.props.onLocationChanged(value)}>
						    <CustomMarker
						      lat={ this.props.coordinate.lat }
							  	lng={ this.props.coordinate.lng }
						      text=" ">
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
    this.props.showMap()
  }

}