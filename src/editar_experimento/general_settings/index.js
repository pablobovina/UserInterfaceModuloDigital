import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class GeneralSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.setupSettings;
  }

  componentWillReceiveProps(nextProps) {
    this.setState((nextProps.setupSettings));
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
      this.props.saveAction(this.state);
    });
  }

  render() {
    const res = <form id="acquire">
    <h2> General Settings </h2>
    <div class="row"><label for="a_name">Name</label></div>
    <div class="row"><input type="text" class="form-control" id="a_name" placeholder="Name" value={this.state.a_name} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_description" required>Description</label></div>
    <div class="row"><textarea class="form-control" id="a_description" placeholder="Description" value={this.state.a_description} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_times">Times</label></div>
    <div class="row"><input type="text" class="form-control" id="a_times" placeholder="Times" value={this.state.a_times} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_bloq">Blocks</label></div>
    <div class="row">
      <select className="custom-select" id="a_bloq" value={this.state.a_bloq} onChange={this.saveInput}>
        <option value="1">1K</option>
        <option value="2">2K</option>
        <option value="4">4K</option>
        <option value="8">8K</option>
        <option value="16">16K</option>
        <option value="32">32K</option>
        <option value="64">64K</option>
        <option value="128">128K</option>
      </select>
    </div>
    <div class="row"><label for="a_ts">TS</label></div>
    <div class="row"><input type="text" class="form-control" id="a_ts" placeholder="TS" value={this.state.a_ts} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_ts_unit">TS Unit</label></div>
    <div class="row">
      <select className="custom-select" id="a_ts_unit" value={this.state.a_ts_unit} onChange={this.saveInput}>
        <option value="ns">ns</option>
        <option value="us">us</option>
        <option value="ms">ms</option>
      </select>
    </div>
    <div class="row"><label for="a_freq">Frequency</label></div>
    <div class="row"><input type="text" class="form-control" id="a_freq" placeholder="Frequency" value={this.state.a_freq} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_freq_unit">Frequency Unit</label></div>
    <div class="row">
      <select className="custom-select" id="a_freq_unit" value={this.state.a_freq_unit} onChange={this.saveInput}>
        <option value="hz">Hz</option>
        <option value="mhz">Mhz</option>
      </select>
    </div>
    <div class="row"><label for="a_lsb">LSB</label></div>
    <div class="row"><input type="text" class="form-control" id="a_lsb" placeholder="LSB 8-bit" value={this.state.a_lsb} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_msb">MSB</label></div>
    <div class="row"><input type="text" class="form-control" id="a_msb" placeholder="MSB 8-bit" value={this.state.a_msb} onChange={this.saveInput}/></div>
    <div class="row"><label for="a_channel">CHANNEL</label></div>
    <div class="row"><input type="text" class="form-control" id="a_achannel" placeholder="3" value={this.state.a_channel} onChange={this.saveInput}/></div>
    </form>;
    return res;
  }

}

export default GeneralSettings
