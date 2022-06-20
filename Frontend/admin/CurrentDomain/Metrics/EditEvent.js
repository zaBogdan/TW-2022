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


document.getElementById("edit_event_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  // get the form data
  var response = {};
  response["name"] = data.get("event_name");
  response["active"] = data.get("event_status");
  var json = JSON.stringify(response);
  console.log(json);
  authPut("/event/" + getParamFromUrl("event"), json).then(response => {
    window.location.href = "/admin/CurrentDomain/Metrics/index.html?domain=" + getParamFromUrl("domain");
  });
});



var event_info = authGet("/event/"+getParamFromUrl("event"), requestOptions);
event_info.then(response => {
  document.getElementById("event_name").value = response.data.event["name"];
  let status = response.data.event["active"];
  document.getElementById("event_status").value = status;
  document.getElementById("event_id").value = response.data.event["_id"];
})
