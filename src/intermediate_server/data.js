function getFromServer(url,operation){

  const myFirstPromise = new Promise((resolve, reject) => {
    var headers = new Headers({'Content-Type': 'application/json'});
    var request = new Request(url, {headers: headers});
    //var pload = JSON.stringify(payload);
    fetch(request, {method: operation})
    .then(function(response){
      if(!response.ok){
        return (response.text().then((data)=>{resolve(JSON.parse(data))}).catch((err)=>{reject(err.toString())}));
      }
      return (response.text().then((data)=>{resolve(JSON.parse(data))}).catch((err)=>{reject(err.toString())}));
    })
    .catch(function(err){
      reject(err.toString());
    });
  });

  return myFirstPromise;
}

function postToServer(url,operation, payload){

  const myFirstPromise = new Promise((resolve, reject) => {
    var headers = new Headers({'Content-Type': 'application/json'});
    var request = new Request(url, {headers: headers});
    var pload = JSON.stringify(payload);
    fetch(request, {method: operation, body:pload})
    .then(function(response){
      return response.text();
    })
    .then(function(data){
      //console.log(data);
      let d = JSON.parse(data)
      console.log("apiCall");
      resolve(d);
    })
    .catch(function(err){
          console.log(err.toString());
          reject(err.toString());
    });

  });

  return myFirstPromise;
}

export {getFromServer, postToServer};
