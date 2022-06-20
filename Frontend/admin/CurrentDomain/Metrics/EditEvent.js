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


// url-urile de baza
var baseGetURL = url + "/event/";
var baseDeleteURL = url + "/event/";
var basePostURL = url + "/event/domain/";
var basePutURL = url + "/event/";

// id-ul domeniului
let website_id = getParamFromUrl("domain");
let DeleteURL = baseDeleteURL + website_id;
let PostURL = basePostURL + website_id;
let event_id = getParamFromUrl("event");
//let putURL = basePutURL + event_id;
let getURL = baseGetURL + event_id;

document.getElementById("edit_event_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  // get the form data
  var response = {};
  response["name"] = data.get("event_name");
  response["active"] = data.get("event_status");
  var json = JSON.stringify(response);
  // sending data to the server
  // info needed for requests

  /*
  var requestOptions = {
    method: 'PUT',
    body: json,
    redirect: 'follow'
  };

  fetch(putURL, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  */
  authPut("/event/" + event_id, json);
  window.location.href = "/admin/CurrentDomain/Metrics/index.html/?domain=" + getParamFromUrl("domain");
});



var event_info = authGet(getURL, requestOptions);
event_info.then(response => {
  document.getElementById("event_name").value = response.data.event["name"];
  let status = response.data.event["active"];
  document.getElementById("event_status").value = status;
  document.getElementById("event_id").value = response.data.event["_id"];
})
