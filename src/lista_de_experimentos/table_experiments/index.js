import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TablaExperimento extends Component {
  constructor(props){
    super(props);
    this.state = {};
    var url  = ['/',this.props.userAuthenticated,'/experiments'].join("");
    var axios = require("axios");
    axios.get(url)
    .then((data)=>{
      console.log(data);
      console.log(data.data.datas);
      var d = data.data;
      this.setState({products: d.datas, error:d.error, msg: d.msg, authError:d.authError});

      if(d.authError)
      {
        this.props.setMessage("usuario no autenticado");
        this.props.logout();
      }


    })
    .catch((err)=>{
      console.log(err);
      this.props.setMessage("hubo un problema en el servidor");
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
