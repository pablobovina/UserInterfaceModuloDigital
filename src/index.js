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
import VerResultado from "./ver_resultado";


class AuthExample extends Component {

  constructor(props) {
    super(props);
    var token = this.getCookie('csrftoken');
    var session = this.getCookie('sessionid');
    var newState = {"error":false, "message":"", "token":token, "session": session, "username":""};
    
    var storageState = sessionStorage.getItem("mainState");
    if(storageState){
      var storedState = JSON.parse(storageState)
      this.state = storedState;
      console.log("restauramos estado del session storage")
    }else{
      this.state = newState;
      console.log("estado por defecto");
    }
  };
  
  getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
  }

  login = (username, password) => {
    //username = "w";
    //password = "w1234567";
    var url  = ['/','login/',username].join("");
    var axios = require("axios");
    var token = this.state.token;
    axios({method: "POST",
            url: url,
            data: {user: username, pass: password},
            headers: {"X-CSRFToken": token}
        })
      .then(response => {
        var token = this.getCookie('csrftoken');
        var session = this.getCookie('sessionid');
        var newState = {
          "error":false, 
          "username": username,
          "token":token, 
          "session": session,
          "message":"",};
          sessionStorage.setItem("mainState", JSON.stringify(newState));
          this.setState(newState);

      })
      .catch(error =>{
        this.setMessage(error.response.data.error);
        console.log(error.response.data.error);
      });
  }

  //dado user y certificado borra sesion y estado
  logout = () =>{
    //post al server
    var url  = ['/','logout/', this.state.username,"/logout"].join("");
    var axios = require("axios");
    var token = this.state.token;
    var session = this.state.session;
    axios({method: "POST",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session}
        })
      .then(response => {
      })
      .catch(error => {
          this.setMessage(error.response.data.error);
          console.log(error.response.data.error);
      });
      var newState = {"error":false, "message":"", "token":"", "session": "", "username":""};
      this.setState(newState);
      sessionStorage.removeItem("mainState");
  }

  setMessage = (m) =>{
    var newState = this.state;
    newState.message = m;
    this.setState({"message":m});
    sessionStorage.setItem("mainState", JSON.stringify(newState));
    console.log("seteo de mensaje a " + m);
  }

  render () {
    const res = <Router>
              <div>
              <Route exact path="/" render = {(props)=>(
                <SesionInicio {...props} login={this.login} mainState={this.state}
                  setMessage={this.setMessage}/>)}/>

              <Route path="/:userName/crear_experimento" render = {(props)=>(
                <CrearExperimento {...props} mainState={this.state} logout={this.logout} 
                  setMessage={this.setMessage}/>)}/>
              
              <Route path="/:userName/editar_experimento/:idExp" render={(props)=>(
                <EditarExperimento {...props} logout={this.logout} mainState={this.state} 
                  setMessage={this.setMessage}/>)}/>
              
              <Route path="/:userName/ver_experimento/:idExp" render={(props)=>(
                <VerExperimento {...props} logout={this.logout} mainState={this.state}
                  setMessage={this.setMessage}/>)}/>
              
              <Route path="/:userName/lista_de_experimentos" render={(props)=>(
                <ListaExperimento {...props}  mainState={this.state} logout={this.logout} 
                  setMessage={this.setMessage}/>)}/>
              
              <Route path="/:userName/monitor_de_estado" render={()=>(
                <MonitorEstado logout={this.logout}/>)}/>
              
              <Route path="/:userName/procesamiento_de_datos/:idExp" render={()=>(
                <ProcesamientoDato logout={this.logout}/>)}/>
              
              <Route path="/:userName/resultado_de_experimentos" render={(props)=>(
                <ResultadoExperimento {...props}  mainState={this.state} logout={this.logout}
                  setMessage={this.setMessage}/>)}/>
              
              <Route path="/:userName/vista_parcial" render={(props)=>(
                <VistaParcial {...props} logout={this.logout} mainState={this.state} 
                  setMessage={this.setMessage}/>)}/>

              <Route path="/:userName/ver_resultado/:idExp" render={(props)=>(
                <VerResultado {...props} logout={this.logout} mainState={this.state}
                  setMessage={this.setMessage}/>)}/>
              </div>

            </Router>;
    return res;
  }

}
ReactDOM.render(<AuthExample/>, document.getElementById('root'));
registerServiceWorker();
