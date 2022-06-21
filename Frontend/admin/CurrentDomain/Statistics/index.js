// functie pentru extragerea unui parametru din URL
function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}
// se extrage din URL id-ul unic al unui domeniu, a.i sa se poata construi corect URL-ul pentru API
let website_id = getParamFromUrl("domain");



$(function () {
  $("#nav").load("../../sidebar/sidebarCurrentDomain.html");
});
/*sidebar included*/



function getParamFromUrl(parameter) {
  let search = window.location.search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(parameter);
}

async function show() {
  let id = getParamFromUrl("domain");
  var mess = await authGet("/domain/" + id, requestOptions);
  const heading = document.getElementById("heading");
  const heading2 = document.getElementById("heading2");
  heading.insertAdjacentText('beforeend', mess.data.domain.name);
  heading2.insertAdjacentText('beforeend', id);


  //authGet("/domain/statistics/" + id);
}




show();