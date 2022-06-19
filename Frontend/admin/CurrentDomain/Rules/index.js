// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}

$(function () {
  $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
});

/*sidebar included*/


// get all href's and add the id to the name
var collection = document.getElementsByClassName("id_param");
for (let i = 0; i < collection.length; i++) {
  let base = collection[i].href.slice(0, collection[i].href.lastIndexOf("/?") + 1);;
  let id = getParamFromUrl("domain");
  collection[i].href = base + "?domain=" + id;
}

function redirect() {
  window.location.href = "/admin/CurrentDomain/Rules/AddRule.html/?domain=" + getParamFromUrl("domain");
}








/** Generarea listei de "rules" din baza de date */
/*var url = url + "/event/domain/c89fcd3a1d3c49e793a54c74ff906131";
var actions_list = document.getElementById("actions_list");
var actions = getFromApi(url,requestOptions);
actions.then(response => {
  if(response.data.events.length>0){
    for (let i=0; i<response.data.events.length; i++){
        const option = document.createElement("option");
        option.value = response.data.events[i]["name"];
        const textNode = document.createTextNode(response.data.events[i]["name"]);
        option.appendChild(textNode);
        actions_list.appendChild(option);
    }
}}
 );*/


