import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class GeneralSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const res = <form id="acquire">
    <h2> General Settings </h2>
    <label for="a_times">Times</label>
    <input type="text" class="form-control" id="a_times" placeholder="Times"/>
    <label for="a_bloq">Blocks</label>
    <input type="text" class="form-control" id="a_bloq" placeholder="Blocks"/>
    <label for="a_time">Time</label>
    <input type="text" class="form-control" id="a_time" placeholder="Time"/>
    <label for="a_freq">Frequency</label>
    <input type="text" class="form-control" id="a_freq" placeholder="Freq"/>
    <label for="a_lsb">LSB</label>
    <input type="text" class="form-control" id="a_lsb" placeholder="LSB 8-bit"/>
    <label for="a_msb">MSB</label>
    <input type="text" class="form-control" id="a_msb" placeholder="MSB 8-bit"/>
    </form>;
    return res;
  }

}

export default GeneralSettings
