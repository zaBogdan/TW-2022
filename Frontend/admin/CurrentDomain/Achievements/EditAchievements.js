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


var achievement_info = authGet("/achievement/" + getParamFromUrl("achievement"), requestOptions);
achievement_info.then(response => {
  document.getElementById("achievement_name").value = response.data.achievement["name"];
  document.getElementById("achievement_score").value = response.data.achievement["score"];
})

// functions
function cancel() {
  window.location.href = "/admin/CurrentDomain/Achievements/index.html?domain=" + getParamFromUrl("domain");
}

document.getElementById("edit_achievement_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  // get the form data
  var response = {};
 response["name"] = data.get("achievement_name");
 response["score"] = data.get("achievement_score");
  // get the <ul> entries and put them in an array
  var json = JSON.stringify(response);
  // sending data to the server
  // info needed for requests
  console.log(json);
  authPut("/achievement/" + getParamFromUrl("achievement"), json).then(response => {
    window.location.href = "/admin/CurrentDomain/Achievements/index.html?domain=" + getParamFromUrl("domain");
  });

});