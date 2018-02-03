import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class GeneralSettings extends Component {
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
    this.props.saveAction(this.state);
  }

  render() {
    const res = <form id="acquire">
    <h2> General Settings </h2>
    <label for="a_name">Name</label>
    <input type="text" class="form-control" id="a_name" placeholder="Name" onChange={this.saveInput}/>
    <label for="a_description" required>Description</label>
    <textarea class="form-control" id="a_description" placeholder="Description" onChange={this.saveInput}/>
    <label for="a_times">Times</label>
    <input type="text" class="form-control" id="a_times" placeholder="Times" onChange={this.saveInput}/>
    <label for="a_bloq">Blocks</label>
    <input type="text" class="form-control" id="a_bloq" placeholder="Blocks" onChange={this.saveInput}/>
    <label for="a_time">Time</label>
    <input type="text" class="form-control" id="a_time" placeholder="Time" onChange={this.saveInput}/>
    <label for="a_freq">Frequency</label>
    <input type="text" class="form-control" id="a_freq" placeholder="Freq" onChange={this.saveInput}/>
    <label for="a_lsb">LSB</label>
    <input type="text" class="form-control" id="a_lsb" placeholder="LSB 8-bit" onChange={this.saveInput}/>
    <label for="a_msb">MSB</label>
    <input type="text" class="form-control" id="a_msb" placeholder="MSB 8-bit" onChange={this.saveInput}/>
    </form>;
    return res;
  }

}

export default GeneralSettings
