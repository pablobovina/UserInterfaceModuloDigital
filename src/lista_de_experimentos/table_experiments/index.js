import React, { Component } from 'react';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TablaExperimento extends Component {

  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState};
    this.load_data();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  load_data = ()=>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;

    var url  = ['/','user/',username,'/experiments/'].join("");

    var axios = require("axios");
    axios({method: "GET",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({products: d.datas, error:d.error, msg: d.msg, authError:d.authError});
    })
    .catch((err)=>{
      this.props.setMessage(err);
      this.props.logout();
    });
  }

  onRowSelect = (row, isSelected, e) => {
    //let rowStr = '';
    this.setState({selectedItem: row.id})
    this.props.setSelectedItem(row.id);
    // for (const prop in row) {
    //   rowStr += prop + ': "' + row[prop] + '"';
    // }
    // alert(`is selected: ${isSelected}, ${rowStr}`);
  }

  onSelectAll = (isSelected) => {
    if (isSelected) {
      return this.refs.table.state.data.map(row => row.id);
    }
  }

  render() {

    const options = {
      sizePerPage: 10,
      hideSizePerPage: true
    };

    const selectRowProp = {
          mode: 'radio',
          bgColor: 'grey',
          onSelect: this.onRowSelect,
          onSelectAll: this.onSelectAll
        };

    const res = <div>
                <BootstrapTable  ref='table' version='4' data={this.state.products} selectRow={selectRowProp} pagination options={ options }>
                  <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true } filter={ { type: 'TextFilter'} }>Experiment ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='created' dataSort={ true } filter={ { type: 'TextFilter'} }>Created</TableHeaderColumn>
                  <TableHeaderColumn dataField='state' dataSort={ true } filter={ { type: 'TextFilter'} } >State</TableHeaderColumn>
                  <TableHeaderColumn dataField='author' dataSort={ true } filter={ { type: 'TextFilter'} }>Author</TableHeaderColumn>
                  <TableHeaderColumn dataField='resume' dataSort={ true } filter={ { type: 'TextFilter'} }>Resume</TableHeaderColumn>
                </BootstrapTable>
                </div>;
    return res;
  }
}

export default TablaExperimento;
