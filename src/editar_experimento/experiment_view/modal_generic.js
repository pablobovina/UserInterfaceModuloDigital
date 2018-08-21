import React, { Component } from 'react';
import './index.css';

class ModalGeneric extends Component {
  constructor(props) {
    super(props);
    this.state = props.itemMeta;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.itemMeta);
  }

  saveInput = (e) =>{
    const id =  e.target.getAttribute("id");
    const v = e.target.value;
    console.log(v);
    console.log(id);
    this.setState((prevState)=>{
      var r = {};
      r[id] = v;
      return r;
    }, () => {
      this.props.saveAction(this.props.id, this.state);
  });
  }

  onSaveClick = (e) => {
    this.props.saveAction(this.props.id, this.state);
  }

  onDeleteClick = (e) => {
    this.props.deleteAction(this.props.id);
  }

  getClass = (itemType) =>{
    var r = "btn btn-primary rounded-circle item_circle"
    if(itemType == "C"){r="btn btn-primary rounded-circle item_circle"}
    if(itemType == "L"){r="btn btn-success rounded-circle item_circle"}
    if(itemType == "R"){r="btn btn-danger rounded-circle item_circle"}
    return r;
  }

  showData = (itemType, itemData) =>{
    var r = "-";
    if(itemType == "L"){r=itemData}
    return r;
  }

  render () {
    const res =
    <div>
    <button type="button" class={this.getClass(this.state.type)} data-toggle="modal" data-target={"#"+this.props.id}>
      <div class="item_loop">{this.showData(this.state.type, this.state.data)}</div>
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
              <div class="row"><label for="type">Type</label></div>
              <div class="row">
                <select className="custom-select" id="type" value={this.state.type} onChange={this.saveInput}>
                  <option value="C">Continue</option>
                  <option value="L">Loop</option>
                  <option value="R">RetLoop</option>
                </select>
              </div>
              </div>
              <div class="col">
              <div class="row"><label for="data">Data</label></div>
              <div class="row"><input class="form-control" id="data" placeholder="Data" value={this.state.data} onChange={this.saveInput}/></div>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <div class="row"><label for="time">Time</label></div>
              <div class="row"><input class="form-control" id="time" placeholder="Time" value={this.state.time} onChange={this.saveInput}/></div>
              <div class="row"><label for="t_unit">Time Unit</label></div>
              <div class="row">
                <select className="custom-select" id="t_unit" value={this.state.t_unit} onChange={this.saveInput}>
                  <option value="ns">ns</option>
                  <option value="us">us</option>
                  <option value="ms">ms</option>
                </select>
              </div>
              </div>
              <div class="col">
              <div class="row"><label for="freq">Frequency</label></div>
              <div class="row"><input class="form-control" id="freq" placeholder="Frequency" value={this.state.freq} onChange={this.saveInput}/></div>
              <div class="row"><label for="freq_unit">Frequency Unit</label></div>
              <div class="row">
                <select className="custom-select" id="freq_unit" value={this.state.freq_unit} onChange={this.saveInput}>
                  <option value="hz">Hz</option>
                  <option value="mhz">Mhz</option>
                </select>
              </div>
              </div>
              <div class="col">
              <div class="row"><label for="phase">Phase List</label></div>
              <div class="row"><input class="form-control" id="phase" placeholder="Phase List" value={this.state.phase} onChange={this.saveInput}/></div>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <div class="row"><label for="lsb">Pattern 8-bit LSB</label></div>
              <div class="row"><input class="form-control" id="lsb" placeholder="Pattern 8-bit LSB" value={this.state.lsb} onChange={this.saveInput}/></div>
              </div>
              <div class="col">
              <div class="row"><label for="msb">Pattern 8-bit MSB</label></div>
              <div class="row"><input class="form-control" id="msb" placeholder="Pattern 8-bit MSB" value={this.state.msb} onChange={this.saveInput}/></div>
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
