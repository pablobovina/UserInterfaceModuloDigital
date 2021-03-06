import React, { Component } from 'react';
import './index.css';
import ModalGeneric from './modal_generic.js';

class ExperimentView extends Component {
  constructor(props) {
    super(props);
    this.state = {"items": props.items};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"items":nextProps.items});
  }

  saveCheckPoint = (id,metadata) =>{
    this.props.saveItem(id, metadata);
  }

  deleteCheckPoint = (id) =>{
    this.props.deleteItem(id);
  }

  render() {
    const res = <ul>
        {this.state.items.map(item => (
          <ModalGeneric id={item.id} type={item.type} itemMeta={item} saveAction={this.saveCheckPoint} deleteAction={this.deleteCheckPoint}/>
        ))}
      </ul>;
    return res;
  }
}

export default ExperimentView;
