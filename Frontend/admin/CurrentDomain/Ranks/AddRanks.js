// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter){
    let search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(parameter);
  }
  // url-urile de baza
  var basePostURL="http://localhost:8085/achievement/domain/";
  // id-ul domeniului
  let website_id = getParamFromUrl("domain");
  let postURL = basePostURL+website_id;
  
  $(function(){
      $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html"); 
    });
  
  /*sidebar included*/
  
  
  // get all href's from the sidebar and add the id to the name
  var collection = document.getElementsByClassName("id_param");
  for (let i = 0; i < collection.length; i++) {
    let base = collection[i].href.slice(0,collection[i].href.lastIndexOf("/?") + 1);;
    let id = getParamFromUrl("domain");
    collection[i].href = base+"?domain="+id;
  }
  
  
 

  async function getFromApi(url, requestOptions){
    try{
     let x = await fetch(url, requestOptions).then(response => response.json());
     return x;
    }
    catch(error){
      console.error("Could not fetch from API!");
    }
    
  }
  
  // functions
  function cancel(){
    window.location.href = "/admin/CurrentDomain/Achievements/index.html/?domain="+getParamFromUrl("domain");
  }
  
  document.getElementById("add_achievement_form").addEventListener("submit",(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // get the form data
    var response = {};
    data.forEach(function(v,key){
        response[key]=v;
    });
    // get the <ul> entries and put them in an array
    var json = JSON.stringify(response);
    // sending data to the server
     // info needed for requests
     var requestOptions = {
        method: 'POST',
        body : json,
        redirect: 'follow'
    };

      fetch(postURL, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    window.location.href = "/admin/CurrentDomain/Achievements/index.html/?domain="+getParamFromUrl("domain");
  });