import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react'

export default class User extends Component {

  constructor(props) {
    super(props);
    
  }
render(){
	return(
		
		<Table.Row >
          <Table.Cell>{this.props.id}</Table.Cell>
          <Table.Cell>{this.props.name}</Table.Cell>
          <Table.Cell>{this.props.password}</Table.Cell>
          <Table.Cell>{ this.props.profession}</Table.Cell>
        </Table.Row>
		  
		
		)
	}
}