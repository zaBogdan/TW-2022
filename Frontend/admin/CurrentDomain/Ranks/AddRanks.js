$(function () {
  $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
});

/*sidebar included*/
// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// url-urile de baza
var basePostURL = url + "/rank/domain/";
// id-ul domeniului
//let postURL = basePostURL + getParamFromUrl("domain");

$(function () {
  $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
});

/*sidebar included*/


// get all href's from the sidebar and add the id to the name
var collection = document.getElementsByClassName("id_param");
for (let i = 0; i < collection.length; i++) {
  let base = collection[i].href.slice(0, collection[i].href.lastIndexOf("/?") + 1);;
  let id = getParamFromUrl("domain");
  collection[i].href = base + "?domain=" + id;
}


document.getElementById("add_rank_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  // get the form data
  var response = {};
  data.forEach(function (v, key) {
    response[key] = v;
  });
  // get the <ul> entries and put them in an array
  var json = JSON.stringify(response);
  // sending data to the server
  // info needed for requests

  /*
  var requestOptions = {
    method: 'POST',
    body: json,
    redirect: 'follow'
  };
  fetch(postURL, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
*/
  authPost("/rank/domain/" + getParamFromUrl("domain"), json);

  console.log(json);
  window.location.href = "/admin/CurrentDomain/Ranks/index.html/?domain=" + getParamFromUrl("domain");
});