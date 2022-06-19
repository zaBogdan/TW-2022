// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// url-urile de baza
var basePutURL = url + "/rank/self/";
var baseGetURL = url + "/rank/self/"
// id-ul domeniului
let achievement_id = getParamFromUrl("achievement");
let putURL = basePutURL + achievement_id;
let getURL = baseGetURL + achievement_id;

$(function () {
  $("#nav").load("/admin/sidebar/sidebarCurrentDomain.html");
});
/*sidebar included*/


/// functie pentru a face display la numele fisierului ales
/*
var upload =  document.getElementById( 'avatar' );
var infoArea = document.getElementById( 'file_upload_filename' );
upload.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}*/

var achievement_info = getFromApi(getURL, requestOptions);   // postToApi 
achievement_info.then(response => {
  document.getElementById("rank_name").value = response.data.rank["name"];
  document.getElementById("rank_score").value = response.data.rank["score"];
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
  data.forEach(function (v, key) {
    response[key] = v;
  });
  // get the <ul> entries and put them in an array
  var json = JSON.stringify(response);
  // sending data to the server
  // info needed for requests
  var requestOptions = {
    method: 'PUT',
    body: json,
    redirect: 'follow'
  };

  fetch(putURL, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  window.location.href = "/admin/CurrentDomain/Ranks/index.html/?domain=" + getParamFromUrl("domain");
});