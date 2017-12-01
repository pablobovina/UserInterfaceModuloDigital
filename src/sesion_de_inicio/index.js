import React, { Component } from 'react';
import PanelGeneral from '../panel_general/index.js';
import {Redirect} from 'react-router-dom'

class SesionInicio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props);
  }

  setUsername = (e) =>{
    e.preventDefault();
    //console.log(e.target.value);
    this.setState({username: e.target.value});
  }

  setPassword = (e) => {
    e.preventDefault();
    //console.log(e.target.value);
    this.setState({password: e.target.value});
  }

  login = () =>{
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    const msg = this.props.message;
    const res =
    <div className=".container-fluid">
    <PanelGeneral isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated}/>
      <div className="row justify-content-center align-items-center">
        <div className="col-3 align-self-center" style={{margin:"50px"}}>
          <div>
            { msg ? ( <div class="alert alert-warning" role="alert"> {msg} </div>):(<div></div>)}
            <div className="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" onChange={this.setUsername}/>
              <small id="emailHelp" className="form-text text-muted">Well never share your username with anyone else.</small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.setPassword}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
          </div>
        </div>
      </div>
    </div>;

    console.log(this.props.isAuthenticated);
    if(this.props.isAuthenticated){
      console.log("usuario autenticado, redireccionamos");
      console.log(this.props.isAuthenticated);
      var url  = [this.props.userAuthenticated,'/lista_de_experimentos'].join("");
      return (<Redirect to={url}/>)

    }
    console.log("usuario no autenticado, mostramos formulario");
    return res;
  }
}

export default SesionInicio;
