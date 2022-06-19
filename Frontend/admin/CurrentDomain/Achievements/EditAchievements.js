// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// url-urile de baza
var basePutURL = url + "/achievement/self/";


// id-ul domeniului
let achievement_id = getParamFromUrl("achievement");
//let putURL = basePutURL + achievement_id;


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

var achievement_info = authGet("/achievement/self/" + achievement_id, requestOptions);
achievement_info.then(response => {
  document.getElementById("achievement_name").value = response.data.achievement["name"];
  document.getElementById("achievement_score").value = response.data.achievement["score"];
})

// functions
function cancel() {
  window.location.href = "/admin/CurrentDomain/Achievements/index.html/?domain=" + getParamFromUrl("domain");
}

document.getElementById("edit_achievement_form").addEventListener("submit", (e) => {
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
    method: 'PUT',
    body: json,
    redirect: 'follow'
  };

  fetch(putURL, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    */
  authPut("/achievement/self/" + achievement_id, json);

  window.location.href = "/admin/CurrentDomain/Achievements/index.html/?domain=" + getParamFromUrl("domain");
});