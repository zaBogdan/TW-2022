// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}


window.addEventListener('load', (event) => {
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
document.getElementById("add_achievement_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  // get the form data
  var response = {};
  response["name"] = data.get("achievement_name");
  response["score"] = data.get("achievement_score");
  // get the <ul> entries and put them in an array
  var json = JSON.stringify(response);
 
    console.log(response);
  authPost("/achievement/domain/" + getParamFromUrl("domain"), json).then(response => {
  window.location.href = "/admin/CurrentDomain/Achievements/index.html/?domain=" + getParamFromUrl("domain");
  });

});

});








