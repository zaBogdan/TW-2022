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


var achievement_info = authGet("/rank/"+getParamFromUrl("rank"), requestOptions);   // postToApi 
achievement_info.then(response => {
  document.getElementById("rank_name").value = response.data.rank["name"];
  document.getElementById("rank_score").value = response.data.rank["score"];
  document.getElementById("rankTo").value = response.data.rank["rankTo"];
})

// functions
function cancel() {
  window.location.href = "/admin/CurrentDomain/Ranks/index.html/?domain=" + getParamFromUrl("domain");
}

document.getElementById("edit_rank_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  // get the form data
  var response = {};
  response["name"] = data.get("rank_name");
  response["score"] = data.get("rank_score");
  response["rankTo"] = data.get("rankTo");
  // get the <ul> entries and put them in an array
  var json = JSON.stringify(response);
  console.log(json);
  authPut("/rank/" + getParamFromUrl("rank"), json).then(response => {
    window.location.href = "/admin/CurrentDomain/Ranks/index.html/?domain=" + getParamFromUrl("domain");
  });

  
});