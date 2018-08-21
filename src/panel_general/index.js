import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './index.css';

class PanelGeneral extends Component {

  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  logout = () =>{
    this.props.logout();
  }

  render() {
    const error = this.state.mainState.error;
    const username = this.state.mainState.username;
    if(username == ""){
      const res =
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-brand text-nowrap"><img src={logo} className="App-logo" alt="logo"/> NMR-System Controller</div>
        </nav>
      return res;
    }

    var url_base = "/"+ username;
    const res =
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand text-nowrap"><img src={logo} className="App-logo" alt="logo"/> NMR-System Controller</div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <NavLink
            className = "nav-link"
            to={url_base+"/crear_experimento"}
            activeClassName="nav-link active"
            >Crear Experimento
          </NavLink>
          </li>
          <li className="nav-item">
          <NavLink
            className = "nav-link"
            to={url_base+"/lista_de_experimentos"}
            activeClassName="nav-link active"
            >Experimentos
          </NavLink>
          </li>
          <li className="nav-item dropdown">
            <button className="btn dropdown-toggle text-info bg-dark" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Reportes
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <NavLink
                className = "dropdown-item"
                to={url_base+"/resultado_de_experimentos"}
                activeClassName="nav-link active"
                >Resultados
              </NavLink>
              <NavLink
                className = "dropdown-item"
                to={url_base+"/vista_parcial"}
                activeClassName="nav-link active"
                >Vista Parcial
              </NavLink>
              <NavLink
                className = "dropdown-item"
                to={url_base+"/monitor_de_estado"}
                activeClassName="nav-link active"
                >Estado de Sistema
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
      <button type="button" className="btn btn-outline-info" onClick={this.logout}>Logout</button>
    </nav>;
    return res;
  }
}

export default PanelGeneral;
