import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './index.css';

class ModalGeneric extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveInput = (e) =>{
    const id =  e.target.getAttribute("id");
    const v = e.target.value;
    this.setState((prevState)=>{
      var r = {};
      r[id] = v;
      return r;
    });
  }

  onSaveClick = (e) => {
    this.props.saveAction(this.props.id, this.state);
  }

  onDeleteClick = (e) => {
    this.props.deleteAction(this.props.id);
  }

  render () {
    const res =
    <div>
    <button type="button" class="btn btn-primary rounded-circle item_circle" data-toggle="modal" data-target={"#"+this.props.id}>
      <div class="item_loop">{this.state.loop}</div>
      <div class="item_type">{this.state.type}</div>
      <div class="item_time">{this.state.time}</div>
      <div class="item_freq">{this.state.freq}</div>
      <div class="item_msb">{this.state.msb}</div>
      <div class="item_lsb">{this.state.lsb}</div>
    </button>
    <div class="modal fade" id={this.props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <label for="loop">Loop</label>
                <input class="form-control" id="loop" placeholder="Loop" onChange={this.saveInput}/>
              </div>
              <div class="col">
                <label for="type">Type</label>
                <input class="form-control" id="type" placeholder="Type" onChange={this.saveInput}/>
              </div>
            </div>

            <div class="row">
              <div class="col">
              <label for="time">Time</label>
              <input class="form-control" id="time" placeholder="Time" onChange={this.saveInput}/>
              </div>
              <div class="col">
              <label for="freq">Frequency</label>
              <input class="form-control" id="freq" placeholder="Frequency" onChange={this.saveInput}/>
              </div>
              <div class="col">
              <label for="phase">Phase List</label>
              <input class="form-control" id="phase" placeholder="Phase List" onChange={this.saveInput}/>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="lsb">Pattern 8-bit LSB</label>
                <input class="form-control" id="lsb" placeholder="Pattern 8-bit LSB" onChange={this.saveInput}/>
              </div>
              <div class="col">
                <label for="msb">Pattern 8-bit MSB</label>
                <input class="form-control" id="msb" placeholder="Pattern 8-bit MSB" onChange={this.saveInput}/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" onClick={this.onSaveClick}>Save changes</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.onDeleteClick}>Delete</button>
          </div>
        </div>
      </div>
    </div>
    </div>;

    return res;

  }
}

export default ModalGeneric;
