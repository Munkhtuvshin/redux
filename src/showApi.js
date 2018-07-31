import React, { Component } from 'react'
import axios from 'axios';
import User from './components/showUsers.js'
import { Button, Table } from 'semantic-ui-react'
import './showApi.css';

export default class ShowApi extends Component {

 //  axios.get('localhost:8081/listUsers')
 //    .then(function(result){ 
	//   console.log(result);
	// });
	constructor(props) {
	  super(props)

	  this.state = {
	    data: null,
	  }
	  this.trueData()
	  //console.log(this.state.data);
	}
	trueData = () => {
		axios.get('http://localhost:8081/listUsers')
	    .then((result) =>{ 
	      	this.setState({data:result.data})
		      //console.log(this.state.data)
		      //console.log(result.data);
		});		
	}
	render(){

		let{
			data,
		}= this.state
		let arraydata=[]
		for(var k in data) {
		  arraydata.push(data[k])
		}
		console.log(arraydata[0]);

	  return(
	  	<div className='showTable' >
		  <Table selectable>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>Id</Table.HeaderCell>
		        <Table.HeaderCell>Name</Table.HeaderCell>
		        <Table.HeaderCell>Password</Table.HeaderCell>
		        <Table.HeaderCell>Profession</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    <Table.Body>
		      {
		      	arraydata.map((data) => (
		      		  <User {...data}/>
		      		))
		      }
		    </Table.Body>
		  </Table>

	    </div>
	  )
	}
}
