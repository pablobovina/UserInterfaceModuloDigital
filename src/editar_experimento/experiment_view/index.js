import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './index.css';
import ModalGeneric from './modal_generic.js';

class ExperimentView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveCheckPoint = (id,metadata) =>{
    this.props.saveItem(id, metadata);
  }

  deleteCheckPoint = (id) =>{
    this.props.deleteItem(id);
  }

  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <ul>
        {this.props.items.map(item => (
          <ModalGeneric id={item.id} type={item.type} itemMeta={item} saveAction={this.saveCheckPoint} deleteAction={this.deleteCheckPoint}/>
        ))}
      </ul>;
    return res;
  }
}

export default ExperimentView;
