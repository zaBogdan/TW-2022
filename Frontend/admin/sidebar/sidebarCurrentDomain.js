// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter){
    let search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(parameter);
  }
 
  // get all href's and add the id to the name
var hrefs = document.getElementsByClassName("id_param");
for (let i = 0; i < hrefs.length; i++) {
  hrefs[i].href += ("?domain="+getParamFromUrl("domain"));
}
  