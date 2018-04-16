import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CrearExperimento from './crear_experimento/index.js';
import EditarExperimento from './editar_experimento/index.js';
import ListaExperimento from './lista_de_experimentos/index.js';
import MonitorEstado from './monitor_de_estado/index.js';
import ProcesamientoDato from './procesamiento_de_datos/index.js';
import ResultadoExperimento from './resultado_de_experimentos/index.js';
import SesionInicio from './sesion_de_inicio/index.js';
import VistaParcial from './vista_parcial/index.js';
import VerExperimento from './ver_experimento/index.js';

class AuthExample extends Component {
  constructor(props) {
    super(props);
    var d = JSON.parse(sessionStorage.getItem("authData"));
    console.log("buscamos data del session storage")
    console.log(d);
    var usr = d!=null && d.userAuthenticated ? d.userAuthenticated : "";
    var isAuth = d!=null && d.isAuthenticated ? d.isAuthenticated : false;
    var msg = d!=null && d.message ? d.message : "";
    this.state = {isAuthenticated:isAuth, userAuthenticated:usr, message:msg};
  };


  //dado user y pass setea sesion y estado
  login = (username, password) => {
    console.log("logueamos usuarios");
    this.setState({isAuthenticated:true, userAuthenticated:"pbovina", message:""});
    var d = {isAuthenticated:true, userAuthenticated:"pbovina", message:""};
    sessionStorage.setItem("authData",JSON.stringify(d));
  }

  //dado user y certificado borra sesion y estado
  logout = (username, token) =>{
    console.log("deslogueamos usuarios");
    this.setState({isAuthenticated:false, userAuthenticated:""});
    var d = {isAuthenticated:false, userAuthenticated:""};
    sessionStorage.setItem("authData",JSON.stringify(d));
  }

  setMessage = (msg) =>{
    var d = JSON.parse(sessionStorage.getItem("authData"));
    if(d) d.message = msg;
    sessionStorage.setItem("authData",JSON.stringify(d));
    this.setState({message:msg});
  }

  render () {
    const res = <Router>
              <div>
              <Route exact path="/" render = {()=>(<SesionInicio login={this.login} message={this.state.message} isAuthenticated={this.state.isAuthenticated} userAuthenticated={this.state.userAuthenticated}/>)}/>
              <Route path="/:userName/crear_experimento" render = {(props)=>(<CrearExperimento {...props} logout={this.logout} message={this.state.message} isAuthenticated={this.state.isAuthenticated} userAuthenticated={this.state.userAuthenticated}/>)}/>
              <Route path="/:userName/editar_experimento/:idExp" render={(props)=>(<EditarExperimento {...props} logout={this.logout} message={this.state.message} isAuthenticated={this.state.isAuthenticated} userAuthenticated={this.state.userAuthenticated}/>)}/>
              <Route path="/:userName/ver_experimento/:idExp" render={()=>(<VerExperimento logout={this.logout}/>)}/>
              <Route path="/:userName/lista_de_experimentos" render={()=>(<ListaExperimento logout={this.logout} setMessage={this.setMessage} isAuthenticated={this.state.isAuthenticated} userAuthenticated={this.state.userAuthenticated}/>)}/>
              <Route path="/:userName/monitor_de_estado" render={()=>(<MonitorEstado logout={this.logout}/>)}/>
              <Route path="/:userName/procesamiento_de_datos/:idExp" render={()=>(<ProcesamientoDato logout={this.logout}/>)}/>
              <Route path="/:userName/resultado_de_experimentos" render={()=>(<ResultadoExperimento logout={this.logout}/>)}/>
              <Route path="/:userName/vista_parcial/:idExp" render={()=>(<VistaParcial logout={this.logout} isAuthenticated={this.state.isAuthenticated} userAuthenticated={this.state.userAuthenticated}/>)}/>
              </div>
            </Router>;
    return res;
  }

}
ReactDOM.render( <AuthExample/> , document.getElementById('root'));
registerServiceWorker();
